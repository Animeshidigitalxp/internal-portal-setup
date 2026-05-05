/**
 * MessageList.tsx — Scrollable container for all chat messages
 *
 * TypeScript benefit: `messages` is typed as `ChatMessage[]` — a discriminated
 * union. The `switch (msg.type)` below is exhaustively checked by TypeScript.
 * If a new ChatMessage variant is added to types.ts but not handled here,
 * the compiler flags it. In JS this would silently render nothing.
 *
 * SMART AUTO-SCROLL:
 *   - Auto-scrolls to bottom when new messages arrive
 *   - Pauses if the visitor manually scrolled up to read earlier messages
 *   - Re-enables once they scroll back to the bottom
 */


import { MessageBubble } from './MessageBubble';


// import { AppointmentPicker } from './AppointmentPicker';

import WelcomeMessage from './WelcomeMessage';
import BoatCarousel from './BoatCarousel';
import { useRef, useState } from 'react';
import LeadFormInline from './LeadFormInline';
import BoatingProfile from './BoatingProfile';
import EventList from './EventList';
import { AppointmentPicker } from './AppointmentPicker';
// import BoatingProfile from './BoatingProfile';

interface MessageListProps {
  messages: any;


}

const MessageList = (props: MessageListProps) => {
  const { messages } = props
  // Typed refs — TypeScript knows exactly which DOM element type to expect
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState<boolean>(true);



  console.log('messages', messages)
  return (
    <div
      ref={containerRef}
      className='message-list'
      // onScroll={handleScroll}
      style={{ flex: 1, overflowY: 'auto', padding: '16px 0', display: 'flex', flexDirection: 'column' }}
    >
      {messages?.map((msg: any) => {
        /**
         * Discriminated union switch — TypeScript narrows the type in each case.
         * Inside `case 'boat_cards'`, TypeScript knows msg is BoatCardsMessage
         * and msg.boats exists. No casting needed.
         */


        switch (msg?.type) {
          case 'question':

            return <WelcomeMessage key={msg?.id} message={msg} />

          case 'appointment':

            return <AppointmentPicker key={msg?.id} msg={msg?.appointment} />


          case 'greeting':
            return <WelcomeMessage key={msg?.id} message={msg}

            />;
          case 'boat_cards':
            return <>
              {/* <BoatingProfile /> */}
              <BoatCarousel boats={msg.boats} />
            </>;

          case 'boat_show_events':
            return <EventList events={msg.events} />;

          case 'buyer_profile':
            return <BoatingProfile key={msg?.id} profile={msg.profile} />;

          case 'lead_created':
            return <LeadFormInline leadData={msg?.profile} key={msg?.id} primaryColor={'#1859CF'}
            // onSendConatactInfo={onSendConatactInfo}
            />;



          case 'text':
            if (!msg?.content?.includes('[LEAD FORM SUBMITTED]') && !msg?.content?.includes('[APPOINTMENT SUBMITTED]')) {
              return <MessageBubble key={msg?.id} message={msg} primaryColor={'#1859CF'} />
            }



          default: {
            // Exhaustive check — TypeScript will error here if a new ChatMessage
            // type is added to the union but not handled above
            const _exhaustive: any = msg;
            console.warn('[GINGER] Unhandled message type:', _exhaustive);
            return null;
          }
        }
      })}






      {/* Invisible scroll target */}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList