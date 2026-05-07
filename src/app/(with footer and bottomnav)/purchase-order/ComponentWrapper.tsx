import MorningQueue from '../dashboard/Components/MorningQueue/MorningQueue';
import { StatCard, StatGrid } from '../dashboard/Components/StatCard/StatCard';
import PurchaseTable from './Components/PurchaseTable/PurchaseTable';
import TableToolbar from './Components/TableToolbar/TableToolbar';
import { FileText, Clock, Truck, Globe } from 'lucide-react';
import styles from './page.module.sass';

const GreenTrend = ({ text }: { text: string }) => (
  <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: 3 }}>
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 2L10 6H2L6 2Z" fill="#10b981"/></svg>
    {text}
  </span>
);

function ComponentWrapper() {
  const statsData = [
    {
      title: 'Total Orders',
      value: 9,
      trend: <GreenTrend text="+12.5%" />,
      icon: <FileText size={20} />,
    },
    {
      title: 'Orders in Progress',
      value: 6,
      trend: 'Placed  •  Processing  •  Shipped',
      icon: <Clock size={20} />,
    },
    {
      title: 'Delayed Orders',
      value: 2,
      trend: <span style={{ color: '#ef4444' }}>Stuck 48h+ in placed</span>,
      icon: <Truck size={20} />,
    },
    {
      title: 'Delivered Orders',
      value: 3,
      trend: (
        <>
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.0833 3.20825L6.18746 7.10409L3.89579 4.81242L0.916626 7.79159" stroke="#31BA9C" stroke-width="0.916667" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7.33337 3.20825H10.0834V5.95825" stroke="#31BA9C" stroke-width="0.916667" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          
           +1.8%
        </>
      ),
      icon: <Globe size={20} />,
    },
  ];
  return (
    <div className={styles.dashboard}>
        <h2  className='inter_regular_grey_12px'>Track order status and identify delays</h2>

        {/* Row 1 — Stat cards */}
         <div className={styles.fullRow}>
          <StatGrid>
            {statsData.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </StatGrid>
        </div>
       

        {/* Row 2 — Toolbar */}
        <div className={styles.fullRow}>
          <TableToolbar />
        </div>

        {/* Row 3 — Purchase table (full width) */}
        <div className={styles.fullRow}>
          <PurchaseTable />
        </div>

      

      </div>
  )
}

export default ComponentWrapper