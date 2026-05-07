'use client';

import DashboardTable, { ColumnDef } from "../../../dashboard/Components/DashboardTable/DashboardTable";

export type OrderTableRow = {
  Customer: string;
  Category: string;
  Qty: number;
  DeviceName: string;
  DeviceSpecs: string;
  EstPrice: string;
  Confidence: number;
  Status: "New" | "Pending" | "Approved";
  Created: string;
};

const ORDER_DATA: OrderTableRow[] = [
  {
    Customer: "Acme Corp",
    Category: "Engineering",
    Qty: 12,
    DeviceName: "Dell XPS 15",
    DeviceSpecs: "i7-13700H / 32GB / 1TB",
    EstPrice: "$18,480",
    Confidence: 95,
    Status: "New",
    Created: "22-Apr-2026 09:30",
  },
  {
    Customer: "TechStart Inc",
    Category: "Standard",
    Qty: 25,
    DeviceName: "HP ProBook 450 G10",
    DeviceSpecs: "i5-1335U / 16GB / 512GB",
    EstPrice: "$21,250",
    Confidence: 88,
    Status: "Pending",
    Created: "22-Apr-2026 08:15",
  },
  {
    Customer: "Global Systems",
    Category: "Engineering",
    Qty: 150,
    DeviceName: "Lenovo ThinkPad P1",
    DeviceSpecs: "i9-13900H / 64GB / 2TB",
    EstPrice: "$298,500",
    Confidence: 92,
    Status: "New",
    Created: "22-Apr-2026 07:45",
  },
  {
    Customer: "DataFlow Ltd",
    Category: "Standard",
    Qty: 15,
    DeviceName: "Dell Latitude 5420",
    DeviceSpecs: "i5-1145G7 / 16GB / 512GB",
    EstPrice: "$13,485",
    Confidence: 97,
    Status: "Approved",
    Created: "22-Apr-2026 06:20",
  },
  {
    Customer: "CloudNine Co",
    Category: "Executive",
    Qty: 5,
    DeviceName: 'MacBook Pro 16"',
    DeviceSpecs: "M3 Pro / 36GB / 1TB",
    EstPrice: "$14,995",
    Confidence: 91,
    Status: "Pending",
    Created: "22-Apr-2026 16:30",
  },
  {
    Customer: "Innovate Labs",
    Category: "Standard",
    Qty: 10,
    DeviceName: "HP EliteBook 840",
    DeviceSpecs: "i5-1335U / 16GB / 512GB",
    EstPrice: "$11,490",
    Confidence: 72,
    Status: "New",
    Created: "22-Apr-2026 15:10",
  },
];

// ── Helpers ───────────────────────────────────────────────────

const STATUS_STYLES: Record<string, { color: string; bg: string }> = {
  new:      { color: "#5AC3F0", bg: "#5AC3F01A" },
  pending:  { color: "#F6BB06", bg: "#F6BB061A" },
  approved: { color: "#31BA9C", bg: "#31BA9C1A" },
};

function confidenceColor(pct: number) {
  if (pct >= 90) return "#31BA9C";
  if (pct >= 80) return "#F6BB06";
  return "#DC2626";
}

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_STYLES[status.toLowerCase()] ?? { color: "#6b7280", bg: "#f3f4f6" };
  return (
    <span style={{
      display: "inline-block", padding: "3px 10px", borderRadius: 4,
      fontSize: 12.5, fontWeight: 500, color: s.color, background: s.bg, whiteSpace: "nowrap",
    }}>
      {status}
    </span>
  );
}

function ConfidenceBadge({ pct }: { pct: number }) {
  const color = confidenceColor(pct);
  return (
    <span style={{
      color, background: `${color}1a`, padding: "3px 10px",
      borderRadius: 4, fontWeight: 600, fontSize: 12.5,
    }}>
      {pct}%
    </span>
  );
}

// ── Columns ───────────────────────────────────────────────────

const columns: ColumnDef<OrderTableRow>[] = [
  { key: "Customer", header: "Customer" },
  {
    key: "Category",
    header: "Category",
    render: (val) => <span className="inter_regular_grey_13px">{String(val)}</span>,
  },
  { key: "Qty", header: "Qty" },
  {
    key: "DeviceName",
    header: "Recommended Device",
    render: (_val, row) => (
      <div>
        <div className="inter_medium_black_13px">{row.DeviceName}</div>
        <div className="inter_regular_grey_13px" style={{ fontSize: 12, marginTop: 4 }}>
          {row.DeviceSpecs}
        </div>
      </div>
    ),
  },
  {
    key: "EstPrice",
    header: "Est. Price",
    render: (val) => <span className="inter_medium_black_13px">{String(val)}</span>,
  },
  {
    key: "Confidence",
    header: "Confidence",
    render: (val) => <ConfidenceBadge pct={Number(val)} />,
  },
  {
    key: "Status",
    header: "Status",
    render: (val) => <StatusBadge status={String(val)} />,
  },
  {
    key: "Created",
    header: "Created",
    render: (val) => <span className="inter_regular_grey_13px">{String(val)}</span>,
  },
];

export default function OrderTable({
  data = ORDER_DATA,
}: {
  data?: OrderTableRow[];
}) {
  return <DashboardTable columns={columns} rows={data} />;
}
