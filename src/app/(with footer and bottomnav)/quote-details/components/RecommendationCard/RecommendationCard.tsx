import styles from './RecommendationCard.module.css'
import type { Recommendation } from '../../QuoteDetailsClient'

interface RecommendationCardProps {
  recommendation: Recommendation
}

export default function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const {
    brand,
    model,
    fullModel,
    sku,
    matchScore,
    specs,
    pricePerUnit,
    stock,
    shipping,
    reasoning,
    upgradeNote,
  } = recommendation

  const specItems = [
    { label: 'CPU', value: specs.cpu },
    { label: 'RAM', value: specs.ram },
    { label: 'Storage', value: specs.storage },
    { label: 'Display', value: specs.display },
  ]

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.cardHeaderIcon}>✦</span>
        <span className={styles.cardHeaderTitle}>Mini Marty's Recommendation</span>
      </div>

      <div className={styles.cardBody}>
        {/* Product hero */}
        <div className={styles.productRow}>
          <div className={styles.productLeft}>
            <h2 className={styles.productName}>
              {brand} {model}
            </h2>
            <span className={styles.productSku}>
              SKU: {sku}&nbsp;&nbsp;•&nbsp;&nbsp;Model: {fullModel}
            </span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className={styles.matchBadge}>{matchScore}%</div>
            <div className={styles.matchLabel}>Match score</div>
          </div>
        </div>

        {/* Specs grid */}
        <div className={styles.specsGrid}>
          {specItems.map((spec) => (
            <div key={spec.label} className={styles.specItem}>
              <span className={styles.specLabel}>{spec.label}</span>
              <span className={styles.specValue}>{spec.value}</span>
            </div>
          ))}
        </div>

        {/* Price & stock */}
        <div className={styles.priceStockRow}>
          <div className={styles.priceBlock}>
            <span className={styles.priceLabel}>Price per unit</span>
            <span className={styles.priceValue}>
              ${pricePerUnit.toLocaleString()}
              <span className={styles.priceUnit}> / unit</span>
            </span>
          </div>
          <div className={styles.stockGroup}>
            <div className={styles.stockBadge}>
              <span className={styles.stockDot} />
              {stock} units
            </div>
            <span className={styles.shippingText}>Shipping: {shipping}</span>
          </div>
        </div>

        {/* Why This Device */}
        <div className={styles.reasoningBox}>
          <p className={styles.reasoningTitle}>Why This Device?</p>
          <p className={styles.reasoningText}>{reasoning}</p>
        </div>

        {/* Upgrade note */}
        <div className={styles.upgradeNote}>
          <span className={styles.upgradeIcon}>ℹ</span>
          {upgradeNote}
        </div>
      </div>
    </div>
  )
}
