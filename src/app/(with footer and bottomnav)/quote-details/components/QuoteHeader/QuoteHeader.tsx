import { useRouter } from 'next/navigation'
import styles from './QuoteHeader.module.css'

interface QuoteHeaderProps {
  id: string
  clientName: string
  quoteType: string
  department: string
  timestamp: string
}

export default function QuoteHeader({ id, clientName, quoteType, department, timestamp }: QuoteHeaderProps) {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <span className={styles.breadcrumbLink} onClick={() => router.back()}>
          Morning queue
        </span>
        <span className={styles.breadcrumbSep}>›</span>
        <span className={styles.breadcrumbCurrent}>Quote details</span>
      </div>

      <div className={styles.titleRow}>
        <div className={styles.titleLeft}>
          <h1 className={styles.title}>
            {clientName} — {quoteType} {id}
          </h1>
          <div className={styles.meta}>
            <span className={styles.metaBadge}>{department}</span>
            <span className={styles.metaDot}>•</span>
            <span className={styles.metaText}>{timestamp}</span>
          </div>
        </div>

        <div className={styles.statusBadge}>
          <span className={styles.statusDot} />
          Quote Ready
        </div>
      </div>
    </div>
  )
}
