"use client"
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import style from './style.module.sass'
import EditPageEditButton from '@/src/app/components/common/EditPageEditButton/EditPageEditButton'
import LabelAndValue from '@/src/app/components/common/LabelAndValue/LabelAndValue'
import defaultProfile from '@/src/app/CommonImages/Defaultprofile.webp'
import BreadCrumbs from '@/src/app/components/common/BreadCrumbs/BreadCrumbs'
import CreateUser from '../create-user/CreateUser'

const UserDetail = (props: { userData: any, allroles?: any, fromUser?: boolean }) => {
    const { userData, allroles, fromUser } = props

    const pathname = usePathname()
    const [editProfile, setEditProfile] = useState(false)
    const [breadCrumbData, setBreadCrumbData] = useState([{
        label: 'Users',
        path: `/user-and-role`,
        isEdit: false,
        isActive: false,
        isLink: true
    },
    {
        label: 'User detail',
        path: pathname,
        isEdit: false,
        isActive: true,
        isLink: false
    }])

    const handleEditShow = () => {
        let val = [...breadCrumbData]
        val[1].isActive = false
        val[1].isLink = false
        val.push({
            label: 'Edit user detail',
            path: pathname,
            isEdit: false,
            isActive: true,
            isLink: false
        })
        console.log(val)
        setBreadCrumbData(val)
        setEditProfile(true)
    }

    const handleCloseEdit = () => {
        let val = [...breadCrumbData]
        val[1].isActive = true
        val[1].isLink = false
        val.splice(2, 1)
        console.log(val)
        setBreadCrumbData(val)
        setEditProfile(false)
    }

    const handleClick = () => {
        if (handleEditShow) {
            handleEditShow()
        }
        if (setEditProfile) {
            setEditProfile(true)
        }
    }
    return (
        <div>
            <BreadCrumbs
                dataTest={'user'}
                breadCrumbData={breadCrumbData}
                setEditFalse={setEditProfile}
                handleCloseEdit={handleCloseEdit} />
            {
                !editProfile ?

                    <div className={`${style['user-detail-section']} `}>
                        <div className='d-flex justify-content-between align-items-center'>
                            <h1 className='inter_normal_shark_20px'>{fromUser ? 'User profile' : 'My profile'}</h1>
                            <div className='d-flex'>
                                {

                                    <EditPageEditButton dataTest={`${fromUser ? 'user-edit' : 'profile-edit'}`} onClick={handleClick} />

                                }


                            </div>
                        </div>

                        <div className='mt-5 mb-5 ' style={{ width: '80%' }}>
                            <div className='d-flex justify-content-between'>

                                <div>
                                    <p className={`inter_regular_shark_14px mb-4`}>Profile: </p>
                                    <img
                                        // src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                                        src={userData?.Profile_Photo_URL === '' ? defaultProfile.src : userData?.Profile_Photo_URL ?? defaultProfile.src}
                                        alt='profile'
                                        data-test={`${fromUser ? 'user-profile' : 'profile-profile'}`}
                                        className={style['user-profile-image']}
                                    />
                                </div>


                            </div>

                            <p className={`inter_regular_shark_14px ${style['user-name-text']}`} data-test={`${fromUser ? 'user-name' : 'profile-name'}`}>
                                {userData?.First_Name} {userData?.Last_Name}
                            </p>
                        </div>
                        <LabelAndValue label='Status' value={userData?.Status ?? '-'} dataTest={`${fromUser ? 'user-status' : 'profile-status'}`} />
                        <LabelAndValue label='Position' value={userData?.Position ?? '-'} dataTest={`${fromUser ? 'user-position' : 'profile-position'}`} />

                        <hr className='mt-2' />

                        <div className={style['details_container']}>
                            <h2 className={'inter_regular_shark_15px'}>Access details:</h2>
                            <div className={`d-flex flex-column ${style['label_value_container']}`}>
                                <LabelAndValue label='Role' value={userData?.Role ?? '-'} dataTest={`${fromUser ? 'user-role' : 'profile-role'}`} />

                            </div>
                        </div>

                        <hr />

                        <div className={style['details_container']}>
                            <h2 className={'inter_regular_shark_15px'}>Contact information:</h2>
                            <div className={`d-flex flex-column ${style['label_value_container']}`}>
                                <LabelAndValue label='Contact phone' value={userData?.Phone_Number ?? '-'} dataTest={`${fromUser ? 'user-phone' : 'profile-phone'}`} />
                                <LabelAndValue label='Email address' value={userData?.Email_Address ?? '-'} dataTest={`${fromUser ? 'user-email' : 'profile-email'}`} />
                            </div>
                        </div>
                    </div>
                    :
                    <CreateUser
                        userData={{}}
                        fromCreate={true}
                        setEditProfile={handleCloseEdit}
                    />
            }
        </div>
    )
}

export default UserDetail