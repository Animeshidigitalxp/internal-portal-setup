import styles from "./style.module.sass";

interface ConversationSummaryProps {
  summary: string;
}

export default function ConversationSummary({summary}: ConversationSummaryProps) {
  return (
    <div className={styles.container}>
      <h3 className={`${styles.heading} inter_bold_greencyanblue_14px`}>Conversation Summary:</h3>
      <p className={`${styles.text} inter_regular_greencyanblue_14px`}>
       {summary ?? '-'}
      </p>
    </div>
  );
}