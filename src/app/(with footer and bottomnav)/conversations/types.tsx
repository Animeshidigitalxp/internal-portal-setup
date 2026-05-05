export type ChatRecord = {
  user: string;
  startTime: string;   // you can switch to Date if you parse it
  duration: string;    // or create a structured type if needed
  buyerScore: `${number}/${number}`; // ensures format like "5/5"
  persona: "Analytical" | "Decisive" | "Cautious" | "Emotional";
  status: "Active" | "Completed";
  lastMessage: string;
};