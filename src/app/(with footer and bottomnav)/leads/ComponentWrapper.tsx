"use client"
import LabelAndDropdownKeyValue from "@/src/app/components/common/LabelAndDropdown/LabelAndDropdownKeyValue"
import LabelAndInputSearchIcon from "@/src/app/components/common/LabelAndInputSearchIcon/LabelAndInputSearchIcon"
import NoRecordFound from "@/src/app/components/common/NoRecordFound/NoRecordFound"
import styles from '@/src/app/components/common/Table/Table.module.sass'
import { useEffect, useState } from "react"
import { useAppDispatch } from "@/src/lib/hooks"
import { setFullPageLoader } from "@/src/app/components/FullPageLoader/reducer/fullPageLoaderSlice"
import { useRouter } from "next/navigation"
import pstyles from '../conversations/page.module.sass'
import { TbArrowsDownUp } from "react-icons/tb";
import { LuSlidersHorizontal } from "react-icons/lu";
import LeadsCard from "./LeadsCard"
import dayjs from "dayjs"
import { getAllLeads } from "./action"
import { ClipLoader } from "react-spinners"
type ComponentWrapperProps = {
    leadData: any
}

const ComponentWrapper = (props: ComponentWrapperProps) => {

    const { leadData } = props

    const [entitiesData, setEntitiesData] = useState(leadData?.data?.length > 0 ? leadData?.data : [null])
    const [showLoad, setShowLoad] = useState(false)
    const [scrollCalledFunc, setScrollCalledFunc] = useState(false);
    const [nextCurosr, setNextCurosr] = useState(leadData?.meta?.nextCursor ?? '')

    console.log('leadData', leadData)

    const dispatchRedux = useAppDispatch()
    const router = useRouter()

    const handleRedirect = (id: number | string) => {
        router.push(`/leads/details/${id}`)
        dispatchRedux(setFullPageLoader(true))
    }

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight; // More accurate than document.body.offsetHeight
            const scrollTop = window.scrollY;
            const clientHeight = window.innerHeight;
            // Calculate how far the user has scrolled
            const scrolledPercentage = (scrollTop + clientHeight) / scrollHeight;

            if (scrolledPercentage >= 0.8) {
                console.log('scroll called')
                if (!scrollCalledFunc && nextCurosr && nextCurosr !== '') {
                    handleLeadsPagination()
                }
            }
        }
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [nextCurosr, scrollCalledFunc])

    const handleLeadsPagination = async () => {
        setScrollCalledFunc(true)
        try {
            const convo = await getAllLeads(nextCurosr)
            const val = [...entitiesData, ...convo?.data ?? []]
            setEntitiesData(val)
            setScrollCalledFunc(false)
            setNextCurosr(convo?.meta?.nextCursor ?? '')
            console.log('paginate', convo)
        } catch (e) {
            console.log('pagination', e)
            setScrollCalledFunc(false)
        }
    }

    const hide = false

    return (
        <div className='position-relative pb-5 mb-5'>
            <div className='d-flex justify-content-between mb-4'>
              {hide && (
                <div className={`${pstyles['search-filter']}`}>
                    <LabelAndInputSearchIcon
                        label=''
                        hideLabel={true}
                        placeholder='Search...'
                        type='text'
                    // onChange={(e) => handleChange(e.target.value)}
                    // value={searchTerm}
                    />
                </div> )}
                {/* <div className={`d-flex align-items-center ${pstyles['sort-and-filters']}`}>
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

                <div className={pstyles['mobile-sort-filters']}>
                    <button className={`btn border-0 ${pstyles['mobile-filter']}`}>
                        <TbArrowsDownUp color='#1275B3' fontSize={'1.8rem'} />
                    </button>
                    <button className={`btn border-0 ${pstyles['mobile-filter']}`}>
                        <LuSlidersHorizontal color='#1275B3' fontSize={'1.8rem'} />
                    </button>
                </div> */}
            </div>

            <div className={`${pstyles['converstion-table']} table-responsive`}>
                <table className={`${styles["section__table"]} table `}>
                    <thead className={`${styles["section__table-header"]} inter_regular_black_14px`}>
                        <tr>

                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Score</th>
                            <th>Persona</th>
                            <th>Status</th>
                            <th>Created on</th>
                            {/* <th>Last Activity</th> */}
                        </tr>
                    </thead>
                    {
                        entitiesData?.length > 0 &&
                        entitiesData?.[0] !== null &&
                        <tbody className={`${styles['table_body']} inter_regular_gray2_14px`}>
                            {
                                entitiesData?.map((data: any) => (
                                    <tr key={data?.id ?? data?.name} onClick={() => handleRedirect(data?.id)}>

                                        <td>{data?.name ?? '-'}</td>
                                        <td>{data?.phone ?? '-'}</td>
                                        <td>{data?.email ?? '-'}</td>
                                        <td ><strong>{data?.buyerScore ? `${data?.buyerScore}/5` : '-'}</strong></td>
                                        <td>{data?.personaType ?? '-'}</td>
                                        <td className={`${styles[data?.status?.toLowerCase()]}`}>
                                            {data?.status?.toLowerCase()?.replace(/^./, (char: string) => char.toUpperCase()) ?? '-'}
                                        </td>
                                        <td>{data?.createdAt ? dayjs(data?.createdAt).format('DD-MMM-YYYY HH:mm') : '-'}</td>
                                        {/* <td>{data?.updatedAt ? dayjs(data?.updatedAt).format('DD-MMM-YYYY HH:mm') : '-'}</td> */}
                                    </tr>
                                ))
                            }
                        </tbody>
                    }
                    {entitiesData?.[0] === null &&
                        <NoRecordFound colspan={8} />
                    }
                    {
                        entitiesData?.length > 0 &&
                        scrollCalledFunc &&
                        <tbody>
                            <tr>
                                <td colSpan={11} className='border-bottom-0'>
                                    <p className={`d-flex align-items-center justify-content-center mt-5 p-5`}>
                                        <ClipLoader size={35} color='#000' /> </p>
                                </td>
                            </tr>
                        </tbody>
                    }
                </table>
            </div>

            <div className={`${pstyles['converstion-table-card']}`}>
                <LeadsCard
                    allData={entitiesData}
                    showLoad={showLoad}
                />
            </div>
        </div>
    )
}

export default ComponentWrapper