import styles from "./StatusCard.module.sass";

type Props = {
  title: string;
  value: number | string;
  
};

export default function StatusCard({ title, value }: Props) {
 
  return (
    <div className={styles.card}>
      <p className={`${styles.title} inter_regular_gray_16px`}>{title}</p>

      <div className={styles.valueContainer}>
        <h3 className={`${styles.value} inter_regular_oblack_30px `}>
        {value}
      </h3>


      </div>

      
    </div>
  );
}