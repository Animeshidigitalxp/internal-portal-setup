"use client"
import LabelAndDropdownKeyValue from "@/src/app/components/common/LabelAndDropdown/LabelAndDropdownKeyValue"
import LabelAndInputSearchIcon from "@/src/app/components/common/LabelAndInputSearchIcon/LabelAndInputSearchIcon"
import NoRecordFound from "@/src/app/components/common/NoRecordFound/NoRecordFound"
import styles from '@/src/app/components/common/Table/Table.module.sass'
import { useEffect, useState } from "react"
import { ChatRecord } from "./types"
import { useAppDispatch } from "@/src/lib/hooks"
import { setFullPageLoader } from "@/src/app/components/FullPageLoader/reducer/fullPageLoaderSlice"
import { useRouter } from "next/navigation"
import ConverstionSummaryCard from "./ConverstionSummaryCard/ConverstionSummaryCard"
import pstyles from './page.module.sass'
import { TbArrowsDownUp } from "react-icons/tb";
import { LuSlidersHorizontal } from "react-icons/lu";
import dayjs from "dayjs"
import { getDuration } from "@/src/helpers/helper"
import { getAllConversation } from "./action"
import { ClipLoader } from "react-spinners"
type ComponentWrapperProps = {
    conversData: any
}

const ComponentWrapper = (props: ComponentWrapperProps) => {

    const { conversData } = props

    console.log('conversData', conversData)

    const [entitiesData, setEntitiesData] = useState<any>(conversData?.data?.length > 0 ? conversData?.data : [null])
    const [showLoad, setShowLoad] = useState(false)
    const [scrollCalledFunc, setScrollCalledFunc] = useState(false);
    const [nextCurosr, setNextCurosr] = useState(conversData?.meta?.nextCursor ?? '')


    const dispatchRedux = useAppDispatch()
    const router = useRouter()

    const handleRedirect = (id: string) => {
        router.push(`/conversations/details/${id}`)
        dispatchRedux(setFullPageLoader(true))
    }

    console.log('nextCurosr',nextCurosr)
    useEffect(() => {
    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const clientHeight = window.innerHeight;

        const scrolledPercentage = (scrollTop + clientHeight) / scrollHeight;

        if (scrolledPercentage >= 0.8) {
            if (!scrollCalledFunc && nextCurosr) {
                console.log('scroll called');
                handleConversationPagination();
            }
        }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}, [nextCurosr, scrollCalledFunc]);

    const handleConversationPagination = async () => {
        setScrollCalledFunc(true)
        try {
            const convo = await getAllConversation(nextCurosr)
            const val = [...entitiesData, ...convo?.data ?? []]
            setEntitiesData(val)
            setScrollCalledFunc(false)
            setNextCurosr(convo?.meta?.nextCursor ?? '')
            console.log('paginate',convo)
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
                </div>
              )}
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
                </div> */}

                {/* <div className={pstyles['mobile-sort-filters']}>
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

                            <th>User</th>
                            <th>Start Time</th>
                            <th>Duration</th>
                            <th>Buyer Score</th>
                            <th>Persona</th>
                            <th>Status</th>
                            <th>Last Message</th>
                        </tr>
                    </thead>
                    {
                        entitiesData?.length > 0 &&
                        entitiesData?.[0] !== null &&
                        <tbody className={`${styles['table_body']} inter_regular_gray2_14px`}>
                            {
                                entitiesData?.map((data: any, index: number) => {
                                    // if (data?.messages?.length > 0) {
                                    const lastMessage = data?.messages?.[data?.messages?.length - 1]?.content ?? '-'

                                    return (
                                        <tr key={data?.createdAt + index} onClick={() => handleRedirect(data?.id)}>

                                            <td>{data?.leads?.[0]?.name ?? '-'}</td>
                                            <td>{data?.createdAt ? dayjs(data?.createdAt).format('DD-MMM-YYYY HH:mm') : '-'}</td>
                                            <td>{data?.endedAt ? getDuration(data?.startedAt, data?.endedAt) : '-'}</td>
                                            <td className="text-center"><strong>{data?.buyerScore ? `${data?.buyerScore}/5` : '-'}</strong></td>
                                            <td>{data?.personaType ?? '-'}</td>
                                            <td className={`${styles[data?.status?.toLowerCase()]}`}>
                                                {data?.status?.toLowerCase()?.replaceAll("_", " ")?.replace(/\b\w/g, (char: string) => char.toUpperCase()) ?? '-'}
                                            </td>
                                            <td className={''}>{lastMessage?.length > 71 ? lastMessage?.slice(0, 70) + '...' : lastMessage}</td>
                                        </tr>
                                    )
                                    // }
                                })
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
                <ConverstionSummaryCard
                    allData={entitiesData}
                    showLoad={showLoad}
                />
            </div>
        </div>
    )
}

export default ComponentWrapper