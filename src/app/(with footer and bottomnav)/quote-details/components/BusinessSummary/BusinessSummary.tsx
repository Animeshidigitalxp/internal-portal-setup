import styles from './BusinessSummary.module.css'
import type { BusinessSummaryData } from '../../QuoteDetailsClient'

interface BusinessSummaryProps {
  business: BusinessSummaryData
}

function fmt(n: number) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function BusinessSummary({ business }: BusinessSummaryProps) {
  const { quantity, tdSynnexPrice, marginPercent, margin, clientInvoiceTotal } = business

  const rows = [
    { label: 'Quantity', value: `${quantity} units` },
    { label: 'TD Synnex price', value: `$${fmt(tdSynnexPrice)} / unit` },
  ]

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.cardHeaderTitle}>Business Summary</span>
      </div>

      <div className={styles.body}>
        {rows.map((row) => (
          <div key={row.label} className={styles.row}>
            <span className={styles.rowLabel}>{row.label}</span>
            <span className={styles.rowValue}>{row.value}</span>
          </div>
        ))}

        <div className={styles.row}>
          <span className={styles.rowLabel}>Margin ({marginPercent}%)</span>
          <span className={`${styles.rowValue} ${styles.rowValueTeal}`}>
            ${fmt(margin)}
          </span>
        </div>

        <div className={styles.divider} />

        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>Client invoice total</span>
          <span className={styles.totalValue}>${fmt(clientInvoiceTotal)}</span>
        </div>

        <div className={styles.buttons}>
          <button className={styles.outlineBtn}>Override SKU</button>
          <button className={styles.primaryBtn}>
            Place Order on TD Synnex
          </button>
        </div>
      </div>
    </div>
  )
}
