import { StatCard, StatGrid } from '../dashboard/Components/StatCard/StatCard';
import { FileText, Clock, Truck, Globe } from 'lucide-react';
import styles from './page.module.sass';
import TableToolbar from '../purchase-order/Components/TableToolbar/TableToolbar';
import OrderTable from './Components/OrderTable/OrderTable';
import QueueSummaryBar from './Components/QueueSummaryBar/QueueSummaryBar';

const GreenTrend = ({ text }: { text: string }) => (
  <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: 3 }}>
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 2L10 6H2L6 2Z" fill="#10b981"/></svg>
    {text}
  </span>
);

const dashboardData = [
  { label: 'Total in Queue', value: 6 },
  { label: 'New', value: 3 },
  { label: 'Pending Review', value: 2 },
  { label: 'Approved Today', value: 1 },
  { label: 'Avg Confidence', value: '92%' },
];

function OrderWrapper() {

  return (
    <div className={styles.dashboard}>
        <h2  className='inter_regular_grey_12px'>Review AI-generated recommendations and take action</h2>

       
       

        {/* Row 2 — Summary bar */}
        <div className={styles.fullRow}>
          <QueueSummaryBar stats={dashboardData} />
        </div>

        {/* Row 3 — Toolbar */}
        <div className={styles.fullRow}>
          <TableToolbar />
        </div>

        {/* Row 3 — Purchase table (full width) */}
        <div className={styles.fullRow}>
          <OrderTable />
        </div>

      

      </div>
  )
}

export default OrderWrapper