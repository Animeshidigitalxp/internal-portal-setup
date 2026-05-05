'use client'
import { isValidEmail } from '@/src/helpers/validation';
import { useState } from 'react'
import MandatoryErrorMessage from '../../components/common/MandatoryErrorMessage/MandatoryErrorMessage';
import LabelAndInput from '../../components/common/LabelAndInput/LabelAndInput';
import LabelAndDropdown from '../../components/common/LabelAndDropdown/LabelAndDropdown';
import ErrorMessageDisplay from '../../components/common/ErrorMessageDisplay/ErrorMessageDisplay';
import PinkButton from '../../components/common/PinkButton/PinkButton';
import { Modal } from 'react-bootstrap';
import MessageModal from '../../components/common/Modal/MessagePop/MessagePopUp';
import DiscardModal from '../../components/common/Modal/DiscardModal/DiscardModal';
import RetrievePassword from '../user-and-role/create-user/RetrievePassword';

type AddDealerDetailsProps = {
    fromUser?: boolean
    userData: any
    fromCreate?: boolean
}

function AddDealerDetails(props:AddDealerDetailsProps) {
       const {fromUser, userData, fromCreate } = props
      const initialFormData = {
        Dealer_Name: userData?.Dealer_Name || '',
        Website_URL: userData?.Website_URL || '',
        DUNS_Number: userData?.DUNS_Number || '',
        Business_Description: userData?.Business_Description || '',
        Business_Number: userData?.Business_Number || '',
        Phone_Number: userData?.Phone_Number || '',
        Email_Address: userData?.Email_Address || '',
        Profile_Photo_URL: userData?.Profile_Photo_URL || '',
    }
      const [formData, setFormData] = useState<any>(initialFormData);
          const [mandatoryError, setMandatoryError] = useState(false)
          const [phoneError, setPhoneError] = useState(false)
          const [emailError, setEmailError] = useState(false)
          const [password, setPassword] = useState<string>('')
          const [discardError, setDiscardError] = useState('')
          const [showLoad, setShowLoad] = useState(false)
          const [showError, setShowError] = useState('')
          const [errorHeading, setErrorHeading] = useState('')
          const [backLoad, setBackLoad] = useState(false)


          const handleInputChange = (field: string, value: string) => {
                  if (field === 'Role') {
                      //const selectedRole = allroles?.find((role: { Name: string }) => role.Name === value);
                      //const roleId = selectedRole?.id || null;
          
                      setFormData((prev:any) => ({
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
                      setFormData((prev:any) => ({
                          ...prev,
                          [field]: value,
                      }));
                  } else {
                      setFormData((prev:any) => ({
                          ...prev,
                          [field]: value,
                      }));
                  }
              };

    

    const submitData = async () => {

        console.log('submitData')
    }

    const handleCLose = () => {
        if (fromCreate) {
            setBackLoad(true)
            // router.push(`/setup/user-and-role`)
        } 
    }
   return (
        <div className='p-5 invite-section-container'>
            <h1 className='inter_normal_shark_20px'>
                Edit Dealer Details
            </h1>
            {mandatoryError &&
                <MandatoryErrorMessage />
            }

            <div className='mt-5 mb-5'>
                {/* <h2 className='inter_semibold_shark_14px'>Basic details:</h2> */}
                <div className='row mt-5'>

                  {/* <div className='mb-3'> */}
                        <div className='col-lg-6 col-md-6 mb-5 col-sm-12'>
                        <LabelAndInput
                            label='Dealer Name'
                            placeholder='Enter dealer name'
                            type='text'
                            value={formData?.Dealer_Name}
                            dataTest={`${fromUser ? 'user-dealer-name' : 'profile-dealer-name'}`}
                            onChange={(e) => handleInputChange('Dealer_Name', e.target.value)}
                        />
                    </div>

                      <div className='col-lg-6 col-md-6 mb-5 col-sm-12'>
                        <LabelAndInput
                            label='Website URL'
                            placeholder='Enter website URL'
                            type='text'
                            value={formData?.Website_URL}
                            dataTest={`${fromUser ? 'user-last-name' : 'profile-last-name'}`}
                            onChange={(e) => handleInputChange('Website_URL', e.target.value)}
                        />
                    {/* </div> */}

                  </div>
                  

                    

                      <div className='col-lg-3 col-md-6 col-sm-12'>

                        <LabelAndDropdown
                            label='Industry Type'
                            defaultValue='Select industry type'
                            options={['CEO', 'COO', 'Director', 'Technical Manager', 'Production Manager', 'Sales Manager', 'Header of Concept & Innovation', 'VP Operations', 'VP Sales']}
                            value={formData?.Position}
                            dataTest={`${fromUser ? 'user-position' : 'profile-position'}`}
                            onChange={(value) => handleInputChange('Position', value)}
                        />
                    </div>

                      <div className='col-lg-3 col-md-6 col-sm-12'>

                        <LabelAndDropdown
                            label='Legal Entity Type'
                            defaultValue='Select legal entity type'
                            options={['CEO', 'COO', 'Director', 'Technical Manager', 'Production Manager', 'Sales Manager', 'Header of Concept & Innovation', 'VP Operations', 'VP Sales']}
                            value={formData?.Position}
                            dataTest={`${fromUser ? 'user-position' : 'profile-position'}`}
                            onChange={(value) => handleInputChange('Position', value)}
                        />
                    </div>

                    <div className='col-lg-3 col-md-6 col-sm-12'>
                        <LabelAndInput
                            label='Business Registration Number'
                            placeholder='Enter EIN'
                            type='text'
                            value={formData?.Business_Number}
                            dataTest={`${fromUser ? 'user-business-number' : 'profile-business-number'}`}
                            onChange={(e) => handleInputChange('Business_Number', e.target.value)}
                        />
                    </div>

                    <div className='col-lg-3 col-md-6 mb-5 col-sm-12'>
                        <LabelAndInput
                            label='D-U-N-S Number'
                            placeholder='Enter D-U-N-S Number'
                            type='text'
                            value={formData?.DUNS_Number}
                            dataTest={`${fromUser ? 'user-duns-number' : 'profile-duns-number'}`}
                            onChange={(e) => handleInputChange('DUNS_Number', e.target.value)}
                        />
                    </div>

                     <div className='col-lg-12 col-md-6 mb-5 col-sm-12'>
                        <LabelAndInput
                            label='Business Description'
                            placeholder='Enter business description'
                            type='text'
                            value={formData?.Business_Description}
                            dataTest={`${fromUser ? 'user-business-description' : 'profile-business-description'}`}
                            onChange={(e) => handleInputChange('Business_Description', e.target.value)}
                        />
                    </div>

                    <div className='col-lg-2 col-md-4 col-sm-12 mb-5'>
            <label className='inter_regular_gray_14px d-block mb-2' >Company Logo</label>
            <div className="logo-placeholder-box">
                {/* <div className="plus-icon">+</div> */}
            </div>
        </div>

      
                </div>
            </div>

            <hr />

            <div className='mt-5 mb-5'>
                <h2 className='inter_semibold_shark_14px'>Contact Information</h2>
                <div className='row mt-5'>
                    <div className='col-lg-3 col-md-6 col-sm-12'>

                       <LabelAndInput
                            label='Company Phone Number'
                            placeholder='Enter phone no.'
                            type='text'
                            value={formData?.Phone_Number}
                            dataTest={`${fromUser ? 'user-phone-number' : 'profile-phone-number'}`}
                            onChange={(e) => handleInputChange('Phone_Number', e.target.value)}
                        />
                        {
                            phoneError &&
                            <ErrorMessageDisplay
                                className=''
                                message='Please enter a valid phone number'
                            />
                        }
                    </div>

                    <div className='col-lg-3 col-md-6 col-sm-12'>
                       <LabelAndInput
                            label='Company Email Address'
                            placeholder='Enter email address'
                            type='text'
                            value={formData?.Email_Address}
                            dataTest={`${fromUser ? 'user-email-address' : 'profile-email-address'}`}
                            onChange={(e) => handleInputChange('Email_Address', e.target.value)}
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

export default AddDealerDetails