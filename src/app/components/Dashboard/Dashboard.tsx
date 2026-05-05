import React from 'react'
import StatCard from './Components/StatCard/StatCard'
import styles from './page.module.sass'
import ConversionFunnel from './Components/ConversionFunnel/ConversionFunnel';
import DataTable, { Column, ScoreChip, StatusBadge } from './Components/DataTable/DataTable';
import SessionsTable from './Components/SessionsTable/SessionsTable';
import LeadsTable from './Components/DataTable/LeadsTable/LeadsTable';


 

 


export function formatNumber(value: number): string {
    const abs = Math.abs(value);

    if (abs >= 1_000_000_000) {
        return (value / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
    }

    if (abs >= 1_000_000) {
        return (value / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    }

//     if (abs >= 1_000) {
//         return (value / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
//     }

    return value.toString();
}

function Dashboard() {

      const formatValue = (input: number | string) => {
  if (typeof input === "number") return input.toString();

  // Remove commas
  const clean = input.replace(/,/g, "");

  // Match optional ~, optional -, number with decimal, optional %
  const match = clean.match(/~?-?\d+(\.\d+)?%?/);

  return match ? match[0] : "";
};


      const stats = [
    {
      title: "Total Leads",
      value: formatNumber(1247) || "N/A",
      percentage: 12.00,
    },
    {
      title: "Conversations w/o contacts",
      value: formatNumber(23) || "N/A",
      percentage: 5.00,
    },
    {
      title: "Lead Conversion Rate",
      value: formatNumber(24.5) + "%" || "N/A",
      percentage: 2.00,
    },
    {
      title: "Avg Recommendation Time",
      value: formatNumber(2300000000) || "N/A",
      percentage: 14.00,
    },
    {
      title: "High Intent Leads",
      value: formatNumber(56) || "N/A",
      percentage: -2.00,
    },
    {
      title: "Avg Buyer Score",
      value: formatNumber(78) || "N/A",
      percentage: 0.00,
    },
  ];

  const funnelData: any = [
  { label: "Visitor",       value: 10450, percentage: "100%"  },
  { label: "Chat",          value: 2847,  percentage: "27.2%" },
  { label: "Qualified Lead",value: 1247,  percentage: "11.9%" },
  { label: "High Intent",   value: 356,   percentage: "3.4%"  },
  { label: "Closed",        value: 101,   percentage: "0.97%" },
];

  return (
        <div className={styles.wrapper}>
      {/* HEADER SECTION */}

       <div className={styles.header}>
  <div className={styles.titleArea}>
    <h2 className={`${styles.title} inter_500_shark_20px`}>Dashboard</h2>
    <p className={`${styles.subtitle} inter_regular_light_grey_14px`}>Real-time performance overview</p>
  </div>

  {/* NEW DROPDOWN SECTION */}
  <div className={styles.dropdownContainer}>
  <select className={styles.dropdown}>
    <option value="6months">Last 6 months</option>
    <option value="3months">Last 3 months</option>
    <option value="1month">Last month</option>
  </select>

  <div className={styles.icon}>
    <svg
      width="12"
      height="7"
      viewBox="0 0 12 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.54847 4.42992L9.74262 0.232463C10.0531 -0.0779672 10.555 -0.0779672 10.8622 0.232463C11.1726 0.542903 11.1693 1.04487 10.8622 1.35531L6.10988 6.11089C5.80936 6.41142 5.32719 6.41802 5.01676 6.13401L0.231463 1.35861C0.0762434 1.2034 0.000293732 0.998642 0.000293732 0.797193C0.000293732 0.595743 0.0762539 0.390983 0.231463 0.235773C0.541893 -0.0746574 1.04387 -0.0746574 1.351 0.235773L5.54847 4.42992Z"
        fill="#9CA3AF"
      />
    </svg>
  </div>
</div>
</div>

          <div className={styles.grid}>
      {stats.map((stat, i) => (
                <StatCard key={i} {...stat} />
              ))}</div>

               <main className={styles.main}>
      <div className={styles.tablegrid}>
       <SessionsTable />
        <LeadsTable />
      </div>
    </main>

               <main >
      <ConversionFunnel title="Conversion Funnel" stages={funnelData} />
    </main>

       

    
     
    </div>
  
  )
}

export default Dashboard