'use client';

import DashboardTable, {
  StatusBadge,
  ColumnDef,
} from "../DashboardTable/DashboardTable";

export type MorningQueueRow = {
  customerName: string;
  category: string;
  qty: number;
  brand: string;
  model: string;
  estCost: string;
  confidence: string;
  dateTime: string;
  status: string;
};

const MORNING_QUEUE_DATA: MorningQueueRow[] = [
  {
    customerName: "Acme Corp",
    category: "Engineering",
    qty: 12,
    brand: "Dell",
    model: "XPS 15 - i7, 32GB",
    estCost: "$18,480",
    confidence: "95%",
    dateTime: "22-Apr-2026 09:30",
    status: "New",
  },
  {
    customerName: "TechStart Inc",
    category: "Standard",
    qty: 25,
    brand: "HP",
    model: "ProBook 450 - i5, 16GB",
    estCost: "$21,250",
    confidence: "88%",
    dateTime: "22-Apr-2026 08:15",
    status: "Pending",
  },
  {
    customerName: "Global Systems",
    category: "Engineering",
    qty: 8,
    brand: "Lenovo",
    model: "ThinkPad P1 - i9, 64GB",
    estCost: "$19,920",
    confidence: "92%",
    dateTime: "22-Apr-2026 07:45",
    status: "New",
  },
  {
    customerName: "DataFlow Ltd",
    category: "Standard",
    qty: 15,
    brand: "Dell",
    model: "Latitude 5420 - i5, 16GB",
    estCost: "$13,485",
    confidence: "97%",
    dateTime: "22-Apr-2026 06:20",
    status: "Approved",
  },
  {
    customerName: "CloudNine Co",
    category: "Engineering",
    qty: 20,
    brand: "Apple",
    model: 'MacBook Pro 16" - M3 Pro, 36GB',
    estCost: "$49,980",
    confidence: "91%",
    dateTime: "22-Apr-2026 16:30",
    status: "Pending",
  },
  {
    customerName: "Innovate Labs",
    category: "Standard",
    qty: 10,
    brand: "HP",
    model: "EliteBook 840 - i5, 16GB",
    estCost: "$11,490",
    confidence: "89%",
    dateTime: "22-Apr-2026 15:10",
    status: "New",
  },
];

const columns: ColumnDef<MorningQueueRow>[] = [
  { key: "customerName", header: "Customer Name" },
  {
    key: "category",
    header: "Category",
    render: (val) => (
      <span className='inter_regular_grey_13px'>{String(val)}</span>
    ),
  },
  { key: "qty", header: "Qty" },
  { key: "brand", header: "Brand" },
  { key: "model", header: "Model (AI)" },
  {
    key: "estCost",
    header: "Est. Cost",
    render: (val) => <span className='inter_medium_black_13px'>{String(val)}</span>,
  },
  { key: "confidence", header: "Confidence" , render: (val) => (
      <span className='inter_regular_grey_13px'>{String(val)}</span>
    ),},
  { key: "dateTime", header: "Date / Time" , render: (val) => (
      <span className='inter_regular_grey_13px'>{String(val)}</span>
    ),},
  {
    key: "status",
    header: "Status",
    render: (val) => <StatusBadge status={String(val)} />,
  },
];

export default function MorningQueue({
  data = MORNING_QUEUE_DATA,
}: {
  data?: MorningQueueRow[];
}) {
  return (
    <DashboardTable
      title="Morning Queue"
      subtitle="Pending orders requiring review"
      columns={columns}
      rows={data}
    />
  );
}
