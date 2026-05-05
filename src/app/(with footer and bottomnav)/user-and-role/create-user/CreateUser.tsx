"use client"


import ErrorMessageDisplay from "@/src/app/components/common/ErrorMessageDisplay/ErrorMessageDisplay"
import LabelAndDropdown from "@/src/app/components/common/LabelAndDropdown/LabelAndDropdown"
import LabelAndInput from "@/src/app/components/common/LabelAndInput/LabelAndInput"
import LabelAndPhoneInput from "@/src/app/components/common/LabelAndPhoneInput/LabelAndPhoneInput"
import MandatoryErrorMessage from "@/src/app/components/common/MandatoryErrorMessage/MandatoryErrorMessage"
import DiscardModal from "@/src/app/components/common/Modal/DiscardModal/DiscardModal"
import MessageModal from "@/src/app/components/common/Modal/MessagePop/MessagePopUp"
import PinkButton from "@/src/app/components/common/PinkButton/PinkButton"
import { isValidEmail } from "@/src/helpers/validation"
import { useState } from "react"
import { Modal } from "react-bootstrap"
import RetrievePassword from "./RetrievePassword"
import { useRouter } from "next/navigation"

type CreateUserProps = {
    fromUser?: boolean
    userData: any
    fromCreate?: boolean
    setEditProfile?: ()=>void
}

