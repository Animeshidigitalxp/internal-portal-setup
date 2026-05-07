import styles from './AlternativeOptions.module.css'
import type { Alternative } from '../../QuoteDetailsClient'

interface AlternativeOptionsProps {
  alternatives: Alternative[]
}

export default function AlternativeOptions({ alternatives }: AlternativeOptionsProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.cardHeaderTitle}>Alternative Options</span>
      </div>

      <div className={styles.list}>
        {alternatives.map((alt, index) => (
          <div key={index} className={styles.row}>
            <div className={styles.productInfo}>
              <span className={styles.productName}>
                {alt.brand} {alt.model}
              </span>
              <span className={styles.productMeta}>
                ${alt.pricePerUnit.toLocaleString()}/unit&nbsp;&nbsp;•&nbsp;&nbsp;
                {alt.stock} in stock
              </span>
            </div>

            <div className={styles.rightGroup}>
              <span className={styles.matchBadge}>{alt.matchScore}% match</span>
              <button className={styles.selectBtn}>Select</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
