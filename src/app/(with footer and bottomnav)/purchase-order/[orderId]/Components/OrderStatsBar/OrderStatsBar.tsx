import styles from './OrderStatsBar.module.sass';

const fmt = (n: number) =>
  '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

type Props = {
  timeSince: string;
  expected: string;
  totalValue: number;
  margin: number;
};

function StatItem({ label, value, teal }: { label: string; value: string; teal?: boolean }) {
  return (
    <div className={styles.item}>
      <div className={` ${styles.label} ${teal ? ` ${styles.teal}` : ''} inter_regular_blue_13px`}>{label}</div>
      <div className={`${styles.value} inter_regular_black_16px ${teal ? ` ${styles.teal}` : ''}`}>{value}</div>
    </div>
  );
}

export default function OrderStatsBar({ timeSince, expected, totalValue, margin }: Props) {
  return (
    <div className={styles.bar}>
      <StatItem label="Time Since Place" value={timeSince} />
      <StatItem label="Expected Delivery" value={expected} />
      <StatItem label="Total Value" value={fmt(totalValue)} />
      <StatItem label="Margin" value={`${margin}%`} teal />
    </div>
  );
}