const CreateUser = (props: CreateUserProps) => {
    const {setEditProfile, fromUser, userData, fromCreate } = props

    const router = useRouter()

    const initialFormData = {
        First_Name: userData?.First_Name || '',
        Last_Name: userData?.Last_Name || '',
        Position: userData?.Position || '',
        Role: userData?.Role || '',
        RoleId: userData?.RoleId || null,
        Phone_Number: userData?.Phone_Number || '',
        Email_Address: userData?.Email_Address || '',
        Profile_Photo_URL: userData?.Profile_Photo_URL || '',
    }
    const [formData, setFormData] = useState(initialFormData);
    const [mandatoryError, setMandatoryError] = useState(false)
    const [phoneError, setPhoneError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [password, setPassword] = useState<string>('')
    const [discardError, setDiscardError] = useState('')
    const [showLoad, setShowLoad] = useState(false)
    const [showError, setShowError] = useState('')
    const [errorHeading, setErrorHeading] = useState('')
    const [passtype, setPasstype] = useState(false)
    const [backLoad, setBackLoad] = useState(false)


    const handleInputChange = (field: string, value: string) => {
        if (field === 'Role') {
            //const selectedRole = allroles?.find((role: { Name: string }) => role.Name === value);
            //const roleId = selectedRole?.id || null;

            setFormData((prev) => ({
                ...prev,
                Role: value,
                //RoleId: roleId,
            }));
        } else if (field === 'Email_Address') {
            if (value !== '') {
                setEmailError(!isValidEmail(value))
            } else {
                setEmailError(false)
            }
            setFormData((prev) => ({
                ...prev,
                [field]: value,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [field]: value,
            }));
        }
    };

    const handleMobileChange = (value: any, data: any, formattedValue: any) => {
        const { format, dialCode, } = data;
        if (
            format.length === formattedValue.length &&
            (value.startsWith(dialCode) || dialCode.startsWith(value))
        ) {
            setPhoneError(false);
        } else {
            setPhoneError(value !== dialCode);
        }

        setFormData((prev) => ({
            ...prev,
            'Phone_Number': "+" + value,
        }));

    }

    const submitData = async () => {

        console.log('submitData')
    }

    const handleCLose = () => {
        if (fromCreate) {
            setBackLoad(true)
            router.push(`/setup/user-and-role`)
        } else {
            
            setEditProfile && setEditProfile()
        }
    }
    return (
        <div className='p-5 invite-section-container'>
            <h1 className='inter_normal_shark_20px'>
                Create user
            </h1>
            {mandatoryError &&
                <MandatoryErrorMessage />
            }

            <div className='mt-5 mb-5'>
                <h2 className='inter_semibold_shark_14px'>Basic details:</h2>
                <div className='row mt-5'>
                    <div className='col-lg-4 col-md-6 col-sm-12'>
                        <LabelAndInput
                            label='First name'
                            placeholder='Enter first name'
                            type='text'
                            value={formData?.First_Name}
                            onChange={(e) => handleInputChange('First_Name', e.target.value)}

                            dataTest={`${fromUser ? 'user-first-name' : 'profile-first-name'}`}
                            mandatory={true}
                            mandatoryError={mandatoryError && formData?.First_Name === ''}
                        />
                    </div>

                    <div className='col-lg-4 col-md-6 col-sm-12'>
                        <LabelAndInput
                            label='Last Name'
                            placeholder='Enter last name'
                            type='text'
                            value={formData?.Last_Name}
                            dataTest={`${fromUser ? 'user-last-name' : 'profile-last-name'}`}
                            onChange={(e) => handleInputChange('Last_Name', e.target.value)}
                        />
                    </div>

                    <div className='col-lg-4 col-md-6 col-sm-12'>

                        <LabelAndDropdown
                            label='Position'
                            defaultValue='Select position'
                            options={['CEO', 'COO', 'Director', 'Technical Manager', 'Production Manager', 'Sales Manager', 'Header of Concept & Innovation', 'VP Operations', 'VP Sales']}
                            value={formData?.Position}
                            dataTest={`${fromUser ? 'user-position' : 'profile-position'}`}
                            onChange={(value) => handleInputChange('Position', value)}
                        />
                    </div>
                </div>
            </div>

            <hr />

            <div className='mt-5 mb-5'>
                <h2 className='inter_semibold_shark_14px'>Contact details:</h2>
                <div className='row mt-5'>
                    <div className='col-lg-4 col-md-6 col-sm-12'>

                        <LabelAndPhoneInput
                            label='Contact Phone'
                            placeholder='Enter contact no.  '
                            value={formData?.Phone_Number}
                            countryCode={''}
                            onChange={(value, data, formattedValue) => handleMobileChange(value, data, formattedValue)}
                            disableDropdown={false}

                        />
                        {
                            phoneError &&
                            <ErrorMessageDisplay
                                className=''
                                message='Please enter a valid phone number'
                            />
                        }
                    </div>

                    <div className='col-lg-4 col-md-6 col-sm-12'>
                        <LabelAndInput
                            label='Email address'
                            placeholder='user@example.com'
                            type='email'
                            value={formData?.Email_Address}
                            disabled={!fromCreate}
                            dataTest={`${fromUser ? 'user-email' : 'profile-email'}`}
                            // disabled={userData.Role === 'Admin' ? false : userData.StatusCode !== 404 ? true : false}
                            onChange={(e) => handleInputChange('Email_Address', e.target.value)}
                            mandatory={true}
                            mandatoryError={mandatoryError && formData?.Email_Address === ''}
                            autoComplete="new-password"
                        />
                        {
                            emailError &&
                            <ErrorMessageDisplay
                                className=''
                                message='Please enter a valid email address'
                            />
                        }
                    </div>


                </div>
            </div>


            <hr />

            <div className='mt-5 mb-5'>
                <h2 className='inter_semibold_shark_14px'>Access details:</h2>
                <div className='row mt-5'>
                    <div className='col-lg-4 col-md-6 col-sm-12'>

                        <LabelAndDropdown
                            label='Role'
                            defaultValue='Select and assign role'
                            options={[]}
                            value={formData?.Role}
                            dataTest={`${fromUser ? 'user-role' : 'profile-role'}`}
                            // disabled={!fromCreate && (currentUserSliceData?.currentUser?.Role !== 'Admin' && !(userData?.Role === 'Admin' || userData?.StatusCode === 404))}
                            onChange={(value) => handleInputChange('Role', value)}
                            mandatory={true}
                            mandatoryError={mandatoryError && formData?.Role === ''}
                        />
                    </div>

                </div>

            </div>

            {fromCreate && <hr />}

            {fromCreate && <div className='mt-5 mb-5'>
                <h2 className='inter_semibold_shark_14px'>Login details:</h2>
                <div className='row mt-5 d-flex flex-column'>
                    <div className='col-lg-4 col-md-6 col-sm-12 mb-3'>
                        <LabelAndInput
                            label='Email address'
                            placeholder='User contact email address detail'
                            type='email'
                            value={formData?.Email_Address}
                            // onChange={(e) => handleInputChange('First_Name', e.target.value)}
                            disabled={true}
                            dataTest={`${fromUser ? 'user-login-email' : 'profile-login-email'}`}
                        />
                    </div>

                    <div className='col-lg-4 col-md-6 col-sm-12 mt-3'>
                        <LabelAndInput
                            label='Password'
                            placeholder='Enter a password for user'
                            type={passtype ? 'text' : 'password'}
                            value={password}
                            dataTest={`${fromUser ? 'user-Password' : 'profile-Password'}`}
                            onChange={(e) => setPassword(e.target.value.trim())}
                            disabled={false}
                            mandatory={true}
                            mandatoryError={mandatoryError && password === ''}
                            autoComplete="new-password"
                        />
                        {
                            passwordError &&
                            <ErrorMessageDisplay
                                className=''
                                message='Password do no match requirements'
                            />
                        }
                    </div>

                </div>
                <div className='inter_regular_lightgray_11px mt-4 mb-4'>

                    <p className=''>{"• Must be at least 8 characters long"}</p>
                    <p className='mt-2'>{'• Must include: Uppercase letter (A-Z), lowercase letter (a-z), numbers(0-9) and symbols ! @ # $ % ^ & * ( ) _ - + = { } ] ['}</p>
                </div>
                <div className='d-flex mb-5'>
                    <input
                        // checked={isChecked} 
                        onChange={() => setPasstype(!passtype)}
                        type='checkbox'
                    // className={`${style['tax-radio-selection']}`} 
                    />
                    <p
                        style={{ marginTop: '.2rem' }}
                        className='inter_regular_dimgray_14px ml-2'>
                        Show Password
                    </p>
                </div>
            </div>}


            <div className={`mt-5 mb-5 d-flex justify-content-center align-items-center button-container`}>
                <PinkButton
                    onClick={() => {
                        // if(!submitDisabled){
                        setDiscardError("You've made changes to this record. If you go back now, your data will be lost. Do you want to continue?")
                        // } else {
                        //     handleCLose()
                        // }
                    }}
                    label='Cancel' whiteButton={true}
                />
                <PinkButton onClick={submitData}
                    // disabled={submitDisabled || showLoad} 
                    disabled={showLoad}
                    label={fromCreate ? 'Create user' : 'Save'} showLoad={showLoad} />
            </div>

            <Modal
                show={showError !== ''}
                className='d-flex justify-content-center align-items-center'>
                <MessageModal heading={errorHeading !== '' ? errorHeading : 'Error'} qerrorMessage={showError} trigger={() => setShowError('')} pathname={'/'} />
            </Modal>

            <Modal
                show={discardError !== ''}
                className='d-flex justify-content-center align-items-center'>
                <DiscardModal heading={fromCreate ? 'Discard Entry?' : 'Discard Changes?'} qerrorMessage={discardError} trigger={() => setDiscardError('')} pathname={'/'} trigger2={() => handleCLose()} pinkBtnTitle={fromCreate ? 'Discard Entry' : 'Discard Changes'} showLoad={backLoad} disabled={backLoad} />
            </Modal>

            <Modal
                show={errorHeading === 'Retrieve Password'}
                // show={true}
                className='d-flex justify-content-center align-items-center retrieving-modal'>
                <RetrievePassword
                    email={formData?.Email_Address}
                    password={password}
                    setPassword={setPassword}
                />
            </Modal>
        </div>
    )
}

export default CreateUser