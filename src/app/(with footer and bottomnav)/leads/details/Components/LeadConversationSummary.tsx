import styles from './BuyerProfileCard/BuyerProfileCard.module.sass'
interface SummaryProps {
  title?: string;
  content?: string;
}

const LeadConversationSummary: React.FC<SummaryProps> = ({ 
  title = "Conversation Summary", 
  content
}) => {
  return (
    <div className={styles.card}>
      <h3 className='inter_regular_oblack_18px'>{title}</h3>
      <p className='inter_regular_darkblack_16px mt-3' style={{lineHeight:'1.2', textAlign:'justify'}}>{content}</p>
    </div>
  );
};

export default LeadConversationSummary;