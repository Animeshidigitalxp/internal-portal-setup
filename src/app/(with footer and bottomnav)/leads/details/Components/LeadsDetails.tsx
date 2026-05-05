
import BuyerProfileCard from "./BuyerProfileCard/BuyerProfileCard"
import ChatTranscript from "./ChatTranscript"
import LeadConversationSummary from "./LeadConversationSummary"
import RecommendedBoats from "./RecommendedBoats/RecommendedBoats"
import styles from './LeadDetails.module.sass'




type LeadsDetailsProps = {
    leadData: any
}

const LeadsDetails = (props: LeadsDetailsProps) => {
    const { leadData } = props

    console.log('leadData', leadData)
    

    


    return (
        <div className={`${styles['lead-details-con']}`}>
            <div>
                <h2 className="inter_regular_oblack_18px">Lead Detail</h2>
            </div>
            <div className="mt-5">
                <BuyerProfileCard
                    name={leadData?.name ?? '-'}
                    email={leadData?.email ?? '-'}
                    phone={leadData?.phone ?? '-'}
                    buyerScore={leadData?.buyerScore ? `${leadData?.buyerScore}/5` : '-'}
                    persona={leadData?.personaType ?? '-'}
                    fields={[
                        { label: "Lifestyle", value: leadData?.summary?.lifestyle ?? '-' },
                        { label: "Group Size", value: leadData?.summary?.groupSize ?? '-' },
                        // { label: "Water Type", value: leadData?.summary?.waterType ?? '-' },
                        { label: "Experience", value: leadData?.summary?.experience ?? '-' },
                        { label: "Budget", value: leadData?.budget ?? leadData?.summary?.budgetRange ?? '-' },
                        { label: "Timeline", value: leadData?.timeline ?? leadData?.summary?.buyingIntent ?? '-' },
                        // { label: "Storage", value: leadData?.summary?.storage ?? '-' },
                        { label: "Looking for", value: leadData?.summary?.primaryUsage ?? '-' },
                    ]}
                    specifically={leadData?.summary?.specifically ?? '-'}
                />
            </div>
            <div className={`row ${styles['lead-details-row']}`}>
                <div className={`col-lg-7 ${styles['lead-details-col']}`}>
                    <div className="mt-4">
                        <LeadConversationSummary content={leadData?.summary?.summary ?? '-'} />
                    </div>
                    <div className="mt-4">
                        <ChatTranscript newMessage={ leadData?.conversation?.messages} id={leadData?.id}/>

                        
                    </div>
                </div>
                <div className={`col-lg-5 ${styles['lead-details-col']}`}>
                    <div className="mt-4">
                        <RecommendedBoats boats={leadData?.conversation?.messages?.filter((data: { type: string }) => data?.type === 'boat_cards')?.[0]?.boats ?? []} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeadsDetails