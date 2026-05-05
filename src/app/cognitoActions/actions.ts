import { getErrorMessage, isValidEmail } from "@/src/helpers/validation";
import { confirmResetPassword, resetPassword, signIn } from "aws-amplify/auth";
import { redirect } from "next/navigation";

export async function handleSignIn(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
   
    const redirectLink = '/';
    if (!isValidEmail(email)) {
        return {email: getErrorMessage('Please enter a valid email address')}
    } else {
        try {
            const user = await signIn({
                username: email,
                password: password,
            });
            console.log('user', user);
            
            
        } catch (error) {
            console.log('error', error);
            return {error: getErrorMessage(error)}
        }

        
        redirect(redirectLink);
    }
}

export async function sendForgotPasswordCode(user: any) {
    try {
        // const user = await getCurrentUser()
        await resetPassword({ username: user })
        return {
            Status: 200,
            User: user,
            Message: 'code sent',
        };
    } catch (error: any) {
        return {
            Status: 500,
            User: '',
            Message: error.message || 'Failed to send code',
        };
    }
}

export async function forgotPassword(username: any,confirmationCode: any, newPassword: string) {
    try {
        await confirmResetPassword({ username: username, confirmationCode, newPassword });

        // await signIn({ username: userData?.username, password: newPassword });

        return {
            Status: 200,
            Message: 'Password changed successfully.',
        };
    } catch (error: any) {
        return {
            Status: 500,
            Message: error.message || 'Failed to change password.',
        };
    }
}