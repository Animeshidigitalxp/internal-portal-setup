"use client"

import LabelAndInput from "@/src/app/components/common/LabelAndInput/LabelAndInput"
import LabelAndTextArea from "@/src/app/components/common/LabelAndTextArea/LabelAndTextArea"
import { useRouter } from "next/navigation"
import { useState } from "react"
import CreatePermission from "./CreatePermission"
import PinkButton from "@/src/app/components/common/PinkButton/PinkButton"
import { Modal } from "react-bootstrap"
import MessageModal from "@/src/app/components/common/Modal/MessagePop/MessagePopUp"
import DiscardModal from "@/src/app/components/common/Modal/DiscardModal/DiscardModal"

type CreateRoleProps = {
    roleData: any
    roleDropdown: any
    setEditProfile?: any
}

const CreateRole = (props: CreateRoleProps) => {
    const { setEditProfile, roleData, roleDropdown } = props
    const router = useRouter()

    const [permission, setPermission] = useState<any>(roleData?.Permissions ??
        [{
            "Add_Create_Edit": false,
            "Approve_Reject": false,
            "Category": "",
            "Feature": "",
            "Sub_Feature": "",
            "Threshold_Amount": "",
            "Update_Status": false,
            "View": false
        }]
    )
    const [backLoad, setBackLoad] = useState(false)
    const [showLoad, setShowLoad] = useState(false)
    const [discardError, setDiscardError] = useState('')
    const [errorHeading, setErrorHeading] = useState('')
    const [showError, setShowError] = useState('')

    const [roleDetail, setRoleDetail] = useState({
        "Type": roleData?.Type ?? "",
        "Status": roleData?.Status ?? "",

        "Name": roleData?.Name ?? "",
        "Description": roleData?.Description ?? ""
    })

    const handleInputChange = (field: string, value: string) => {
        setRoleDetail((prev: any) => ({
            ...prev,
            [field]: value,
        }));
    }


    const handleBack = () => {
        setShowError('')
        if (setEditProfile) {
            setErrorHeading('Discard Changes?')
            setDiscardError("You've made changes to this record. If you go back now, your edits will be lost. Do you want to continue?")
        } else {
            setErrorHeading('Discard Entry?')
            setDiscardError("You've started creating a new record. If you go back now, the information you entered will be lost. Do you want to continue?")
        }
    }

    const handleBackModal = () => {
        setBackLoad(true)
        if (setEditProfile) {
            window.scrollTo(0, 0)

            setBackLoad(false)
            setEditProfile?.()
        } else {

            router.push(`/user-and-role`)

        }
    }

    const handleCreateRole = async () => {

    }

    const handleResponse = (result: any, fromEdit: boolean, id: string) => {
        if (result?.StatusCode === 200) {
            if (fromEdit) {
                window.scrollTo(0, 0)

                setEditProfile?.()
            } else {

                router.push(`/user-and-role/role-detail/${id?.split('#')?.[1]}`)


            }
            // router.push(`/${countryCode}/setup/material/materialdetail/${materialData.id?.split('#')?.[1]}`)

        } else {
            setShowLoad(false)
            setErrorHeading('Error')
            setShowError(result?.Message ?? 'Something went wrong please try again later.')
        }
    }

    const handleUpdateRole = async () => {

    }

    const handleAddUpdate = async () => {
        if (roleData && Object.keys(roleData).length > 0) {
            await handleUpdateRole();
        } else {
            await handleCreateRole();
        }
    }

    return (
        <div className=' invite-section-container' style={{ padding: '3rem 3rem 20rem 3rem' }}>
            <h1 className='inter_normal_shark_20px'>Create  Role</h1>
            <div className='mt-5 mb-5'>
                <div className='row'>
                    <div className='col-lg-4 col-md-4 col-sm-12 mb-3'>
                        <LabelAndInput
                            label={`Role`}
                            placeholder={`Enter role name`}
                            type='text'
                            value={roleDetail?.Name}
                            onChange={(e) => handleInputChange('Name', e.target.value)}


                        />
                    </div>
                    <div className='col-lg-8 col-md-8 col-sm-12 mb-3'>
                        <LabelAndTextArea
                            label={`Description`}

                            placeholder={`Enter role description`}
                            value={roleDetail?.Description}
                            onChange={(e) => handleInputChange('Description', e.target.value)}
                        // dataTest={`${type}-supplier-description`}
                        />
                    </div>
                </div>
            </div>

            <CreatePermission
                permission={permission}
                setPermission={setPermission}
                roleDropdown={roleDropdown}
                roleData={roleData}
            />


            <div className={`mt-5 mb-5 d-flex justify-content-center align-items-center `} style={{ columnGap: '1.2rem' }}>

                <PinkButton label={roleData && Object?.keys(roleData)?.length > 0 ? 'Cancel' : 'Back'} whiteButton={true}
                    onClick={handleBack}
                // showLoad={backLoad} disabled={backLoad}
                />
                {
                    <PinkButton label={roleData && Object?.keys(roleData)?.length > 0 ? 'Save' : 'Add'}
                        disabled={showLoad}
                        onClick={handleAddUpdate} showLoad={showLoad}
                    />
                }
            </div>


            <Modal
                show={showError !== ''}
                className='d-flex justify-content-center align-items-center'>
                <MessageModal heading={errorHeading !== '' ? errorHeading : 'Error'} qerrorMessage={showError} trigger={() => setShowError('')} pathname={'/'} />
            </Modal>


            <Modal
                show={discardError !== ''}
                className='d-flex justify-content-center align-items-center'>
                <DiscardModal heading={errorHeading !== '' ? errorHeading : 'Discard?'} qerrorMessage={discardError} trigger={() => setDiscardError('')} pathname={'/'} trigger2={() => handleBackModal()} pinkBtnTitle={errorHeading === 'Discard Entry?' ? 'Discard Entry' : 'Discard Changes'} showLoad={backLoad} disabled={backLoad} />
            </Modal>
        </div>
    )
}

export default CreateRole