
import InsightLabelAndValue from './InsightLabelAndValue'
import Style from './style.module.sass'

type BuyerProfileProps = {
  profile: any
}

const BuyerProfile = (props: BuyerProfileProps) => {
  const {profile} = props
  return (
    <div className={Style['buyer-profile-container']}>
        <h2 className={`${Style['buyer-profile-label']} inter_regular_oblack_18px`}>Buyer profile</h2>
        <InsightLabelAndValue label={'Buyer Score'} value={ profile?.buyerScore ? `${profile?.buyerScore}/5` : '-' } maxScore={5} score={profile?.buyerScore} dataTest='customer-name' />
        <InsightLabelAndValue label={'Persona'}  value={ profile?.personaType ?? '-'} dataTest='customer-name' />
        <InsightLabelAndValue label={'Lifestyle'} value={ profile?.summary?.lifestyle ?? '-' } dataTest='customer-name' />
        <InsightLabelAndValue label={'Group Size'} value={ profile?.summary?.groupSize ?? '-'} dataTest='customer-email' />
        <InsightLabelAndValue label={'Water Type'} value={ profile?.summary?.primaryUsage ?? '-'} dataTest='customer-phone' />
        <InsightLabelAndValue label={'Experience'} value={ profile?.summary?.experience ?? '-'} dataTest='customer-company' />
        <InsightLabelAndValue label={'Budget'} value={ profile?.budget ?? profile?.summary?.budgetRange ?? '-'} dataTest='customer-company' />
         <InsightLabelAndValue label={'Timeline'} value={profile?.timeline ?? profile?.summary?.buyingIntent ?? '-'} dataTest='customer-company' />
        <InsightLabelAndValue label={'Specifically'} value={ profile?.summary?.specifically ?? '-' } dataTest='customer-company' />
    </div>
  )
}

export default BuyerProfile