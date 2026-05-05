"use client";

import DataTable, { Column, ScoreChip, StatusBadge } from "../DataTable/DataTable";

// import DataTable, { Column, StatusBadge, ScoreChip } from "./DataTable";

interface Session extends Record<string, unknown> {
  name: string;
  startTime: string;
  duration: string;
  status: string;
  page: string;
  score: number;
}

type SessionRow = Record<string, unknown>;

const columns: Column<SessionRow>[] = [
  { key: "name",      header: "Name" },
  { key: "startTime", header: "Start Time" },
  { key: "duration",  header: "Duration" },
  {
    key: "status",
    header: "Status",
    render: (val:any) => <StatusBadge status={String(val)} />,
  },
  { key: "page", header: "Page" },
  {
    key: "score",
    header: "Score",
    align: "center",
    render: (val:any) => <ScoreChip score={Number(val)} />,
  },
];

const rows: Session[] = [
  { name: "Sarah Martinez",  startTime: "2026-04-03 14:30", duration: "12m 35s", status: "Active", page: "Boat Finder", score: 5 },
  { name: "–",               startTime: "2026-04-03 14:30", duration: "12m 35s", status: "Active", page: "Financing",   score: 4 },
  { name: "Jennifer Wilson", startTime: "2026-04-03 14:30", duration: "12m 35s", status: "Idle",   page: "Inventory",   score: 3 },
  { name: "–",               startTime: "2026-04-03 14:30", duration: "12m 35s", status: "Active", page: "Contact",     score: 4 },
  { name: "–",               startTime: "2026-04-03 14:30", duration: "12m 35s", status: "Active", page: "Boat Finder", score: 5 },
  { name: "Robert Taylor",   startTime: "2026-04-03 14:30", duration: "12m 35s", status: "Idle",   page: "About",       score: 2 },
   { name: "Sarah Martinez",  startTime: "2026-04-03 14:30", duration: "12m 35s", status: "Active", page: "Boat Finder", score: 5 },
  { name: "–",               startTime: "2026-04-03 14:30", duration: "12m 35s", status: "Active", page: "Financing",   score: 4 },
  { name: "Jennifer Wilson", startTime: "2026-04-03 14:30", duration: "12m 35s", status: "Idle",   page: "Inventory",   score: 3 },
  { name: "–",               startTime: "2026-04-03 14:30", duration: "12m 35s", status: "Active", page: "Contact",     score: 4 },
  { name: "–",               startTime: "2026-04-03 14:30", duration: "12m 35s", status: "Active", page: "Boat Finder", score: 5 },
  { name: "Robert Taylor",   startTime: "2026-04-03 14:30", duration: "12m 35s", status: "Idle",   page: "About",       score: 2 },
];

export default function SessionsTable() {
  return (
    <DataTable
      columns={columns}
      rows={rows}
      viewAllHref="/sessions"
      heading="Recent Live Conversations"
    />
  );
}