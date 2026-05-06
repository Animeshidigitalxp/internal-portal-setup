"use client";

import React from "react";
import styles from "./DashboardTable.module.sass";

export type ColumnAlign = "left" | "center" | "right";

export type ColumnDef<T> = {
  key: keyof T | string;
  header: string;
  width?: string;
  align?: ColumnAlign;
  render?: (value: unknown, row: T) => React.ReactNode;
};

export type DashboardTableProps<T extends Record<string, unknown>> = {
  title: string;
  subtitle?: string;
  columns: ColumnDef<T>[];
  rows: T[];
  className?: string;
};

export const StatusBadge = ({ status }: { status: string }) => {
  const normalized = status.toLowerCase().replace(/\s+/g, "-");
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

function DashboardTable<T extends Record<string, unknown>>({
  title,
  subtitle,
  columns,
  rows,
  className,
}: DashboardTableProps<T>) {
  return (
    <div className={`${styles.container} ${className ?? ""}`}>
      <div className={styles.tableHeader}>
        <h2 className={`${styles.title} inter_regular_black_15px`}>{title}</h2>
        {subtitle && <p className={`${styles.subtitle} inter_regular_grey_12px`}>{subtitle}</p>}
      </div>

      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={`${styles.th} inter_regular_grey_12px`}
                  style={{ textAlign: col.align ?? "left", width: col.width }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, rowIdx) => (
              <tr key={rowIdx} className={styles.tr}>
                {columns.map((col) => {
                  const raw = row[col.key as keyof T];
                  return (
                    <td
                      key={String(col.key)}
                      className={`${styles.td} inter_regular_black_13px`}
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

export default DashboardTable;
