'use client';

import { ThumbsUp, ThumbsDown } from "lucide-react";
import DashboardTable, { ColumnDef } from "../../../dashboard/Components/DashboardTable/DashboardTable";

export type RecommdedTableRow = {
  DateTime: string;
  Customer: string;
  Category: string;
  AIDeviceName: string;
  AIDeviceSpecs: string;
  SelectedDeviceName: string;
  SelectedDeviceSpecs: string;
  MatchStatus: "Match" | "Modified" | "Rejected";
  Confidence: number;
  PriceDiffAmount: string | null;
  PriceDiffDirection: "up" | "down" | null;
  Feedback: "Good" | "Bad" | null;
};

const RECOMMEND_DATA: RecommdedTableRow[] = [
  {
    DateTime: "22-Apr-2026 14:30",
    Customer: "Acme Corp",
    Category: "Engineering",
    AIDeviceName: "Dell XPS 15",
    AIDeviceSpecs: "i7-13700H / 32GB / 1TB",
    SelectedDeviceName: "Dell XPS 15",
    SelectedDeviceSpecs: "i7-13700H / 32GB / 1TB",
    MatchStatus: "Match",
    Confidence: 95,
    PriceDiffAmount: null,
    PriceDiffDirection: null,
    Feedback: "Good",
  },
  {
    DateTime: "22-Apr-2026 12:15",
    Customer: "TechStart Inc",
    Category: "Standard",
    AIDeviceName: "HP ProBook 450",
    AIDeviceSpecs: "i5-1335U / 16GB / 512GB",
    SelectedDeviceName: "Dell Latitude 5430",
    SelectedDeviceSpecs: "i5-1235U / 16GB / 512GB",
    MatchStatus: "Modified",
    Confidence: 88,
    PriceDiffAmount: "$50.00",
    PriceDiffDirection: "down",
    Feedback: "Bad",
  },
  {
    DateTime: "22-Apr-2026 10:45",
    Customer: "Global Systems",
    Category: "Engineering",
    AIDeviceName: "Lenovo ThinkPad P1",
    AIDeviceSpecs: "i9-13900H / 64GB / 2TB",
    SelectedDeviceName: 'MacBook Pro 16"',
    SelectedDeviceSpecs: "M3 Max / 48GB / 1TB",
    MatchStatus: "Rejected",
    Confidence: 72,
    PriceDiffAmount: "$800.00",
    PriceDiffDirection: "up",
    Feedback: "Bad",
  },
  {
    DateTime: "22-Apr-2026 09:20",
    Customer: "DataFlow Ltd",
    Category: "Standard",
    AIDeviceName: "HP EliteBook 840",
    AIDeviceSpecs: "i5-1335U / 16GB / 512GB",
    SelectedDeviceName: "HP EliteBook 840",
    SelectedDeviceSpecs: "i5-1335U / 16GB / 512GB",
    MatchStatus: "Match",
    Confidence: 97,
    PriceDiffAmount: null,
    PriceDiffDirection: null,
    Feedback: "Good",
  },
  {
    DateTime: "22-Apr-2026 16:50",
    Customer: "CloudNine Co",
    Category: "Executive",
    AIDeviceName: 'MacBook Pro 14"',
    AIDeviceSpecs: "M3 Pro / 18GB / 512GB",
    SelectedDeviceName: 'MacBook Pro 16"',
    SelectedDeviceSpecs: "M3 Pro / 36GB / 1TB",
    MatchStatus: "Modified",
    Confidence: 91,
    PriceDiffAmount: "$1,000.00",
    PriceDiffDirection: "up",
    Feedback: null,
  },
];

// ── Helpers ───────────────────────────────────────────────────

const MATCH_STYLE: Record<string, { color: string; bg: string }> = {
  match:    { color: "#31BA9C", bg: "#31BA9C1A" },
  modified: { color: "#F6BB06", bg: "#F6BB061A" },
  rejected: { color: "#DC2626", bg: "#DC26261A" },
};

function confidenceColor(pct: number) {
  if (pct >= 90) return "#31BA9C";
  if (pct >= 80) return "#F6BB06";
  return "#DC2626";
}

