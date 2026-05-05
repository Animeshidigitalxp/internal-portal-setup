"use client"

import BreadCrumbs from "@/src/app/components/common/BreadCrumbs/BreadCrumbs"
import { usePathname } from "next/navigation"
import { useState } from "react"
import style from '../detail.module.sass'
import EditPageEditButton from "@/src/app/components/common/EditPageEditButton/EditPageEditButton"
import LabelAndValue from "@/src/app/components/common/LabelAndValue/LabelAndValue"
import DynamicTable from "@/src/app/components/common/DynamicTable/DynamicTable"
import CreateRole from "../../create-role/CreateRole"
type RoleDetailProps = {

    roleDetail: any
    roleDropdown: any

}

const RoleDetail = (props: RoleDetailProps) => {
    const { roleDetail, roleDropdown } = props
    const pathname = usePathname();
    const [editProfile, setEditProfile] = useState(false)

    const [breadCrumbData, setBreadCrumbData] = useState(
        [{
            label: 'Roles',
            path: `/user-and-role`,
            isEdit: false,
            isActive: false,
            isLink: true
        },
        {
            label: 'Role detail',
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
            label: 'Edit Role detail',
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
    return (
        <div>

            <BreadCrumbs

                breadCrumbData={breadCrumbData}
                handleCloseEdit={handleCloseEdit}
                dataTest='RoleDetail' />

            {
                !editProfile ?
                    <div className={`${style['details-container']} p-5`}>
                        <div className={`d-flex justify-content-between`}>
                            <h2>Role detail</h2>
                            <div className='d-flex gap-3'>
                                {


                                    <EditPageEditButton onClick={handleEditShow} dataTest='Material-edit' />
                                }

                            </div>
                        </div>


                        <div className={`mt-5 ${style['margin-bottom25']}  mb-4`}>
                            <div>
                                <LabelAndValue label={'Status'} value={roleDetail?.Status ?? '-'} dataTest='roledetail-status' />
                                <LabelAndValue label={'Role'} value={roleDetail?.Name ?? '-'} dataTest='Material-status' />
                                <LabelAndValue label={'Description'} value={roleDetail?.Description ?? '-'} dataTest='Material-status' />
                            </div>
                        </div>
                        <hr />

                        <div className={`${style['margin-y']}`}>
                            <h2 className='inter_normal_shark_15px mb-2'>Permissions</h2>
                            <div className='mt-4 table-responsive mb-n3'>
                                <DynamicTable fromDetail={true}
                                    columnHeading={['Category', 'View', 'Add/Create/Edit', 'Update Status']} >
                                    <tbody className='inter_regular_shark_14px'>

                                    </tbody>

                                </DynamicTable>

                            </div>
                        </div>



                    </div>

                    :
                    <CreateRole

                        roleData={roleDetail}
                        roleDropdown={roleDropdown}
                        setEditProfile={handleCloseEdit}
                    />
            }
        </div>
    )
}

export default RoleDetail