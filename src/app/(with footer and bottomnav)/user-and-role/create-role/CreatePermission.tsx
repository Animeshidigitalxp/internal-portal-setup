"use client"

import DynamicTable from "@/src/app/components/common/DynamicTable/DynamicTable"
import DynamicTableDropdownObject from "@/src/app/components/common/DynamicTable/DynamicTableDropdown/DynamicTableDropdownObject"
import { useEffect, useState } from "react"
import { RiDeleteBin6Line } from "react-icons/ri"

type CreatePermissionProps = {
    roleDropdown: any
    setPermission: any
    permission: any
    roleData: any

}

const CreatePermission = (props: CreatePermissionProps) => {
    const { roleData, roleDropdown, permission, setPermission } = props

    const [feature, setFeature] = useState([{
        Data: {},
    }])

    const [subFeature, setsubFeature] = useState([{
        Data: {},
    }])

    const [subFeature2, setsubFeature2] = useState([{
        Data: {},
    }])

    const [lastSelected, setLastSelected] = useState<any>([{
        Data: {},
    }])

    useEffect(() => {
        if (roleData?.Permissions) {
            let featA = [];
            let subFeaA = []
            let lastA = []
            for (const data of roleData.Permissions) {
                const { Category, Feature, Sub_Feature } = data;
                const categoryObj = roleDropdown?.[Category] ?? {};
                let lastObj = categoryObj



                let featureObj = {}
                if (data?.Feature && data?.Feature !== '') {
                    featureObj = roleDropdown?.[Category] ?? {}
                    lastObj = roleDropdown?.[Category]?.[Feature] ?? {}
                }
                featA.push({
                    Data: featureObj,
                })

                let subfeatureObj = {}
                if (data?.Sub_Feature && data?.Sub_Feature !== '') {

                    subfeatureObj = roleDropdown?.[Category]?.[Feature] ?? {}
                    lastObj = roleDropdown?.[Category]?.[Feature]?.[Sub_Feature] ?? {}
                }
                subFeaA.push({
                    Data: subfeatureObj,
                })
                lastA.push({
                    Data: lastObj,
                })


            }


            setLastSelected(lastA)
            setsubFeature(subFeaA)
            setFeature(featA)

        }
    }, [])

    const columnHeading = ['Category', 'View', 'Add/Create/Edit', 'Update Status', '']


    const updatePermissionState = (feild: string, value: any, index: number) => {
        const currentPer = [...permission]
        currentPer[index][feild] = value
        setPermission(currentPer)
    }

    const handleChangeCatgory = (key: any, value: any, index: number) => {
        console.log('roleDropdown handleChangeCatgory', value, 'key', key, 'value', value?.Feature)

        // 1. Reset permission fields
        updatePermissionState('Category', key, index)
        updatePermissionState('Feature', '', index)
        updatePermissionState('Sub_Feature', '', index)

        // 2. Update feature list based on selected category

        const currentFeature = [...feature]
        currentFeature[index] = { Data: value?.Feature === undefined ? value : {} }
        setFeature(currentFeature)

        // 3. Reset subFeature at this index (ACTUAL FIX)
        const currentSubFeature = [...subFeature]
        currentSubFeature[index] = { Data: {} } // ✅ this is important
        setsubFeature(currentSubFeature)

        // 4. Reset lastSelected to category-level
        const currentLast = [...lastSelected]
        currentLast[index] = { Data: value }
        setLastSelected(currentLast)
    }


    const handleChangeFeature = (key: any, value: any, index: number) => {
        console.log('roleDropdown handleChangeFeature', value, 'key', key, 'value', value?.Sub_Feature)

        updatePermissionState('Feature', key, index)
        updatePermissionState('Sub_Feature', '', index) // Reset sub-feature
        const currentFeature = [...subFeature]
        currentFeature[index] = { Data: value?.Sub_Feature === undefined ? value : {} }
        setsubFeature(currentFeature)



        const currentLast = [...lastSelected]
        currentLast[index] = { Data: value }
        setLastSelected(currentLast)



    }

    const handleChangeSubFeature = (key: any, value: any, index: number) => {
        console.log('roleDropdown handleChangeSubFeature', value, 'key', key)
        // const currentFeature = [...subFeature2]
        // currentFeature[index].currentSelect = value
        // setsubFeature2(currentFeature)

        updatePermissionState('Sub_Feature', key, index)

        const currentLast = [...lastSelected]
        currentLast[index].Data = value
        setLastSelected(currentLast)

    }

    const handleAdd = () => {
        setPermission([
            ...permission,

            {
                "Add_Create_Edit": false,
                "Approve_Reject": false,
                "Category": "",
                "Feature": "",
                "Sub_Feature": "",
                "Threshold_Amount": "",
                "Update_Status": false,
                "View": false
            }
        ])

        const newObj = {
            Data: {},
        }
        setFeature([
            ...feature,
            newObj
        ])

        setsubFeature([
            ...subFeature,
            newObj
        ])

        setLastSelected([
            ...lastSelected,
            newObj
        ])
    }

    const handleDelete = (index: number) => {
        let value = [...permission]
        value.splice(index, 1)
        setPermission(value)

        let value1 = [...feature]
        value1.splice(index, 1)
        setFeature(value1)

        let value2 = [...subFeature]
        value2.splice(index, 1)
        setsubFeature(value2)

        let value3 = [...lastSelected]
        value3.splice(index, 1)
        setLastSelected(value3)
    }
    return (
        <div className='mt-5 mb-5'>
            <h2 className='inter_semibold_shark_14px'>Permissions</h2>
            <div className='mt-5 table-responsive' style={{ overflow: 'visible' }}>
                <DynamicTable
                    columnHeading={columnHeading}>

                    <tbody>
                        {
                            permission?.map((item: any, index: number) => {

                                return (
                                    <tr key={`${'item'}-${index}`}>
                                        <td className={`inter_regular_shark_14px `}>
                                            <DynamicTableDropdownObject
                                                options={roleDropdown ?? {}}
                                                defaultValue="Select category"
                                                onChange={(key, value) => handleChangeCatgory(key, value, index)}
                                                value={item?.Category}




                                            />
                                        </td>
                                        {/* <td className={`inter_regular_shark_14px ${feature?.[index]?.Data && Object?.keys(feature?.[index]?.Data)?.length === 0 ? 'autofill-position-input' : ''}`}>
                                            <DynamicTableDropdownObject
                                                options={feature?.[index]?.Data ?? {}}
                                                defaultValue="Select feature"
                                                onChange={(key, value) => handleChangeFeature(key, value, index)}
                                                value={item?.Feature}
                                                disabled={feature?.[index]?.Data && Object?.keys(feature?.[index]?.Data)?.length === 0}



                                            />
                                        </td>
                                        <td className={`inter_regular_shark_14px ${subFeature?.[index]?.Data && Object?.keys(subFeature?.[index]?.Data)?.length === 0 ? 'autofill-position-input' : ''}`}>
                                            <DynamicTableDropdownObject
                                                options={subFeature?.[index]?.Data ?? {}}
                                                defaultValue="Select sub feature"
                                                onChange={(key, value) => handleChangeSubFeature(key, value, index)}
                                                value={item?.Sub_Feature}
                                                disabled={subFeature?.[index]?.Data && Object?.keys(subFeature?.[index]?.Data)?.length === 0}



                                            />
                                        </td> */}
                                        <td className={`inter_regular_shark_14px ${!lastSelected?.[index]?.Data?.View ? 'autofill-position-input' : ''}`}>
                                            <input
                                                type='checkbox'
                                                className={`tax-radio-selection`}
                                                disabled={!lastSelected?.[index]?.Data?.View}
                                                checked={item?.View}
                                                onChange={(e) => updatePermissionState('View', e.target.checked, index)}
                                            />
                                        </td>
                                        {

                                            <td className={`inter_regular_shark_14px ${!lastSelected?.[index]?.Data?.['Add_Create_Edit'] ? 'autofill-position-input' : ''}`}>



                                                <input
                                                    type='checkbox'
                                                    className={`tax-radio-selection`}
                                                    disabled={!lastSelected?.[index]?.Data?.['Add_Create_Edit']}
                                                    checked={item?.Add_Create_Edit}
                                                    onChange={(e) => updatePermissionState('Add_Create_Edit', e.target.checked, index)}
                                                />

                                            </td>
                                        }

                                        <td className={`inter_regular_shark_14px ${!lastSelected?.[index]?.Data?.['Update_Status'] ? 'autofill-position-input' : ''}`}>
                                            <input
                                                type='checkbox'
                                                className={`tax-radio-selection`}
                                                disabled={!lastSelected?.[index]?.Data?.['Update_Status']}
                                                checked={item?.Update_Status}
                                                onChange={(e) => updatePermissionState('Update_Status', e.target.checked, index)}

                                            />
                                        </td>
                                        

                                        {
                                            index !== 0 ?
                                                <td style={{ width: '2%' }}>
                                                    <RiDeleteBin6Line color='#5F5F5F' className={` cursor-pointer`} style={{ fontSize: '2.1rem' }} onClick={() => handleDelete(index)} />
                                                </td>
                                                :
                                                <td style={{ width: '2%' }}></td>
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>

                </DynamicTable>
            </div>

             <div className={"add-address-button inter_regular_greenblack_14px col-lg-12 mt-1 pl-0"}>
                <button type='button' data-test='material-catalog-pricing-add' className={"cursor-pointer "} onClick={() => handleAdd()}> Add more</button>
            </div>
        </div>
    )
}

export default CreatePermission