function DeviceCell({ name, specs }: { name: string; specs: string }) {
  return (
    <div>
      <div className="inter_medium_black_13px">{name}</div>
      <div className="inter_regular_grey_13px" style={{ fontSize: 12, marginTop: 4 }}>{specs}</div>
    </div>
  );
}

function MatchBadge({ status }: { status: string }) {
  const s = MATCH_STYLE[status.toLowerCase()] ?? { color: "#6b7280", bg: "#f3f4f6" };
  return (
    <span style={{
      display: "inline-block", padding: "7px", borderRadius: 4,
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
      color, padding: "3px 10px",
      borderRadius: 4, fontWeight: 600, fontSize: 12.5,
    }}>
      {pct}%
    </span>
  );
}

function PriceDiff({ amount, direction }: { amount: string | null; direction: "up" | "down" | null }) {
  if (!amount || !direction) return <span className="inter_regular_grey_13px">—</span>;

  const isUp = direction === "up";
  const color = isUp ? "#31BA9C" : "#DC2626";

  const Arrow = () => isUp ? (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
      <path d="M10.083 3.208L6.188 7.104 3.896 4.812.917 7.792" stroke={color} strokeWidth="0.917" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.333 3.208h2.75v2.75" stroke={color} strokeWidth="0.917" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ) : (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
      <path d="M10.083 7.792L6.188 3.896 3.896 6.188.917 3.208" stroke={color} strokeWidth="0.917" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.333 7.792h2.75v-2.75" stroke={color} strokeWidth="0.917" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <span style={{ display: "flex", alignItems: "center", gap: 4, color, fontWeight: 500, fontSize: 12.5 }}>
      <Arrow />
      ~{amount}
    </span>
  );
}

function FeedbackCell({ feedback }: { feedback: "Good" | "Bad" | null }) {
  if (feedback === "Good") {
    return (
      <span style={{
        display: "inline-flex", alignItems: "center", gap: 5, padding: "7px",
        borderRadius: 4, fontSize: 12.5, fontWeight: 500,
        color: "#31BA9C", background: "#31BA9C1A",
      }}>
        <ThumbsUp size={12} /> Good
      </span>
    );
  }
  if (feedback === "Bad") {
    return (
      <span style={{
        display: "inline-flex", alignItems: "center", gap: 5, padding: "7px",
        borderRadius: 4, fontSize: 12.5, fontWeight: 500,
        color: "#DC2626", background: "#DC26261A",
      }}>
        <ThumbsDown size={12} /> Bad
      </span>
    );
  }
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <ThumbsUp size={14} color="#00000080" />
      <ThumbsDown size={14} color="#00000080" />
    </span>
  );
}

// ── Columns ───────────────────────────────────────────────────

const columns: ColumnDef<RecommdedTableRow>[] = [
  {
    key: "DateTime",
    header: "Date / Time",
    render: (val) => <span className="inter_regular_grey_13px">{String(val)}</span>,
  },
  { key: "Customer", header: "Customer" },
  {
    key: "Category",
    header: "Category",
    render: (val) => <span className="inter_regular_grey_13px">{String(val)}</span>,
  },
  {
    key: "AIDeviceName",
    header: "AI Recommended",
    render: (_val, row) => <DeviceCell name={row.AIDeviceName} specs={row.AIDeviceSpecs} />,
  },
  {
    key: "SelectedDeviceName",
    header: "Final Selected",
    render: (_val, row) => <DeviceCell name={row.SelectedDeviceName} specs={row.SelectedDeviceSpecs} />,
  },
  {
    key: "MatchStatus",
    header: "Match Status",
    render: (val) => <MatchBadge status={String(val)} />,
  },
  {
    key: "Confidence",
    header: "Confidence",
    render: (val) => <ConfidenceBadge pct={Number(val)} />,
  },
  {
    key: "PriceDiffAmount",
    header: "Price Diff",
    render: (_val, row) => <PriceDiff amount={row.PriceDiffAmount} direction={row.PriceDiffDirection} />,
  },
  {
    key: "Feedback",
    header: "Feedback",
    render: (_val, row) => <FeedbackCell feedback={row.Feedback} />,
  },
];

export default function RecommdedTable({
  data = RECOMMEND_DATA,
}: {
  data?: RecommdedTableRow[];
}) {
  return <DashboardTable columns={columns} rows={data} />;
}
