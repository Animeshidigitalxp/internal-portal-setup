import { useAppDispatch } from '@/src/lib/hooks'
import style from '../conversations/ConverstionSummaryCard/style.module.sass'
import { useRouter } from 'next/navigation'
import { setFullPageLoader } from '../../components/FullPageLoader/reducer/fullPageLoaderSlice'
import dayjs from 'dayjs'

type ConverstionSummaryCardProps = {
    allData: any
    showLoad: boolean
}

const LeadsCard = (props: ConverstionSummaryCardProps) => {
    const { allData, showLoad } = props

    const dispatchRedux = useAppDispatch()

    const router = useRouter()


    const handleRedirect = (id: number) => {
        router.push(`/leads/details/${id}`)
        dispatchRedux(setFullPageLoader(true))
    }
    return (
        <div>
            {allData?.length > 0 &&
                allData?.[0] !== null &&
                allData?.map((data: any, index: any) => (
                    <div
                        className={`mb-4 ${style['recipe-bankmobile-card']}`}
                        role="button"
                        tabIndex={0}
                        onClick={() => handleRedirect(data?.id)}
                        key={data?.id}>
                        <div className='d-flex justify-content-between mb-3' style={{ gap: '.6rem' }}>
                            <h2 className='inter_regular_darkblack_18px '>
                                {data?.name ?? '-'}
                            </h2>


                        </div>
                        <div className='d-flex align-items-center mb-3'>
                            <p className='inter_regular_darkgrey_14px'>
                                {data?.createdAt ? dayjs(data?.createdAt).format('DD-MMM-YYYY HH:mm') : '-'}
                            </p>
                            <div className={`${style['recipe-bankmobile-card-status']} ${style[data?.status?.toLowerCase()?.replaceAll(" ", "_")]}`}>
                                {data?.status?.toLowerCase()?.replace(/^./, (char: string) => char.toUpperCase())  ?? '-'}
                            </div>
                        </div>

                        <div className={`mb-0 ${style['recipe-bankmobile-metadata']}`}>
                            <div>
                                <span className='inter_regular_darkgrey_14px'>Phone :</span>
                                <span className='inter_regular_darkblack_14px1 ml-3'>
                                    {data?.phone ?? '-'}
                                </span>

                            </div>

                            <div>
                                <span className='inter_regular_darkgrey_14px'>Email :</span>
                                <span className='inter_regular_darkblack_14px1 ml-3'>
                                    {data?.email ?? '-'}
                                </span>

                            </div>
                        
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

                    </div>
                ))
            }
        </div>
    )
}

export default LeadsCard