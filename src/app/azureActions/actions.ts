"use server"

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// ─── In-memory OTP store (single-instance deployments) ───────────────────────
interface OtpEntry {
  code: string
  expiresAt: number
  attempts: number
}
const otpStore = new Map<string, OtpEntry>()

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function getAppToken(): Promise<string> {
  const res = await fetch(
    `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}/oauth2/v2.0/token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.AZURE_AD_CLIENT_ID!,
        client_secret: process.env.AZURE_AD_CLIENT_SECRET!,
        scope: 'https://graph.microsoft.com/.default',
      }).toString(),
      cache: 'no-store',
    }
  )
  const data = await res.json()
  if (!res.ok) throw new Error(data.error_description ?? 'Failed to acquire app token')
  return data.access_token as string
}

// ─── Sign-in ──────────────────────────────────────────────────────────────────

export async function handleSignIn(formData: FormData) {
  const email = formData.get('email')?.toString().trim()
  const password = formData.get('password')?.toString()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { email: true, error: undefined }
  }
  if (!password) {
    return { email: false, error: 'Password is required' }
  }

  const tenantId = process.env.AZURE_AD_TENANT_ID
  const clientId = process.env.AZURE_AD_CLIENT_ID
  const clientSecret = process.env.AZURE_AD_CLIENT_SECRET
  const scope = process.env.AZURE_AD_SCOPE ?? 'openid profile email offline_access'

  if (!tenantId || !clientId) {
    return { email: false, error: 'Azure AD is not configured. Contact your administrator.' }
  }

  try {
    const params = new URLSearchParams({
      grant_type: 'password',
      client_id: clientId,
      username: email,
      password,
      scope,
    })
    if (clientSecret) params.append('client_secret', clientSecret)

    const res = await fetch(
      `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      }
    )

    const data = await res.json()

    if (!res.ok) {
      const errorMsg =
        data.error === 'invalid_grant'
          ? 'Invalid email or password.'
          : data.error_description?.split('\r\n')[0] ?? 'Sign in failed. Please try again.'
      return { email: false, error: errorMsg }
    }

    const cookieStore = await cookies()
    cookieStore.set('azure_access_token', data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: data.expires_in ?? 3600,
    })
    if (data.id_token) {
      cookieStore.set('azure_id_token', data.id_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: data.expires_in ?? 3600,
      })
    }
  } catch {
    return { email: false, error: 'Authentication service unavailable. Please try again.' }
  }

  redirect('/')
}

// ─── Forgot password — step 1: send OTP ──────────────────────────────────────

export async function sendForgotPasswordCode(email: string) {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return { Status: 400, Message: 'Please enter a valid email address.' }
  }

  const mailFrom = process.env.AZURE_AD_MAIL_FROM
  if (!process.env.AZURE_AD_TENANT_ID || !process.env.AZURE_AD_CLIENT_ID || !mailFrom) {
    return { Status: 500, Message: 'Password reset is not configured. Contact your administrator.' }
  }

  try {
    const token = await getAppToken()

    // Verify user exists before sending code
    const userRes = await fetch(
      `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(email.trim())}?$select=id`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    if (!userRes.ok) {
      // Return success message anyway to avoid user enumeration
      return { Status: 200, Message: 'If this email is registered, a reset code has been sent.' }
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString()
    otpStore.set(email.toLowerCase().trim(), {
      code,
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
      attempts: 0,
    })

    const mailRes = await fetch(
      `https://graph.microsoft.com/v1.0/users/${mailFrom}/sendMail`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: {
            subject: 'Password Reset Code — Internal Portal',
            body: {
              contentType: 'HTML',
              content: `
                <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:24px;border:1px solid #e3e3e3;border-radius:8px;">
                  <h2 style="color:#1275B3;margin-bottom:8px;">Password Reset</h2>
                  <p style="color:#444;">Use the verification code below to reset your Internal Portal password.</p>
                  <div style="background:#f4f8fb;border:1px solid #c5dbe5;border-radius:6px;padding:20px;text-align:center;margin:24px 0;">
                    <span style="font-size:2.4rem;font-weight:700;letter-spacing:0.5rem;color:#1275B3;">${code}</span>
                  </div>
                  <p style="color:#888;font-size:0.875rem;">This code expires in <strong>10 minutes</strong>. If you did not request a password reset, ignore this email.</p>
                </div>
              `,
            },
            toRecipients: [{ emailAddress: { address: email.trim() } }],
          },
        }),
      }
    )

    if (!mailRes.ok) {
      const err = await mailRes.json()
      return { Status: 500, Message: err.error?.message ?? 'Failed to send verification code.' }
    }

    return { Status: 200, Message: 'Verification code sent to your email.' }
  } catch (e: any) {
    return { Status: 500, Message: e.message ?? 'Failed to send verification code.' }
  }
}

// ─── Forgot password — step 2: verify OTP + reset password ───────────────────

export async function forgotPassword(email: string, code: string, newPassword: string) {
  const key = email.toLowerCase().trim()
  const entry = otpStore.get(key)

  if (!entry) {
    return { Status: 400, Message: 'No reset code found. Please request a new code.' }
  }

  if (Date.now() > entry.expiresAt) {
    otpStore.delete(key)
    return { Status: 400, Message: 'Verification code has expired. Please request a new code.' }
  }

  if (entry.attempts >= 3) {
    otpStore.delete(key)
    return { Status: 429, Message: 'Attempt limit exceeded, please try after some time.' }
  }

  if (entry.code !== code) {
    otpStore.set(key, { ...entry, attempts: entry.attempts + 1 })
    const remaining = 3 - (entry.attempts + 1)
    return {
      Status: 400,
      Message: remaining > 0
        ? `Invalid verification code. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.`
        : 'Attempt limit exceeded, please try after some time.',
    }
  }

  try {
    const token = await getAppToken()

    // Look up the user by UPN (email is usually the UPN in Azure AD)
    const userRes = await fetch(
      `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(email.trim())}?$select=id`,
      { headers: { Authorization: `Bearer ${token}` } }
    )

    if (!userRes.ok) {
      return { Status: 404, Message: 'User account not found.' }
    }

    const user = await userRes.json()

    // Reset the password via Graph API (requires User.ReadWrite.All or Directory.ReadWrite.All)
    const resetRes = await fetch(
      `https://graph.microsoft.com/v1.0/users/${user.id}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          passwordProfile: {
            forceChangePasswordNextSignIn: false,
            password: newPassword,
          },
        }),
      }
    )

    if (!resetRes.ok) {
      const err = await resetRes.json()
      return { Status: 500, Message: err.error?.message ?? 'Failed to reset password.' }
    }

    otpStore.delete(key)
    return { Status: 200, Message: 'Password reset successfully.' }
  } catch (e: any) {
    return { Status: 500, Message: e.message ?? 'Failed to reset password.' }
  }
}

// ─── Sign-out / session ───────────────────────────────────────────────────────

export async function handleSignOut() {
  const cookieStore = await cookies()
  cookieStore.delete('azure_access_token')
  cookieStore.delete('azure_id_token')
  redirect('/login')
}

export async function getSession() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('azure_access_token')?.value
  const idToken = cookieStore.get('azure_id_token')?.value
  if (!accessToken) return null
  return { accessToken, idToken }
}
