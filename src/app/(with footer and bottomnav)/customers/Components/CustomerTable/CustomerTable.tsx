'use client';

import DashboardTable, { ColumnDef } from "../../../dashboard/Components/DashboardTable/DashboardTable";

export type CustomerTableRow = {
  CustomerName: string;
  Industry: string;
  PreferredBrands: string[];
  BudgetRange: string;
  DefaultCategory: string;
  LastUpdated: string;
  Status: "Active" | "Inactive";
};

const CUSTOMER_DATA: CustomerTableRow[] = [
  {
    CustomerName: "Acme Corp",
    Industry: "Software Development",
    PreferredBrands: ["Dell", "HP"],
    BudgetRange: "$1,200 - $2,000",
    DefaultCategory: "Engineering",
    LastUpdated: "20-Apr-2026",
    Status: "Active",
  },
  {
    CustomerName: "TechStart Inc",
    Industry: "Fintech",
    PreferredBrands: ["HP", "Lenovo"],
    BudgetRange: "$800 - $1,200",
    DefaultCategory: "Standard",
    LastUpdated: "18-Apr-2026",
    Status: "Active",
  },
  {
    CustomerName: "Global Systems",
    Industry: "Data Analytics",
    PreferredBrands: ["Lenovo", "Dell"],
    BudgetRange: "$1,800 - $2,500",
    DefaultCategory: "Engineering",
    LastUpdated: "15-Apr-2026",
    Status: "Active",
  },
  {
    CustomerName: "DataFlow Ltd",
    Industry: "Healthcare",
    PreferredBrands: ["Dell"],
    BudgetRange: "$900 - $1,400",
    DefaultCategory: "Standard",
    LastUpdated: "10-Apr-2026",
    Status: "Inactive",
  },
  {
    CustomerName: "CloudNine Co",
    Industry: "Consulting",
    PreferredBrands: ["Apple"],
    BudgetRange: "$2,500 - $3,500",
    DefaultCategory: "Executive",
    LastUpdated: "22-Mar-2026",
    Status: "Active",
  },
];

// ── Brand tags ────────────────────────────────────────────────

function BrandTags({ brands }: { brands: string[] }) {
  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
      {brands.map((brand) => (
        <span
          key={brand}
          style={{
            color: "#5AC3F0",
            background: "#5AC3F01A",
            padding: "7px",
            borderRadius: 4,
            fontSize: 12.5,
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          {brand}
        </span>
      ))}
    </div>
  );
}

// ── Status badge ──────────────────────────────────────────────

function StatusBadge({ status }: { status: "Active" | "Inactive" }) {
  const isActive = status === "Active";
  return (
    <span
      style={{
        display: "inline-block",
        padding: "7px",
        borderRadius: 4,
        fontSize: 12.5,
        fontWeight: 500,
        color: isActive ? "#31BA9C" : "#00000080",
        background: isActive ? "#31BA9C1A" : "#EBEAEA80",
        whiteSpace: "nowrap",
      }}
    >
      {status}
    </span>
  );
}

// ── Columns ───────────────────────────────────────────────────

const columns: ColumnDef<CustomerTableRow>[] = [
  { key: "CustomerName", header: "Customer Name" },
  {
    key: "Industry",
    header: "Industry",
    render: (val) => <span className="inter_regular_grey_13px">{String(val)}</span>,
  },
  {
    key: "PreferredBrands",
    header: "Preferred Brands",
    render: (_val, row) => <BrandTags brands={row.PreferredBrands} />,
  },
  {
    key: "BudgetRange",
    header: "Budget Range",
    render: (val) => <span className="inter_medium_black_13px">{String(val)}</span>,
  },
  {
    key: "DefaultCategory",
    header: "Default Category",
    render: (val) => <span className="inter_regular_grey_13px">{String(val)}</span>,
  },
  {
    key: "LastUpdated",
    header: "Last Updated",
    render: (val) => <span className="inter_regular_grey_13px">{String(val)}</span>,
  },
  {
    key: "Status",
    header: "Status",
    render: (_val, row) => <StatusBadge status={row.Status} />,
  },
];

export default function CustomerTable({
  data = CUSTOMER_DATA,
}: {
  data?: CustomerTableRow[];
}) {
  return <DashboardTable columns={columns} rows={data} />;
}
