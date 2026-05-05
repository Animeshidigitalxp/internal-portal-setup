

import React, { CSSProperties } from "react";
import styles from "./TranscriptChat.module.sass";
import dayjs from "dayjs";
import MarkdownRenderer from "@/src/app/components/common/ChatComponents/MarkdownRenderer";
// import type { TranscriptProps } from "../Type";



// ── Component ──────────────────────────────────────────────────────────────

const Transcript: React.FC<any> = ({
  title = "Transcript",
  messages,
  className,
  messageLength
}) => {
  console.log('messages in transcript', messages)
  const CardHeading = (message: string) => {
    switch (message) {
      case 'buyer_profile':
        return "Your Boating Profile";
      case 'lead_created':
        return "Contact Details";
      case 'boat_cards':
        return "Boats Recommended";

      default:
        return;
    }
  };



  const renderSummaryTile = (msg: any) => {
    // Determine the type of card to render


    // Use a temporary variable to keep the logic clean
    let content = null;
    let title = CardHeading(msg.type);

    switch (true) {
      // 1. Buyer Profile / Lead Created
      case (msg.type === "buyer_profile"):
        content = (
          <ul className={styles.summaryList}>
            {Object.entries(msg.profile || {}).map(([key, value], idx) => {
              if (key === "summary" || value === "Not discussed") return null;
              const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
              return (
                <li key={idx} className={`${styles.summaryItem} inter_regular_darkgrey_14px`} >
                  <span className={styles.summaryLabel}>{label}: </span>
                  <span className={styles.summaryValue}>{String(value)}</span>
                </li>
              );
            })}
          </ul>
        );
        break;

      // 2. Boat Cards
      case (msg.type === "boat_cards"):
        content = (
          <ul className={styles.summaryList}>
            {msg.boats?.map((item: any, idx: number) => (
              <li key={idx} className={`${styles.summaryItem} inter_regular_darkgrey_14px`}>
                <span className={styles.summaryLabel}>
                  {`${item.year} ${item.brand} ${item.model} - ${item.startingPrice}`}
                </span>
              </li>
            ))}
          </ul>
        );
        break;

      // 3. Lead Form or Appointment (Shared Logic)

      case (msg.type === "lead_created"):
        title = "Contact Details";
        content = (
          <ul className={styles.summaryList}>

            <li className={`${styles.summaryItem} inter_regular_darkgrey_14px`}>
              <span className={styles.summaryLabel}>Name: {msg?.profile?.name ?? '-'} </span>

            </li>

            <li className={`${styles.summaryItem} inter_regular_darkgrey_14px`}>

              <span className={styles.summaryValue}>Email: {msg?.profile?.email ?? '-'}</span>

            </li>

            <li className={`${styles.summaryItem} inter_regular_darkgrey_14px`}>
              <span className={styles.summaryValue}>Phone: {msg?.profile?.phone ?? '-'}</span>
            </li>

          </ul>
        );
        break;

      case (msg.type === "appointment"):
        title = "Follow-up Details";
        content = (
          <ul className={styles.summaryList}>

            <li className={`${styles.summaryItem} inter_regular_darkgrey_14px`}>
              <span className={styles.summaryLabel}>Date: {msg?.appointment?.date ? dayjs(msg?.appointment?.date).format('DD-MMM-YYYY') : '-'} </span>

            </li>

            <li className={`${styles.summaryItem} inter_regular_darkgrey_14px`}>

              <span className={styles.summaryValue}>Time: {msg?.appointment?.time || '-'}</span>

            </li>

            <li className={`${styles.summaryItem} inter_regular_darkgrey_14px`}>

              <span className={styles.summaryValue}>Preferred Mode of Contact: {msg?.appointment?.appointmentType ?? '-'}</span>
            </li>

          </ul>
        );
        break;

      // 4. Boat Show Events
      case (msg.type === "boat_show_events"):
        title = "Upcoming Events";
        content = (
          <div className={styles.eventList}>
            {msg.events?.map((event: any, idx: number) => {
              const days = dayjs(event?.endDate).diff(dayjs(event?.startDate), 'day');

              const label = `(${days} ${days === 1 ? 'day' : 'days'})`;
              return (
                (
                  <div key={idx} className={`${styles.eventStru} inter_regular_darkgrey_14px `} style={{ marginBottom: '12px' }}>
                    <div className="mb-1" style={{ color: '#666' }}>
                      {event?.startDate ? dayjs(event?.startDate)?.format('MMM DD') : '-'} -
                      {event?.endDate ? dayjs(event?.endDate)?.format('DD') : '-'} {" "}
                      {label}
                    </div>
                    <div className="mb-1"><span>Event: </span><span>{event.name}</span></div>
                    <div><span>Location: </span><span>{event.location}</span></div>
                  </div>
                )
              )
            })}
          </div>
        );
        break;

      default:
        return null;
    }

    return (
      <div className={styles.summaryTile}>
        {title && <h3 className={`${styles.summaryTitle} inter_regular_darkblack_14px`}>{title}</h3>}
        {content}
        {msg?.profile?.summary && <p className={styles.summaryFooter}>{msg.profile.summary}</p>}
      </div>
    );
  };


  return (
    <div
      className={[styles.wrapper, className].filter(Boolean).join(" ")}
    >
      <div className="d-flex justify-content-between align-items-center">
        <h2 className={` ${styles.title} inter_regular_oblack_16px`}>{title}</h2>
      {messageLength && (
        <h2 className={` ${styles.title} inter_regular_darkgrey_14px`}>{messageLength} msgs</h2>
      )}
      </div>

      <ul className={styles.messageList} role="list" aria-label="Chat transcript">
        {messages?.map((msg: any) => {
          if (msg?.type !== "lead_form_request" && !msg?.content.includes('[LEAD FORM SUBMITTED]') && !msg?.content.includes('[APPOINTMENT SUBMITTED] ')) {
            return (
              (
                <li
                  key={msg?.id}
                  className={styles.message}
                  data-role={msg.role}
                >
                  {/* Header */}
                  <div className={styles.header}>
                    <span className={` ${styles.senderName} inter_medium_green_14px`}>
                      {msg?.role === "ASSISTANT" ? "Ginger AI" : "Customer"}
                    </span>
                    <span
                      className={`${styles.timestamp} inter_regular_light_grey_12px`}

                    >

                      {msg?.createdAt ? dayjs(msg.createdAt).format('DD-MMM-YYYY HH:mm') : '-'}
                    </span>
                  </div>

                  {/* Body text */}
                  <p className={` ${styles.content} inter_regular_darkgrey_14px`}>
                    {msg?.content === "buyer_profile" ||
                      msg?.content === "lead_created" ||
                      msg?.content === 'boat_show_events' ||
                      msg?.content.includes('[LEAD FORM SUBMITTED]') ||
                      msg?.content.includes('[APPOINTMENT SUBMITTED] ') ||
                      msg?.content === "boat_cards" ? "" :
                      <>
                        {msg?.content ? <MarkdownRenderer content={msg?.content} /> : ''}
                      </>
                    }
                  </p>

                  {renderSummaryTile(msg)}

                  {/* Optional quick-reply options */}
                  {msg.options && msg.options.length > 0 && (
                    <div className={`${styles.options} inter_regular_darkgrey_14px`} aria-label="Options">
                      <span className={` ${styles.optionsLabel} inter_regular_darkgrey_14px`}>
                        Options:
                      </span>
                      {msg.options.map((opt: any) => (
                        <span key={opt} className={` ${styles.optionItem} inter_regular_darkgrey_14px`}>
                          {opt}
                        </span>
                      ))}
                    </div>
                  )}
                </li>
              )
            )
          }
        })}
      </ul>
    </div>
  );
};

export default Transcript;