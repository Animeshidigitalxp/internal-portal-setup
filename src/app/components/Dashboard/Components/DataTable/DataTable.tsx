"use client";

import React, { useState } from "react";
import styles from './DataTable.module.sass'

// ── Column definition ────────────────────────────────────────
export type ColumnAlign = "left" | "center" | "right";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  align?: ColumnAlign;
  render?: (value: unknown, row: T) => React.ReactNode;
}

// ── Component props ──────────────────────────────────────────
export interface DataTableProps<T extends Record<string, unknown>> {
  columns: Column<T>[];
  rows: T[];
  viewAllHref?: string;
  onViewAll?: () => void;
  className?: string;
  heading: string;
}

// ── Status badge ─────────────────────────────────────────────
export const StatusBadge = ({ status }: { status: string }) => {
  const normalized = status.toLowerCase();
  return (
    <span
      className={styles.badge}
      data-status={normalized}
      aria-label={`Status: ${status}`}
    >
      {status}
    </span>
  );
};

const scoreColors: Record<number, string> = {
  5: '#237B4D', // Dark Green
  4: '#1275B3', // Blue
  3: '#F4B700', // Yellow/Gold
  2: '#5B5B5B', // Grey
  1: '#d93025', // Red (Optional)
};

// ── Score chip ────────────────────────────────────────────────
// export const ScoreChip = ({ score }: { score: number }) => (
//   <span className={styles.score}>{score}</span>
// );

export const ScoreChip = ({ score }: { score: number }) => {
  // Fallback to a default color if the score isn't in the map
  const color = scoreColors[score as keyof typeof scoreColors] || '#5f6368';

  return (
     <span style={{ 
      color: color, 
      // Adjust size to match your screenshot
    }} className={styles.score}>{score}</span>
  );
};

// ── Main component ────────────────────────────────────────────
function DataTable<T extends Record<string, unknown>>({
  columns,
  rows,
  viewAllHref,
  onViewAll,
  className,
  heading
}: DataTableProps<T>) {
  const [expanded, setExpanded] = useState(false)
  
    const visibleData = expanded ? rows : rows.slice(0, 6)
  return (
    <div className={`${styles.wrapper} ${className ?? ""}`}>
      {(viewAllHref || onViewAll) && (
        <div className={styles.header}>
            <div className={styles.heading}>{heading} </div>
          <div
            // href={viewAllHref ?? "#"}
            className={styles.viewAll}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "View less" : "View all"}
            {/* View all */}
          </div>
        </div>
      )}

      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead >
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={styles.th}
                  style={{ textAlign: col.align ?? "left" }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {visibleData.map((row, rowIdx) => (
              <tr key={rowIdx} className={styles.tr}>
                {columns.map((col) => {
                   const raw = row[col.key as keyof T];
                    return (
                    <td
                      key={String(col.key)}
                      className={styles.td}
                      style={{ textAlign: col.align ?? "left" }}
                    >
                      {col.render
                        ? col.render(raw as unknown, row)
                        : raw != null
                        ? String(raw)
                        : <span className={styles.empty}>–</span>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;