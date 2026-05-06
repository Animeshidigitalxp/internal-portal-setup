import React from "react";
import DashboardTable, { ColumnDef } from "../DashboardTable/DashboardTable";

export type PurchaseOrderRow = {
  customerName: string;
  device: string;
  quantity: number;
  status: string;
  time: string;
};

const PURCHASE_ORDERS_DATA: PurchaseOrderRow[] = [
  {
    customerName: "Innovate Labs",
    device: "Dell XPS 13",
    quantity: 10,
    status: "Delivered",
    time: "2 hours ago",
  },
  {
    customerName: "BuildRight Co",
    device: "MacBook Air M2",
    quantity: 5,
    status: "In Transit",
    time: "4 hours ago",
  },
  {
    customerName: "NextGen Tech",
    device: "Lenovo ThinkPad X1",
    quantity: 18,
    status: "Processing",
    time: "6 hours ago",
  },
  {
    customerName: "Vertex Systems",
    device: "HP EliteBook 840",
    quantity: 22,
    status: "Delivered",
    time: "8 hours ago",
  },
];

const columns: ColumnDef<PurchaseOrderRow>[] = [
  { key: "customerName", header: "Customer Name" },
  {
    key: "device",
    header: "Device",
    render: (val) => (
      <span className='inter_regular_grey_13px'>{String(val)}</span>
    ),
  },
  { key: "quantity", header: "Quantity" },
  { key: "status", header: "Status" , render: (val) => (
      <span className='inter_regular_grey_13px'>{String(val)}</span>
    ),},
  { key: "time", header: "Time" ,render: (val) => (
      <span className='inter_regular_grey_13px'>{String(val)}</span>
    ),},
];

export default function RecentPurchaseOrders({
  data = PURCHASE_ORDERS_DATA,
}: {
  data?: PurchaseOrderRow[];
}) {
  return (
    <DashboardTable
      title="Recent Purchase Orders Placed"
      columns={columns}
      rows={data}
    />
  );
}
