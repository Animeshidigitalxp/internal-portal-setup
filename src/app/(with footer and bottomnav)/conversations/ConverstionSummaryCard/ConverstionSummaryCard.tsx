import { useAppDispatch } from '@/src/lib/hooks'
import style from './style.module.sass'
import { useRouter } from 'next/navigation'
import { setFullPageLoader } from '@/src/app/components/FullPageLoader/reducer/fullPageLoaderSlice'
import dayjs from 'dayjs'
import { getDuration } from '@/src/helpers/helper'
type ConverstionSummaryCardProps = {
    allData: any
    showLoad: boolean
}

const ConverstionSummaryCard = (props: ConverstionSummaryCardProps) => {
    const { allData, showLoad } = props

    const dispatchRedux = useAppDispatch()

    const router = useRouter()


    const handleRedirect = (id: number) => {
        router.push(`/conversations/details/${id}`)
        dispatchRedux(setFullPageLoader(true))
    }
    return (
        <div>
            {allData?.length > 0 &&
                allData?.[0] !== null &&
                allData?.map((data: any, index: any) => {

                    const lastMessage = data?.messages?.[data?.messages?.length - 1]?.content ?? '-'
                    return (
                        <div
                            className={`mb-4 ${style['recipe-bankmobile-card']}`}
                            role="button"
                            tabIndex={0}
                            onClick={() => handleRedirect(data?.id)}
                            key={data?.createdAt + index}>
                            <div className='d-flex justify-content-between mb-3' style={{ gap: '.6rem' }}>
                                <h2 className='inter_regular_darkblack_18px '>
                                    {data?.leads?.[0]?.name ?? '-'}
                                </h2>


                            </div>
                            <div className='d-flex align-items-center mb-3'>
                                <p className='inter_regular_darkgrey_14px'>
                                    {data?.createdAt ? dayjs(data?.createdAt).format('DD-MMM-YYYY HH:mm') : '-'} 
                                </p>
                                <p className='inter_regular_darkgrey_14px ml-3'>
                                    {data?.endedAt ? getDuration(data?.startedAt, data?.endedAt) : '-'}
                                </p>
                                <div className={`${style['recipe-bankmobile-card-status']} ${style[data?.status?.toLowerCase()?.replaceAll(" ", "_")]}`}>
                                    {data?.status?.toLowerCase()?.replaceAll("_", " ")?.replace(/\b\w/g, (char: string) => char.toUpperCase()) ?? '-'}
                                </div>
                            </div>

                            <div className={style['recipe-bankmobile-metadata']}>
                                <div>
                                    <span className='inter_regular_darkgrey_14px'>Buyer Score :</span>
                                    <span className='inter_regular_darkblack_14px1 ml-3'>
                                        {data?.buyerScore ? `${data?.buyerScore}/5` : '-'}
                                    </span>

                                </div>

                                <div>
                                    <span className='inter_regular_darkgrey_14px'>Persona :</span>
                                    <span className='inter_regular_darkblack_14px1 ml-3'>
                                        {data?.personaType ?? '-'}
                                    </span>

                                </div>






                            </div>
                            <p className='inter_regular_darkgrey_14px' style={{lineHeight: 'normal'}}>
                                Last Message : {" "}
                                <span className='inter_regular_darkblack_14px1'>{lastMessage?.length > 71 ? lastMessage?.slice(0, 70) + '...' : lastMessage}</span>
                            </p>
                        </div>
                    )

                })
            }
        </div>
    )
}

export default ConverstionSummaryCard