'use client'

import PinkButton from '@/src/app/components/common/PinkButton/PinkButton'
import { useEffect, useState } from 'react'
import style from './style.module.sass'
import OTPInput from './OtpInput/OTPInput'

import crossTick from '@/src/app/CommonImages/red_cross_icon.png'
import greenTick from '@/src/app/CommonImages/green_Check_Icon.png'
import { IoEye, IoEyeOff } from 'react-icons/io5'
import LabelAndInput from '@/src/app/components/common/LabelAndInput/LabelAndInput'
import { validatePassword } from '@/src/helpers/helper'
import { Modal } from 'react-bootstrap'
import PassChangeSuccessModal from '@/src/app/components/common/Modal/PassChangeSuccessModal/PassChangeSuccessModal'
import { useRouter } from 'next/navigation'
import { forgotPassword, sendForgotPasswordCode } from '@/src/app/cognitoActions/actions'
import ErrorMessageDisplay from '@/src/app/components/common/ErrorMessageDisplay/ErrorMessageDisplay'


interface ForgotPasswordProps {
    handleCloseEdit: any
    setShowResetError: any
    showResetError: any
    emailAdd: any
}

const ForgotPassword = (props: ForgotPasswordProps) => {

    const { handleCloseEdit, setShowResetError, showResetError, emailAdd } = props

    const [code, setCode] = useState('');
    const [pending, setPending] = useState(true);
    const [otpVerfied, setOtpVerfied] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showLoad, setShowLoad] = useState(false);
    const [showLoadLogout, setShowLoadLogout] = useState(false);
    const [showLogoutPop, setShowLogoutPop] = useState(false);



    const [newPasswordError,setNewPasswordError] = useState(false)
    const [chgPasswordError,setChgPasswordError] = useState(false)
    const [showPassword1, setShowPassword1] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)
    const [passwordData,setPasswordData] = useState({
        NewPassword: '',
        ConfirmPassword: ''
    })

    const handlePassword =(value: string, field: string) => {
        setPasswordData(prev => ({
            ...prev,
            [field]: value
        }))
        if(field === 'NewPassword'){
            if(!validatePassword(value)){
                setNewPasswordError(true)
            } else {
                setNewPasswordError(false)
            }
        }else if(field === 'ConfirmPassword'){
            if(value !== passwordData.NewPassword){
                setChgPasswordError(true)
            } else {
                setChgPasswordError(false)
            }
        }
    }

    const handleResetPass = async() => {
        setShowLoad(true)
        const res = await forgotPassword(emailAdd, code, passwordData.NewPassword)
        console.log('reset', res)
        if(res.Status === 200){
            setOtpVerfied(true)
            setShowError(false)
            setShowResetError('')
            setPasswordData({
                NewPassword: '',
                ConfirmPassword: ''
            })
            // handleCloseEdit()
            setShowLoad(false)
            setShowLogoutPop(true)
        } else {
            setShowError(true)
            setShowResetError(res.Message)
            setOtpVerfied(false)
            setShowLoad(false)
            setShowLogoutPop(false)
        }
    }
    const handleResendCode = async() => {
        setPending(true)
        const res = await sendForgotPasswordCode(emailAdd)
        if(res.Status !==200) {
            setShowResetError(res.Message)
        }
        setTimeout(()=>{
            setPending(false)
        },6000)
    }

    useEffect(()=> {
        setTimeout(()=>{
            setPending(false)
        },6000)
    },[])

    const router = useRouter()

    const handleLogout = async() => {
        setShowLoadLogout(true)
        setPasswordData({
            NewPassword: '',
            ConfirmPassword: ''
        })
        setShowResetError('')
        
        // router.push('/login')
        handleCloseEdit()
    }

  return (
    <div className={`p-0 invite-section-container ${style['main-container']}`}>
        {/* <h1 className='inter_normal_shark_20px'>Forgot password</h1> */}
        <h4 className='inter_regular_gray_14px mt-2'>Enter the verification code sent to {emailAdd}</h4>
        
        <div className='mt-4 mb-4'>
           
            <div className={style['enter-otp-forget-password1']}>
                <OTPInput setCode={setCode} code={code} setShowError={setShowError} showError={showError} setShowResetError={setShowResetError} />

                {code.length === 6 && showError && (
                    <img
                        alt='cross-tick'
                        src={crossTick.src}
                        className={style['crossTick-forget-password1']}>
                    </img>
                )}
                {code.length === 6 && !showError && otpVerfied && (
                    <img
                        alt='greeb-tick'
                        src={greenTick.src}
                        className={style['crossTick-forget-password1']}>
                    </img>
                )}
            </div>

            <div className='mt-4 d-flex flex-column'>
                {showError && showResetError !== '' &&
                    <div className='d-flex mb-3'>
                        <ErrorMessageDisplay
                            className=''
                            message={showResetError}
                        />
                    </div>
                }
                <span className='inter_regular_diffBlack_14px'>{'Didn’t receive the verification code?'}</span>
                <button type='button' onClick={()=> !pending && handleResendCode()} className={`mt-3 d-flex inter_regular_darkblue_14px bg-transparent border-0 ${pending ? style['donotallow-color'] : style['allow-color']}`}  >
                    Resend code
                </button>
            </div>




            
        </div>
        
        {
            <div>
                <hr />
                <h1 className='inter_normal_black_20px mt-3'>Create new password</h1>
                {/* <h4 className='inter_regular_gray_14px mt-4'>Choose a password that you don't use anywhere else. It should be at least 8 characters and difficult for others to guess.</h4> */}
                <div className='row mt-2 mb-4'>
                    <div className='col-lg-12 col-md-12 col-sm-12 mb-3 pl-2 pr-4'>
                        <div className='position-relative'>

                            <LabelAndInput
                                label='New password'
                                hideLabel={true}
                                placeholder='Enter new password'
                                type={showPassword1 ? 'text': 'password'}
                                value={passwordData?.NewPassword}
                                dataTest={'new-password'}
                                onChange={(e) => {
                                    handlePassword(e.target.value, 'NewPassword')
                                }}
                                disabled={false}
                                mandatoryError={newPasswordError}
                                autoComplete="new-password"
                            />
                            <button
                                type="button"
                                className={`${style.togglePassword} `}
                                onClick={() => setShowPassword1(!showPassword1)}
                                aria-label={showPassword1 ? "Hide new password" : "Show new password"}
                                >
                                {showPassword1 ? <IoEyeOff size={20} color='#5f5f5f' /> : <IoEye size={20} color='#5f5f5f' />}
                            </button>
                        </div>
                        
                        
                    </div>
                    <div className='col-lg-12 col-md-12 col-sm-12 mb-3 pl-2 pr-4'>
                        <div className='position-relative'>

                            <LabelAndInput
                                label='Confirm password'
                                hideLabel={true}
                                placeholder='Confirm password'
                                type={showPassword2 ? 'text': 'password'}
                                value={passwordData?.ConfirmPassword}
                                dataTest={'new-password'}
                                onChange={(e) => {
                                    handlePassword(e.target.value, 'ConfirmPassword')
                                }}
                                mandatoryError={chgPasswordError}
                                disabled={newPasswordError || passwordData?.NewPassword === ''}
                                autoComplete="new-password"
                            />
                            <button
                                type="button"
                                className={`${style.togglePassword} `}
                                onClick={() => setShowPassword2(!showPassword2)}
                                aria-label={showPassword2 ? "Hide cnf password" : "Sho cnf password"}
                                >
                                {showPassword2 ? <IoEyeOff size={20} color='#5f5f5f' /> : <IoEye size={20} color='#5f5f5f' />}
                            </button>
                        </div>
                        
                        
                    </div>
                    <div className='col-lg-12 col-md-12 col-sm-12  d-flex flex-column'>
                        {
                            newPasswordError &&
                            <ErrorMessageDisplay
                            className=''
                            message='Password must be at least 8 characters long and include a combination of at least one uppercase letter, one lowercase letter, one number, and one symbol (e.g., Aa123!#$%).'
                            />
                        }
                        {
                            chgPasswordError &&
                            <ErrorMessageDisplay
                            className=''
                            message='New password and confirm password must be the same.'
                            />
                        }
                    </div>

                </div>
            </div>
        }


        <div className={`mt-4 mb-5 d-flex justify-content-center align-items-center ${style['button-container']} w-100`}>

            <PinkButton label={'Cancel'} whiteButton={true} widthFixed
                onClick={()=> handleCloseEdit()}
                // showLoad={showLoad2}
            />
            {
            //    currentUserSliceData?.currentUser?.Role === 'Admin' && 
                <PinkButton label='Change password'
                    disabled={showLoad || newPasswordError || chgPasswordError || code.length !== 6 || passwordData?.NewPassword?.length <= 0 || passwordData?.ConfirmPassword?.length <= 0}
                    onClick={handleResetPass} 
                    showLoad={showLoad}
                    widthFixed
                />
            }
        </div>

            <Modal
                show={showLogoutPop}
                className='d-flex justify-content-center align-items-center'>
                <PassChangeSuccessModal   trigger={() => handleLogout()} fromforgot={true}  showLoad={showLoadLogout} />
            </Modal>
            <Modal
                show={showResetError === 'Attempt limit exceeded, please try after some time.'}
                className='d-flex justify-content-center align-items-center'>
                <PassChangeSuccessModal   trigger={() => setShowResetError('')} tooManyError={true}  />
            </Modal>

    </div>
  )
}

export default ForgotPassword