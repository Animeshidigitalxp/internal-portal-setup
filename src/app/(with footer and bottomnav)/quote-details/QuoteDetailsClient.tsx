'use client'

import QuoteHeader from './components/QuoteHeader/QuoteHeader'
import PipelineSteps from './components/PipelineSteps/PipelineSteps'
import RecommendationCard from './components/RecommendationCard/RecommendationCard'
import AlternativeOptions from './components/AlternativeOptions/AlternativeOptions'
import BusinessSummary from './components/BusinessSummary/BusinessSummary'
import styles from './QuoteDetailsClient.module.css'

export interface PipelineStep {
  id: number
  name: string
  detail: string
  meta: string
  isActive: boolean
}

export interface DeviceSpec {
  cpu: string
  ram: string
  storage: string
  display: string
}

export interface Recommendation {
  brand: string
  model: string
  fullModel: string
  sku: string
  matchScore: number
  specs: DeviceSpec
  pricePerUnit: number
  stock: number
  shipping: string
  reasoning: string
  upgradeNote: string
}

export interface Alternative {
  brand: string
  model: string
  pricePerUnit: number
  stock: number
  matchScore: number
}

export interface BusinessSummaryData {
  quantity: number
  tdSynnexPrice: number
  marginPercent: number
  margin: number
  clientInvoiceTotal: number
}

export interface QuoteData {
  id: string
  clientName: string
  quoteType: string
  department: string
  timestamp: string
  pipelineSteps: PipelineStep[]
  recommendation: Recommendation
  alternatives: Alternative[]
  business: BusinessSummaryData
}

const quoteData: QuoteData = {
  id: '#1047',
  clientName: 'Acme Corp',
  quoteType: 'Halo quick-quote',
  department: 'Engineering',
  timestamp: '22-Apr-2026 09:30 AM',
  pipelineSteps: [
    {
      id: 1,
      name: 'Halo Webhook',
      detail: 'New-hire form submitted, Acme Corp',
      meta: '08:14',
      isActive: false,
    },
    {
      id: 2,
      name: 'Profile Lookup',
      detail: 'Dell > 32GB < $1540',
      meta: 'Halo PSA Core API • 210ms',
      isActive: false,
    },
    {
      id: 3,
      name: 'Catalog Query',
      detail: '12 Dell SKUs matched',
      meta: 'TD Synnex Catalog API • 1.4s',
      isActive: false,
    },
    {
      id: 4,
      name: 'LLM Ranking',
      detail: 'Avail → Price → Spec',
      meta: 'Claude • Confidence 0.96 • 2.1s',
      isActive: false,
    },
    {
      id: 5,
      name: 'Quick-Quote Created',
      detail: 'Halo PSA Core API',
      meta: '08:14',
      isActive: true,
    },
  ],
  recommendation: {
    brand: 'Dell',
    model: 'XPS 15',
    fullModel: 'XPS 15 9530',
    sku: 'DEL-XPS15-i7-32GB',
    matchScore: 95,
    specs: {
      cpu: 'Intel Core i7-13700H',
      ram: '32GB DDR5',
      storage: '512GB NVMe SSD',
      display: '15.6" FHD+ (1920×1200)',
    },
    pricePerUnit: 1540,
    stock: 47,
    shipping: '2-3 business days',
    reasoning:
      'Best in-stock match for engineering team requirements. High CPU performance (14 cores) and 32GB RAM meet CAD software and virtualization needs. Price competitive within budget constraints.',
    upgradeNote: '64GB variant available at same price until end of quarter',
  },
  alternatives: [
    { brand: 'Lenovo', model: 'ThinkPad P1 Gen 6', pricePerUnit: 1600, stock: 23, matchScore: 92 },
    { brand: 'HP', model: 'ZBook Studio G10', pricePerUnit: 1575, stock: 15, matchScore: 89 },
  ],
  business: {
    quantity: 12,
    tdSynnexPrice: 1540,
    marginPercent: 18,
    margin: 3326.40,
    clientInvoiceTotal: 21806.40,
  },
}

export default function QuoteDetailsClient() {
  return (
    <div className={styles.wrapper}>
      <QuoteHeader
        id={quoteData.id}
        clientName={quoteData.clientName}
        quoteType={quoteData.quoteType}
        department={quoteData.department}
        timestamp={quoteData.timestamp}
      />

      <PipelineSteps steps={quoteData.pipelineSteps} />

      <div className={styles.body}>
        <div className={styles.leftCol}>
          <RecommendationCard recommendation={quoteData.recommendation} />
          <AlternativeOptions alternatives={quoteData.alternatives} />
        </div>
        <div className={styles.rightCol}>
          <BusinessSummary business={quoteData.business} />
        </div>
      </div>
    </div>
  )
}
