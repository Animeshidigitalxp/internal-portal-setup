// components/StatCard.tsx
import styles from './StatCard.module.sass';

interface StatCardProps {
  title: string;
  value: string | number;
  trend: string;
  icon: React.ReactNode;
}

export const StatCard = (props: StatCardProps) => {
    const  { title, value, trend, icon } = props;
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className='inter_medium_grey_13px'>{title}</h3>
        <div className={styles.iconWrapper}>{icon}</div>
      </div>
      <div className={`${styles.value} inter_regular_black_24px`}>{value}</div>
      <div className={`${styles.trend} inter_regular_grey_12px`}>{trend}</div>
    </div>
  );
};

// Wrapper Component for the Grid
export const StatGrid = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.grid}>{children}</div>;
};