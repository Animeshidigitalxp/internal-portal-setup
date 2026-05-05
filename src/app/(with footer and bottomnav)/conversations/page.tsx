

import Section from '../../components/common/Section/Section'
import ResetFullPageLoader from '../../components/FullPageLoader/ResetFullPageLoader'
import ComponentWrapper from './ComponentWrapper'
import { ChatRecord } from './types';

function page() {
  const data: ChatRecord[] = [
  {
    user: "Michael Thompson",
    startTime: "04-Apr-2026 14:30",
    duration: "12m 55s",
    buyerScore: "5/5",
    persona: "Analytical",
    status: "Active",
    lastMessage: "Thanks! Can you send me more details?"
  },
  {
    user: "Sarah Martinez",
    startTime: "04-Apr-2026 13:15",
    duration: "8m 20s",
    buyerScore: "3/5",
    persona: "Decisive",
    status: "Active",
    lastMessage: "Let me think about it..."
  },
  {
    user: "David Chen",
    startTime: "04-Apr-2026 11:45",
    duration: "15m 10s",
    buyerScore: "4/5",
    persona: "Cautious",
    status: "Completed",
    lastMessage: "Yes, please have someone call me."
  },
  {
    user: "-",
    startTime: "04-Apr-2026 10:20",
    duration: "6m 45s",
    buyerScore: "2/5",
    persona: "Emotional",
    status: "Active",
    lastMessage: "Just browsing for now."
  }
];
  return (
      <Section 
        heading="Conversations">
          <ResetFullPageLoader />
          <ComponentWrapper conversData={data}/>
          
      </Section>
  )
}

export default page