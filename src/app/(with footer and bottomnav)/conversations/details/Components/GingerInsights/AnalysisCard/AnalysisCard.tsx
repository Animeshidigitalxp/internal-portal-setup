"use client";

import styles from "./AnalysisCard.module.sass";

type AnalysisCardProps = {
  title: string;
  items: string[];
  score?: number; // for score dots
  maxScore?: number;
  badgeText?: string; // for persona label
  buyingBehavior?: string
};

export default function AnalysisCard({
  title,
  items,
  score,
  maxScore = 5,
  badgeText,
  buyingBehavior
}: AnalysisCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={`${styles.title} inter_regular_oblack_18px`}>{title}</h3>

        {/* Score Dots */}
        {typeof score === "number" && (
          <div className={styles.scoreContainer}>
            <div className={styles.dots}>
              {Array?.from({ length: maxScore })?.map((_, index) => (
                <span
                  key={index}
                  className={`${styles.dot} ${index < score ? styles.activeDot : ""
                    }`}
                />
              ))}
            </div>
            <span className={styles.scoreText}>
              {score}/{maxScore}
            </span>
          </div>
        )}

        {/* Badge */}
        {badgeText && (
          <span className={`${styles.badge} inter_regular_greencyanblue_14px`}>
            {badgeText}
          </span>
        )}
      </div>

      <ul className={styles.list}>
        {items?.map((item, index) => (
          <li key={index} className={`${styles.listItem} inter_regular_darkgrey_14px`}>
            <span className={styles.bullet} />
            {item}
          </li>
        ))}
      </ul>
      {badgeText && buyingBehavior &&
        <>
          <hr />
          <h3 className="mb-3 inter_bold_greencyanblue_14px">Buying Behavior</h3>
          <p className="inter_regular_greencyanblue_14px" style={{ lineHeight: '20px' }}>
            {buyingBehavior}
          </p>
        </>
      }
    </div>
  );
}
