"use client";

import DataTable, { Column, ScoreChip } from "../DataTable";

// import DataTable, { Column, ScoreChip } from "./DataTable";

interface Lead extends Record<string, unknown> {
  name: string;
  persona: string;
  budget: string;
  timeline: string;
  score: number;
  createdOn: string;
}

type LeadRow = Record<string, unknown>;

const columns: Column<LeadRow>[] = [
  { key: "name",      header: "Name" },
  { key: "persona",   header: "Persona" },
  { key: "budget",    header: "Budget" },
  { key: "timeline",  header: "Timeline" },
  {
    key: "score",
    header: "Score",
    align: "center",
    render: (val) => <ScoreChip score={Number(val)} />,
  },
  { key: "createdOn", header: "Created on" },
];

const rows: Lead[] = [
  { name: "Jessica Anderson", persona: "Decisive",   budget: "$120K", timeline: "Ready Now",  score: 5, createdOn: "2026-04-03 14:30" },
  { name: "Thomas Wright",    persona: "Analytical", budget: "$95K",  timeline: "1-3 months", score: 5, createdOn: "2026-04-03 14:30" },
  { name: "Amanda Lopez",     persona: "Emotional",  budget: "$150K", timeline: "1-3 months", score: 5, createdOn: "2026-04-03 14:30" },
  { name: "Christopher Lee",  persona: "Analytical", budget: "$80K",  timeline: "3-6 months", score: 4, createdOn: "2026-04-03 14:30" },
  { name: "Michelle Garcia",  persona: "Cautious",   budget: "$110K", timeline: "3-6 months", score: 4, createdOn: "2026-04-03 14:30" },
  { name: "Daniel Martinez",  persona: "Decisive",   budget: "$90K",  timeline: "3-6 months", score: 4, createdOn: "2026-04-03 14:30" },
];

export default function LeadsTable() {
  return (
    <DataTable
      columns={columns}
      rows={rows}
      viewAllHref="/leads"
      heading="Top Leads"
    />
  );
}