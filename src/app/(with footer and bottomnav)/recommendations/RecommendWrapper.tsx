import { Target, CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import styles from './page.module.sass';
import RecommdedTable from './Components/RecommdedTable/RecommdedTable';
import TableToolbar from '../purchase-order/Components/TableToolbar/TableToolbar';
import { StatGrid, StatCard } from '../dashboard/Components/StatCard/StatCard';

const GreenTrend = ({ text }: { text: string }) => (
  <span style={{ color: '#31BA9C', display: 'flex', alignItems: 'center', gap: 4 }}>
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
      <path d="M10.083 3.208L6.188 7.104 3.896 4.812.917 7.792" stroke="#31BA9C" strokeWidth="0.917" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.333 3.208h2.75v2.75" stroke="#31BA9C" strokeWidth="0.917" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    {text}
  </span>
);

const RedTrend = ({ text }: { text: string }) => (
  <span style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: 4 }}>
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
      <path d="M10.083 7.792L6.188 3.896 3.896 6.188.917 3.208" stroke="#ef4444" strokeWidth="0.917" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.333 7.792h2.75v-2.75" stroke="#ef4444" strokeWidth="0.917" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    {text}
  </span>
);

function RecommendWrapper() {
  const statsData = [
    {
      title: 'Total Recommendations',
      value: '1,247',
      trend: <GreenTrend text="+12.5%" />,
      icon: <Target size={20} />,
    },
    {
      title: 'Acceptance Rate',
      value: '78.2%',
      trend: <GreenTrend text="+3.2%" />,
      icon: <CheckCircle size={20} />,
    },
    {
      title: 'Rejection Rate',
      value: '21.8%',
      trend: <RedTrend text="-2.1%" />,
      icon: <XCircle size={20} />,
    },
    {
      title: 'Avg Confidence Score',
      value: '89.4%',
      trend: <GreenTrend text="+1.8%" />,
      icon: <TrendingUp size={20} />,
    },
  ];
  return (
    <div className={styles.dashboard}>
        <h2  className='inter_regular_grey_12px'>Track AI performance and improve recommendation accuracy</h2>

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
          <RecommdedTable />
        </div>

      

      </div>
  )
}

export default RecommendWrapper