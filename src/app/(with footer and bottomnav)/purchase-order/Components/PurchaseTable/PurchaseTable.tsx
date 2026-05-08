'use client';

import { useRouter } from 'next/navigation';
import DashboardTable, { ColumnDef } from "../../../dashboard/Components/DashboardTable/DashboardTable";
import { PURCHASE_DATA, normalizeOrderId } from "../../data/purchaseOrderData";
import type { PurchaseTableRow } from "../../data/purchaseOrderData";

export type { PurchaseTableRow };

// ── Badge config ──────────────────────────────────────────────

type BadgeStyle = { color: string; background: string; border?: string };

const ORDER_STATUS_STYLES: Record<string, BadgeStyle> = {
  shipped:    { color: "#00000080", background: "#EBEAEA80", border: "1px solid #e5e7eb" },
  processing: { color: "#F6BB06", background: "#F6BB061A" },
  placed:     { color: "#5AC3F0", background: "#5AC3F01A" },
  delivered:  { color: "#31BA9C", background: "#31BA9C1A" },
};

const RISK_STATUS_STYLES: Record<string, BadgeStyle> = {
  "on track":      { color: "#31BA9C", background: "#31BA9C1A" },
  "at risk 24h+":  { color: "#F6BB06", background: "#F6BB061A" },
  "delayed 48h+":  { color: "#DC2626", background: "#DC26261A" },
  "delivered":     { color: "#00000080", background: "#EBEAEA80" },
};

function Badge({ label, styleMap }: { label: string; styleMap: Record<string, BadgeStyle> }) {
  const s = styleMap[label.toLowerCase()] ?? { color: "#6b7280", background: "#f3f4f6" };
  return (
    <span
      style={{
        display: "inline-block",
        padding: "6px",
        borderRadius: 4,
        fontSize: 12.5,
        fontWeight: 500,
        color: s.color,
        background: s.background,
        border: s.border ?? "none",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

// ── Column definitions ────────────────────────────────────────

const columns: ColumnDef<PurchaseTableRow>[] = [
  { key: "Order", header: "Order" },
  { key: "Customer", header: "Customer" },
  {
    key: "DeviceName",
    header: "SKU/Device",
    render: (_val, row) => (
      <div>
        <div className="inter_medium_black_13px">{row.DeviceName}</div>
        <div className="inter_regular_grey_13px" style={{ fontSize: 12, marginTop: 4 }}>
          {row.DeviceSpecs}
        </div>
      </div>
    ),
  },
  { key: "Qty", header: "Qty" },
  {
    key: "OrderStatus",
    header: "Order Status",
    render: (val) => <Badge label={String(val)} styleMap={ORDER_STATUS_STYLES} />,
  },
  {
    key: "TimeSince",
    header: "Time Since",
    render: (val) => <span className="inter_regular_grey_13px">{String(val)}</span>,
  },
  {
    key: "Expected",
    header: "Expected",
    render: (val) => <span className="inter_medium_black_13px">{String(val)}</span>,
  },
  {
    key: "RiskStatus",
    header: "Risk Status",
    render: (val) => <Badge label={String(val)} styleMap={RISK_STATUS_STYLES} />,
  },
];

export default function PurchaseTable({
  data = PURCHASE_DATA,
}: {
  data?: PurchaseTableRow[];
}) {
  const router = useRouter();

  return (
    <DashboardTable
      columns={columns}
      rows={data}
      onRowClick={(row) => {
        router.push(`/purchase-order/${normalizeOrderId(row.Order)}`);
      }}
    />
  );
}
