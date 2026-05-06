'use client';

import ResetFullPageLoader from '../components/FullPageLoader/ResetFullPageLoader';
import { ShoppingCart, Box, Lightbulb, Target } from 'lucide-react';
import Section from '../components/common/Section/Section';
import { StatGrid, StatCard } from './dashboard/Components/StatCard/StatCard';
import MorningQueue from './dashboard/Components/MorningQueue/MorningQueue';
import RecentPurchaseOrders from './dashboard/Components/RecentPurchaseOrders/RecentPurchaseOrders';
import AIRecommendationSummary from './dashboard/Components/AIRecommendationSummary/AIRecommendationSummary';
import styles from './home.module.sass';

const statsData = [
  { title: 'Orders in Queue', value: 23, trend: '+5 from yesterday', icon: <ShoppingCart size={20} /> },
  { title: 'Orders Placed Today', value: 12, trend: '+12% vs last week', icon: <Box size={20} /> },
  { title: 'AI Recommendations', value: 47, trend: 'This week', icon: <Lightbulb size={20} /> },
  { title: 'AI Accuracy', value: '90%', trend: '+2% improvement', icon: <Target size={20} /> },
];

export default function Home() {
  return (
    <Section heading="Dashboard">
      <ResetFullPageLoader />

      <div className={styles.dashboard}>

        {/* Row 1 — Stat cards */}
        <div className={styles.fullRow}>
          <StatGrid>
            {statsData.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </StatGrid>
        </div>

        {/* Row 2 — Morning queue (full width) */}
        <div className={styles.fullRow}>
          <MorningQueue />
        </div>

        {/* Row 3 — Recent POs + AI summary side by side */}
        <div className={styles.bottomRow}>
          <RecentPurchaseOrders />
          <AIRecommendationSummary
            totalRecommendations={142}
            accepted={128}
            rejected={14}
            accuracyRate={90}
          />
        </div>

      </div>
    </Section>
  );
}
