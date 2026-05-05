
'use client'

import BottomSheet from '@/src/app/components/common/BottomSheet/BottomSheet'
import AIInsightsCard from './GingerInsights/AIInsightsCard/AIInsightsCard'
import AnalysisCard from './GingerInsights/AnalysisCard/AnalysisCard'
import BuyerProfile from './GingerInsights/BuyerProfile'
import ConversationSummary from './GingerInsights/ConversationSummary'
import styles from './style.module.sass'
import { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import ChatPanel from '@/src/app/components/common/ChatComponents/ChatPanel'
import dayjs from 'dayjs'
import { getDuration } from '@/src/helpers/helper'

type ConversationDetailsProps = {
    convoDetail: any
}

const ConversationDetails = (props: ConversationDetailsProps) => {
    const { convoDetail } = props
    const [showBottomSheet, setShowBottomSheet] = useState(false)


    const lead = convoDetail?.leads?.[0]

    const insightsData = (lead?.summary?.insights ?? []).map((item: any) => ({
        title: item?.title ?? '',
        confidence: item?.confidence ?? 0,
        description: item?.description ?? '',
    }))

    console.log('convoDetail', convoDetail)

    const newMessage = convoDetail?.messages?.map((data: { role: string, type: string | null }) => {
        let stP = ''
        if (data?.role === 'ASSISTANT') {
            stP = 'question'
        } else {
            stP = 'text'
        }

        return {
            ...data,
            type: data?.type && data?.type !== "stream_end" ? data?.type : stP
        }
    })

    console.log('newMessage', newMessage)

    const handleBottomSideBarClose = () => {
        setShowBottomSheet(false)
    }

    const InsightsPanel = () => (
        <>
            <BuyerProfile profile={lead} />

            <div className='mt-4'>
                <ConversationSummary summary={lead?.summary?.summary} />
            </div>
            {
                lead?.summary?.score_reasons?.length > 0 &&
                <div className='mt-4'>
                    <AnalysisCard
                        title="Score Analysis"
                        score={lead?.buyerScore}
                        items={lead?.summary?.score_reasons ?? []}
                    />
                </div>
            }

            {
                lead?.summary?.persona_reasons?.length > 0 &&
                <div className='mt-4'>
                    <AnalysisCard
                        title="Persona Analysis"
                        badgeText={lead?.personaType ?? lead?.summary?.persona_type ?? ''}
                        items={lead?.summary?.persona_reasons ?? []}
                        buyingBehavior={lead?.summary?.buying_behavior}
                    />
                </div>
            }

            {
                insightsData?.length > 0 &&
                <div className='mt-4'>
                    <AIInsightsCard cardTitle="AI Insights" data={insightsData} />
                </div>
            }

        </>
    )

    return (
        <div className={`${styles['conversation-details-con']} row m-0`}>
            <div className={`col-lg-7 p-0`}>
                <div className={styles['conversation-column-con']}>

                    <div className={`${styles['conversation-column']} d-flex justify-content-between`}>
                        <h2 className={`${styles['conversation-title']} inter_regular_darkblack_18px`}>
                            {convoDetail?.leads?.[0]?.name ?? 'Unknown'}
                        </h2>
                        <h2 className={`${styles['conversation-subtitle']} inter_regular_ashgray_16px`}>
                            {convoDetail?.createdAt ? dayjs(convoDetail?.createdAt).format('DD-MMM-YYYY HH:mm') : '-'}  •
                            <span> {convoDetail?.endedAt ? getDuration(convoDetail?.startedAt, convoDetail?.endedAt) : '-'}</span>
                        </h2>
                    </div>
                    <button className={`${styles.button} inter_regular_greencyanblue_14px`} onClick={() => setShowBottomSheet(true)}>
                        View AI Insights
                    </button>
                </div>

                <div className={`${styles['conversation-chat-panel']}`}>
                    <ChatPanel messages={newMessage} />
                </div>

            </div>

            <div className={`col-lg-5 p-0 ${styles['conversation-details-title-desk']}`}>
                <div className={`${styles['conversation-column']} ${styles['converstaion-border-left']} d-flex justify-content-between`} >
                    <h1 className='inter_regular_darkblack_18px'>Ginger AI Insights</h1>
                    {showBottomSheet &&
                        <button type='button' className={`${styles['group-532-aipuc']}`}
                            onClick={() => setShowBottomSheet(false)}
                        >
                            <RxCross2 />
                        </button>}
                </div>

                <div className={`${styles['conversation-column']} ${styles['converstaion-border-left']}`}>
                    <InsightsPanel />

                </div>
            </div>
            <BottomSheet onChange={() => handleBottomSideBarClose()} isOpen={showBottomSheet}>
                <div className={`col-lg-5 p-0 ${styles['conversation-details-title']}`}>
                    <div className={`${styles['conversation-column']} ${styles['converstaion-border-left']} d-flex justify-content-between`} style={{ flexDirection: 'row', marginBottom: '3rem' }}>
                        <h1 className='inter_regular_darkblack_18px'>Ginger AI Insights</h1>
                        {showBottomSheet &&
                            <button type='button' className={`${styles['group-532-aipuc']}`}
                                onClick={() => setShowBottomSheet(false)}
                            >
                                <RxCross2 />
                            </button>}
                    </div>

                    <div className={`${styles['conversation-column']} ${styles['converstaion-border-left']} ${styles['converstaion-insight-panel']}`}>

                        <InsightsPanel />
                    </div>
                </div>
            </BottomSheet>
        </div>
    )
}

export default ConversationDetails