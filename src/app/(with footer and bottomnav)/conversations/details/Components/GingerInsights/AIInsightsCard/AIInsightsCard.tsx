"use client";

import styles from "./AIInsightsCard.module.sass";

type Insight = {
  title: string;
  description: string;
  confidence: number;
};

type Props = {
  cardTitle: string;
  data: Insight[];
};

export default function AIInsightsCard({ cardTitle, data }: Props) {
  return (
    <div className={styles.card}>
      <h3 className={`${styles.cardTitle} inter_regular_oblack_18px`}>{cardTitle}</h3>

      <div className={styles.container}>
        {data?.map((item, index) => (
          <div key={index} className={styles.section}>
            <div className={styles.header}>
              <span className={`${styles.title} inter_regular_oblack_14px`}>{item?.title}</span>
              <span className={`${styles.badge} inter_regular_darkgrey_14px`}>
                {item?.confidence}% confidence
              </span>
            </div>

            <p className={`${styles.description} inter_regular_darkgrey_14px`}>
              {item?.description}
            </p>

            {/* Divider except last */}
            {index !== data.length - 1 && (
              <div className={styles.divider} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
