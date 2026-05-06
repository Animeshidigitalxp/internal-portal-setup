"use client"
import React, { useActionState, useState } from 'react'
import styles from './styles.module.css'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { handleSignIn, sendForgotPasswordCode } from '@/src/app/azureActions/actions';
import { useFormStatus } from 'react-dom'
import ErrorMessageDisplay from '@/src/app/components/common/ErrorMessageDisplay/ErrorMessageDisplay';
import { ClipLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
const LoginForm = () => {

  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [state, loginAction] = useActionState(
    (_prevState: object | undefined, formData: FormData) => handleSignIn(formData),
    { email: false, error: undefined }
  );

  const [editProfile, setEditProfile] = useState(false)
  const [showResetError, setShowResetError] = useState('')
  const router = useRouter()
  const handleCloseEdit = () => {
    setEditProfile(false)
    setEmail('')
    setPassword('')
    setShowResetError('')
    router.refresh()
  }


  const handleForgotclick = async (email: string) => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setShowResetError('Please enter your email address before resetting your password.')
      return
    }
    setEditProfile(true)
    setShowResetError('')
    const res = await sendForgotPasswordCode(email)
    if (res.Status !== 200) {
      setShowResetError(res.Message)
    }
  }



  return (
    <div className={`${styles.formWrapper} pl-4 pr-4`}>

      <div className='d-flex align-items-center flex-column justify-content-center'>
        


        <h1 className={`inter_semibold_shark_24px  w-100 ${styles.loginFormTitle}`}>Internal Portal Login</h1>

      </div>

      
      {!editProfile ?
        <form action={loginAction} className={styles.form}>
          <div className={`${styles.inputGroup} mb-3`}>


            <div>
              <label className='inter_regular_darkblack_14px mb-3'>Email address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                name='email'
                className={`inter_regular_shark_16px ${styles.input} ${state?.email ? styles.inputError : ''}`}
                required
              />

              {state?.email &&
                <ErrorMessageDisplay
                  message='Please enter a valid email address'
                  className='mt-2'
                />
              }
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className='inter_regular_darkblack_14px mb-3'>Password</label>
            <div className={styles.passwordInput}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                name='password'
                className={`inter_regular_shark_16px ${styles.input}`}
                required
              />
              <button
                type="button"
                className={`${styles.togglePassword}`}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
              </button>

            </div>
          </div>

          <div className={styles.options}>
            <button
              type="button"
              className={`inter_regular_diffBlack_14px border-0 bg-transparent mt-2`}
              onClick={() => handleForgotclick(email)}
            >
              Forgot password?
            </button>
          </div>

          {showResetError && (
            <ErrorMessageDisplay message={showResetError} className='' />
          )}

          <div>
            <SubmitButton />
            {state?.error &&

              <ErrorMessageDisplay
                message={state.error}
                className=''
              />

            }
          </div>


        </form>

        :
        <ForgotPassword
          handleCloseEdit={handleCloseEdit}
          setShowResetError={setShowResetError}
          showResetError={showResetError}
          emailAdd={email}
        />
      }
      

    </div>
  )
}

export default LoginForm


export const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button className={`${styles.loginButton} inter_regular_white_16px`}>

      {pending ? <ClipLoader size={25} color={'fff'} /> : 'Log In'}
    </button>
  )

}