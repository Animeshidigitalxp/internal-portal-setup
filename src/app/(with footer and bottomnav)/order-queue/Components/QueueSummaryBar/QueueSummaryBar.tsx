import React from 'react';
import styles from './QueueSummaryBar.module.sass';

interface StatItem {
  label: string;
  value: string | number;
}

interface StatsGridProps {
  stats: StatItem[];
}

const StatCard: React.FC<StatItem> = ({ label, value }) => (
  <div className={styles.statCard}>
    <span className={`${styles.label} inter_regular_lightgrey_12px`}>{label}</span>
    <span className={`${styles.value} inter_medium_black_18px`}>{value}</span>
  </div>
);

const QueueSummaryBar: React.FC<StatsGridProps> = ({ stats }) => {
  return (
    <div className={styles.statsGrid}>
      {stats.map((item, index) => (
        <StatCard key={index} label={item.label} value={item.value} />
      ))}
    </div>
  );
};

export default QueueSummaryBar;