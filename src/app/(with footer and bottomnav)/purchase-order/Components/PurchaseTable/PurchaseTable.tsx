'use client';

import DashboardTable, { ColumnDef } from "../../../dashboard/Components/DashboardTable/DashboardTable";

export type PurchaseTableRow = {
  Order: string;
  Customer: string;
  DeviceName: string;
  DeviceSpecs: string;
  Qty: number;
  OrderStatus: string;
  TimeSince: string;
  Expected: string;
  RiskStatus: string;
};

const PURCHASE_DATA: PurchaseTableRow[] = [
  {
    Order: "PO - 1047",
    Customer: "Acme Corp",
    DeviceName: "Dell XPS 15",
    DeviceSpecs: "i7-13700H / 32GB / 1TB",
    Qty: 12,
    OrderStatus: "Shipped",
    TimeSince: "8h ago",
    Expected: "06-May-2026",
    RiskStatus: "On Track",
  },
  {
    Order: "PO - 1051",
    Customer: "TechStart Inc",
    DeviceName: "HP ProBook 450",
    DeviceSpecs: "i5-1335U / 16GB / 512GB",
    Qty: 5,
    OrderStatus: "Processing",
    TimeSince: "1d 2h ago",
    Expected: "09-May-2026",
    RiskStatus: "At Risk 24h+",
  },
  {
    Order: "PO - 1048",
    Customer: "Global Systems",
    DeviceName: "Lenovo ThinkPad P1",
    DeviceSpecs: "i9-13900H / 64GB / 2TB",
    Qty: 25,
    OrderStatus: "Processing",
    TimeSince: "1d 4h ago",
    Expected: "08-May-2026",
    RiskStatus: "Delayed 48h+",
  },
  {
    Order: "PO - 1054",
    Customer: "DataFlow Ltd",
    DeviceName: "HP EliteBook 840",
    DeviceSpecs: "i5-1335U / 16GB / 512GB",
    Qty: 18,
    OrderStatus: "Placed",
    TimeSince: "1d 6h ago",
    Expected: "07-May-2026",
    RiskStatus: "On Track",
  },
  {
    Order: "PO - 1049",
    Customer: "CloudNine Co",
    DeviceName: 'MacBook Pro 14"',
    DeviceSpecs: "M3 Pro / 18GB / 512GB",
    Qty: 8,
    OrderStatus: "Delivered",
    TimeSince: "10d ago",
    Expected: "24-Apr-2026",
    RiskStatus: "Delivered",
  },
];

// ── Badge config ──────────────────────────────────────────────

type BadgeStyle = { color: string; background: string; border?: string };

const ORDER_STATUS_STYLES: Record<string, BadgeStyle> = {
  shipped:    { color: "#00000080", background: "#EBEAEA80", border: "1px solid #e5e7eb" },
  processing: { color: "#F6BB06", background: "#F6BB061A" },
  placed:     { color: "#5AC3F0", background: "#5AC3F01A" },
  delivered:  { color: "#31BA9C", background: "#31BA9C1A" },
};

const RISK_STATUS_STYLES: Record<string, BadgeStyle> = {
  "on track":      { color: "#31BA9C", background: "#31BA9C1A",  },
  "at risk 24h+":  { color: "#F6BB06", background: "#F6BB061A", },
  "delayed 48h+":  { color: "#DC2626", background: "#DC26261A" },
  "delivered":     { color: "#00000080", background: "#EBEAEA80", },
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
  return <DashboardTable columns={columns} rows={data} />;
}
