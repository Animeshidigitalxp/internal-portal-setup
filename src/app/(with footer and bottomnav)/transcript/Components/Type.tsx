export type SenderRole = "ai" | "customer";

// Add this to your Type.ts or where TranscriptProps is defined
export interface TranscriptMessage {
  id: string;
  sender: "ai" | "customer";
  senderName: string;
  timestamp: string | Date;
  content: string;
  options?: string[];
  // New property for the summary tile
  summaryData?: {
    title: string;
    items: { label: string; value: string }[];
    footerText?: string;
  };
}

export interface TranscriptProps {
  title?: string;
  messages: TranscriptMessage[];
  className?: string;
  dateLocale?: string;
  dateFormat?: Intl.DateTimeFormatOptions;
}

export interface TranscriptHeaderMeta {
  customer: string;
  totalMessages: number;
  startTime: string | Date;
  duration: string; // e.g. "2m 31s"
}
 
