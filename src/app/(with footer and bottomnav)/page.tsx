

import styles from './layout.module.sass'



import ResetFullPageLoader from '../components/FullPageLoader/ResetFullPageLoader';
import Dashboard from '../components/Dashboard/Dashboard';
import { ChatRecord } from './conversations/types';
import ComponentWrapper from './conversations/ComponentWrapper';
import Section from '../components/common/Section/Section';
import { getAllConversation } from './conversations/action';










export default async function Home() {





  // const username: string | undefined = await backendFunctionCallData("App Service")

  const [convo] = await Promise.all([getAllConversation()])

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
    // <section className={`sourcesanspro-normal-ash-16px ${styles['main-container']}`} style={{ height: '100%' }}>
    //   <ResetFullPageLoader />
    //   {/* <Dashboard /> */}
    //   <ComponentWrapper conversData={data} />
    // </section>

    <Section
      heading="Conversations">
      <ResetFullPageLoader />
      <ComponentWrapper conversData={convo} />

    </Section>
  );
}
