import React from "react";
import styles from "./AIRecommendationSummary.module.sass";

export type AIRecommendationSummaryProps = {
  title?: string;
  totalRecommendations: number;
  accepted: number;
  rejected: number;
  accuracyRate: number;
};

type BarRowProps = {
  label: string;
  value: number;
  percent: number;
};

function BarRow({ label, value, percent }: BarRowProps) {
  return (
    <div className={styles.barRow}>
      <div className={styles.rowHeader}>
        <span className={`${styles.label} inter_regular_black_13px`}>{label}</span>
        <span className={`${styles.value} inter_regular_black_13px`}>{value}</span>
      </div>
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${Math.min(Math.max(percent, 0), 100)}%` }}
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}

export default function AIRecommendationSummary({
  title = "AI Recommendation Summary",
  totalRecommendations,
  accepted,
  rejected,
  accuracyRate,
}: AIRecommendationSummaryProps) {
  const acceptedPct = totalRecommendations > 0 ? (accepted / totalRecommendations) * 100 : 0;
  const rejectedPct = totalRecommendations > 0 ? (rejected / totalRecommendations) * 100 : 0;

  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} inter_regular_black_15px`}>{title}</h2>

      <div className={styles.totalRow}>
        <span className={`inter_regular_black_13px`}>Total Recommendations</span>
        <span className={`${styles.totalValue} inter_semibold_black_13px`}>
          {totalRecommendations}
        </span>
      </div>

      {/* <div className={styles.divider} /> */}

      <BarRow label="Accepted" value={accepted} percent={acceptedPct} />

      {/* <div className={styles.divider} /> */}

      <BarRow label="Rejected" value={rejected} percent={rejectedPct} />

      <div className={styles.divider} />

      <div className={styles.accuracyRow}>
        <span className={`${styles.accuracyLabel} inter_regular_lightgrey_12px`}>
          Accuracy Rate
        </span>
        <span className={`${styles.accuracyValue} inter_semibold_lightgrey_16px`}>
          {accuracyRate}%
        </span>
      </div>
    </div>
  );
}
