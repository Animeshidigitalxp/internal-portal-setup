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

export type TimelineStep = {
  label: string;
  subLabel: string;
  date?: string;
  status: 'done' | 'active' | 'error' | 'pending';
};

export type ActivityItem = {
  title: string;
  description: string;
  time: string;
  color: 'teal' | 'yellow' | 'red' | 'blue';
};

export type PurchaseOrderDetail = PurchaseTableRow & {
  UnitPrice: number;
  Margin: number;
  SKU: string;
  Model: string;
  HaloSO: string;
  Vendor: string;
  PlacedDate: string;
  Timeline: TimelineStep[];
  Activity: ActivityItem[];
  AlertMessage?: string;
  AlertSubText?: string;
  AlertType?: 'warning' | 'error';
};

export const PURCHASE_DATA: PurchaseTableRow[] = [
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
    TimeSince: "2d 6h ago",
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

const PURCHASE_DETAILS: Record<string, PurchaseOrderDetail> = {
  "PO-1047": {
    Order: "PO - 1047",
    Customer: "Acme Corp",
    DeviceName: "Dell XPS 15",
    DeviceSpecs: "i7-13700H / 32GB / 1TB",
    Qty: 12,
    OrderStatus: "Shipped",
    TimeSince: "8h ago",
    Expected: "06-May-2026",
    RiskStatus: "On Track",
    UnitPrice: 1540,
    Margin: 18,
    SKU: "DEL-XPS15-i7-32GB",
    Model: "XPS 15 9530",
    HaloSO: "1047",
    Vendor: "TD Synnex",
    PlacedDate: "4-May-2026, 08:53 am",
    Timeline: [
      { label: "Placed", subLabel: "", date: "4-May-2026, 08:53 am", status: "done" },
      { label: "Processing", subLabel: "In vendor queue", status: "done" },
      { label: "Shipped", subLabel: "Carrier in transit", status: "active" },
      { label: "Delivered", subLabel: "Pending", status: "pending" },
    ],
    Activity: [
      { title: "Shipment dispatched", description: "Tracking: 1Z-999-AA-••••3214", time: "< 1h ago", color: "teal" },
      { title: "Vendor accepted PO", description: "TD Synnex confirmed receipt", time: "4h ago", color: "blue" },
      { title: "Purchase order created", description: "Auto-routed to TD Synnex from Halo SO #1047", time: "8h ago", color: "blue" },
    ],
  },
  "PO-1051": {
    Order: "PO - 1051",
    Customer: "TechStart Inc",
    DeviceName: "HP ProBook 450",
    DeviceSpecs: "i5-1335U / 16GB / 512GB",
    Qty: 5,
    OrderStatus: "Processing",
    TimeSince: "1d 2h ago",
    Expected: "09-May-2026",
    RiskStatus: "At Risk 24h+",
    UnitPrice: 1299,
    Margin: 18,
    SKU: "HP-PB450-i5-16GB",
    Model: "HP ProBook 450 G10",
    HaloSO: "1051",
    Vendor: "TD Synnex",
    PlacedDate: "4-May-2026, 08:53 am",
    AlertMessage: "At risk - 26 hours since placed",
    AlertSubText: "Approaching the 48h delay threshold. Consider following up with TD Synnex",
    AlertType: "warning",
    Timeline: [
      { label: "Placed", subLabel: "", date: "4-May-2026, 08:53 am", status: "done" },
      { label: "Processing", subLabel: "In vendor queue", status: "active" },
      { label: "Shipped", subLabel: "Pending", status: "pending" },
      { label: "Delivered", subLabel: "Pending", status: "pending" },
    ],
    Activity: [
      { title: "Vendor accepted PO", description: "TD Synnex confirmed receipt", time: "1d ago", color: "yellow" },
      { title: "Purchase order created", description: "Auto-routed to TD Synnex from Halo SO #1051", time: "1d 4h ago", color: "blue" },
    ],
  },
  "PO-1048": {
    Order: "PO - 1048",
    Customer: "Global Systems",
    DeviceName: "Lenovo ThinkPad P1",
    DeviceSpecs: "i9-13900H / 64GB / 2TB",
    Qty: 25,
    OrderStatus: "Processing",
    TimeSince: "2d 6h ago",
    Expected: "08-May-2026",
    RiskStatus: "Delayed 48h+",
    UnitPrice: 1999,
    Margin: 18,
    SKU: "LEN-TPP1-i9-64GB",
    Model: "ThinkPad P1 Gen 6",
    HaloSO: "1048",
    Vendor: "TD Synnex",
    PlacedDate: "4-May-2026, 08:53 am",
    AlertMessage: "Order stuck for 54 hours",
    AlertSubText: "Vendor backorder confirmed",
    AlertType: "error",
    Timeline: [
      { label: "Placed", subLabel: "stuck 54h", date: "4-May-2026, 08:53 am", status: "error" },
      { label: "Processing", subLabel: "Pending", status: "pending" },
      { label: "Shipped", subLabel: "Pending", status: "pending" },
      { label: "Delivered", subLabel: "Pending", status: "pending" },
    ],
    Activity: [
      { title: "Delay flag triggered", description: 'Stuck in "Placed" past 48h threshold', time: "just now", color: "red" },
      { title: "Purchase order created", description: "Auto-routed to TD Synnex from Halo SO #1048", time: "2d 6h ago", color: "blue" },
    ],
  },
  "PO-1054": {
    Order: "PO - 1054",
    Customer: "DataFlow Ltd",
    DeviceName: "HP EliteBook 840",
    DeviceSpecs: "i5-1335U / 16GB / 512GB",
    Qty: 18,
    OrderStatus: "Placed",
    TimeSince: "1d 6h ago",
    Expected: "07-May-2026",
    RiskStatus: "On Track",
    UnitPrice: 1350,
    Margin: 18,
    SKU: "HP-EB840-i5-16GB",
    Model: "HP EliteBook 840 G10",
    HaloSO: "1054",
    Vendor: "TD Synnex",
    PlacedDate: "3-May-2026, 08:53 am",
    Timeline: [
      { label: "Placed", subLabel: "", date: "3-May-2026, 08:53 am", status: "active" },
      { label: "Processing", subLabel: "Pending", status: "pending" },
      { label: "Shipped", subLabel: "Pending", status: "pending" },
      { label: "Delivered", subLabel: "Pending", status: "pending" },
    ],
    Activity: [
      { title: "Purchase order created", description: "Auto-routed to TD Synnex from Halo SO #1054", time: "1d 6h ago", color: "blue" },
    ],
  },
  "PO-1049": {
    Order: "PO - 1049",
    Customer: "CloudNine Co",
    DeviceName: 'MacBook Pro 14"',
    DeviceSpecs: "M3 Pro / 18GB / 512GB",
    Qty: 8,
    OrderStatus: "Delivered",
    TimeSince: "10d ago",
    Expected: "24-Apr-2026",
    RiskStatus: "Delivered",
    UnitPrice: 2499,
    Margin: 18,
    SKU: "APP-MBP14-M3P-18GB",
    Model: "MacBook Pro M3 Pro",
    HaloSO: "1049",
    Vendor: "TD Synnex",
    PlacedDate: "14-Apr-2026, 10:00 am",
    Timeline: [
      { label: "Placed", subLabel: "", date: "14-Apr-2026, 10:00 am", status: "done" },
      { label: "Processing", subLabel: "Vendor processed", status: "done" },
      { label: "Shipped", subLabel: "Carrier delivered", status: "done" },
      { label: "Delivered", subLabel: "Confirmed receipt", date: "24-Apr-2026", status: "done" },
    ],
    Activity: [
      { title: "Delivery confirmed", description: "Client confirmed receipt", time: "10d ago", color: "teal" },
      { title: "Shipment delivered", description: "Carrier confirmed delivery", time: "10d ago", color: "teal" },
      { title: "Purchase order created", description: "Auto-routed to TD Synnex from Halo SO #1049", time: "10d ago", color: "blue" },
    ],
  },
};

export function normalizeOrderId(order: string): string {
  return order.replace(/\s/g, '');
}

export function getOrderDetail(orderId: string): PurchaseOrderDetail | null {
  return PURCHASE_DETAILS[orderId] ?? null;
}
