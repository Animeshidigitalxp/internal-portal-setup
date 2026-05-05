"use client"
import LabelAndDropdownKeyValue from "@/src/app/components/common/LabelAndDropdown/LabelAndDropdownKeyValue"
import LabelAndInputSearchIcon from "@/src/app/components/common/LabelAndInputSearchIcon/LabelAndInputSearchIcon"
import NoRecordFound from "@/src/app/components/common/NoRecordFound/NoRecordFound"
// import styles from '@/src/app/components/common/Table/Table.module.sass'
import { useState } from "react"
import style from '@/src/app/components/common/Table/Table.module.sass'
// import { ChatRecord } from "./types"
import { useAppDispatch } from "@/src/lib/hooks"
import { setFullPageLoader } from "@/src/app/components/FullPageLoader/reducer/fullPageLoaderSlice"
import { useRouter } from "next/navigation"
import { ChatRecord } from "../conversations/types"
import Table from "../../components/common/Table/Table"
import { ClipLoader } from "react-spinners"
import StatusCard from "./Components/StatusCard/StatusCard"

type ComponentWrapperProps = {
    conversData: ChatRecord[]
}

const ComponentWrapper = (props: ComponentWrapperProps) => {

    const {conversData} = props

    const [entitiesData, setEntitiesData] = useState<ChatRecord[] | [null]>(conversData?.length > 0  ? conversData  : [null])
    const [showLoad, setShowLoad] = useState(false)
    const [scrollCalledFunc, setScrollCalledFunc] = useState(false);

    const dispatchRedux = useAppDispatch()
    const router = useRouter()

    const handleRedirect = () => {
        // router.push(`/conversations/details/1`)
        // dispatchRedux(setFullPageLoader(true))
    }

    const status = [
        {
          title: "Total Leads",
          value: 1247,
        },
        {
          title: "Conversations w/o contacts",
          value: 1247,
        },
        {
          title: "Lead Conversion Rate",
          value: 1247,
        },
       
      ];

    return (
        <div className='position-relative pb-5 mb-5'>
          <h3 className="inter_regular_darkgrey_14px ml-3">Boats synced from Salesforce</h3>
            <div className='d-flex justify-content-between ml-3 mb-4'>
                <div style={{ width: '31%', marginTop:'.8rem' }}>
                    <LabelAndInputSearchIcon
                        label=''
                        hideLabel={true}
                        placeholder='Search...'
                        type='text'
                    // onChange={(e) => handleChange(e.target.value)}
                    // value={searchTerm}
                    />
                </div>
                <div className="mr-4" style={{ width: "24rem" }}>
                    <LabelAndDropdownKeyValue
                        label=''
                        defaultValue='Select'
                        options={
                            [
                                { Material_Name: 'Invoice Date (Newest First)', Record_No: 'date_newest' },
                                { Material_Name: 'Invoice Date (Oldest first)', Record_No: 'date_oldest' },
                                { Material_Name: 'Due Date (Nearest first)', Record_No: 'due_date_nearest' },
                                { Material_Name: 'Due Date (Farthest first)', Record_No: 'due_date_farthest' },
                                { Material_Name: 'Amount (High to Low)', Record_No: 'amount_high_low' },
                                { Material_Name: 'Amount (Low to High)', Record_No: 'amount_low_high' },
                                { Material_Name: 'Open Balance (High to Low)', Record_No: 'open_balance_high_low' },
                                { Material_Name: 'Open Balance (Low to High)', Record_No: 'open_balance_low_high' },
                            ]
                        }
                        hideLabel={true}
                    // value={sortValue?.Material_Name}
                    // onChange={(value) => handleApplySort(value)}
                    // disabled={scrollCalledFunc}
                    />

                    
                </div>
            </div>

            <div className={style.grid}>
      {status.map((stat, i) => (
                <StatusCard key={i} {...stat} />
              ))}</div>

            <Table columnHeading={['','Name', 'Price', 'Type', 'Availability']}>
        {showLoad ?
        <tbody>
          <tr>
            <td colSpan={8} className='border-bottom-0'>
              <p className={`d-flex align-items-center justify-content-center mt-5 p-5`}><ClipLoader size={35} color='#000'/> </p>
            </td>
          </tr>
          </tbody>
          :
          entitiesData?.length > 0 &&
          entitiesData?.[0] !== null &&
          <tbody className={`${style['table_body']} ${style['table_body_vertical_middle']} inter_regular_gray2_14px`}>
            {entitiesData?.map((item: any, index: number) => {
            return (
              <tr data-test={'Supplier-table'} key={`${item?.Type ?? 'Type'}-${index}`} onClick={()=>handleRedirect()}>
                <td>{item?.boatImg ? <img src={item.boatImg.src} alt={item.boatName} className={style['table-img']} /> : '-'}</td>
                <td>{item?.boatName ?? '-'}</td>
                <td>{item?.price ?? '-'}</td>
                <td>{item?.type ?? '-'}</td>
                <td>{item?.Availability ?? '-'}</td>
               
              </tr>
            )
            })}
 
          </tbody>
         
         
        }
 
        {  entitiesData?.[0] === null &&
          <NoRecordFound/>
        }
 
        {
          entitiesData.length > 0 &&
          scrollCalledFunc &&
          <tbody>
          <tr>
            <td colSpan={8} className='border-bottom-0'>
              <p className={`d-flex align-items-center justify-content-center mt-5 p-5`}><ClipLoader size={35} color='#000'/> </p>
            </td>
          </tr>
          </tbody>
        }
      </Table>

           
        </div>
    )
}

export default ComponentWrapper