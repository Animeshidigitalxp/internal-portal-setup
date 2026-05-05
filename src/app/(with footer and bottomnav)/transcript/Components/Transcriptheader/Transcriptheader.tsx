"use client"

import React from "react";
import styles from "./Transcriptheader.module.sass";
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable, { FontStyle } from 'jspdf-autotable';
import dayjs from "dayjs";
interface TranscriptHeaderProps {
  customerName: string;
  totalMessages: number;
  startTime: string;
  duration: string | null;
  message: any
}

// ── Component ──────────────────────────────────────────────────────
const TranscriptHeader: React.FC<TranscriptHeaderProps> = ({
  customerName,
  totalMessages,
  startTime,
  duration,
  message
}) => {

  console.log('message', message)

  const CardHeading = (type: string) => {
    switch (type) {
      case 'buyer_profile':
        return "Your Boating Profile";
      case 'lead_created':
        return "Contact Details";
      case 'boat_cards':
        return "Boats Recommended";
      case 'boat_show_events':
        return "Upcoming Events"
      case 'appointment':
        return "Follow-up Details"

      default:
        return;
    }
  };

  const generatePDF = async (type: string) => {
    const doc = new jsPDF();

    const obStyle = {
      styles: {
        fontSize: 10, cellPadding: 2, lineWidth: 0.5,
        lineColor: [227, 227, 227] as [number, number, number],
        textColor: [32, 36, 47] as [number, number, number],
      },
      headStyles: {
        fillColor: [255, 255, 255] as [number, number, number],
        textColor: [32, 36, 47] as [number, number, number],
        fontStyle: 'bold' as FontStyle,
        lineWidth: 0.5,
        lineColor: [227, 227, 227] as [number, number, number],
      },
    }

    const sectionY = 45;
    const pageMargin = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const marginX = 10;
    const headerTop = 15;
    const addHeader = () => {



      // LEFT: Ginger AI
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(32, 36, 47);
      doc.text('Ginger AI', marginX, headerTop);

      // RIGHT: Transcript
      const rightText = 'Transcript';
      const textWidth = doc.getTextWidth(rightText);
      doc.text(rightText, pageWidth - marginX - textWidth, headerTop);

      // Divider line
      doc.setDrawColor(200);
      doc.setLineWidth(0.3);
      doc.line(marginX, headerTop + 5, pageWidth - marginX, headerTop + 5);
    };

    addHeader()

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Full Chat Transcript', marginX, headerTop + 15);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    doc.text(`Customer: ${customerName}`, marginX, headerTop + 22);
    doc.text(`Total messages: ${totalMessages}`, marginX, headerTop + 28);

    doc.text(`Start time: ${startTime}`, pageWidth / 2, headerTop + 22);
    doc.text(`Duration: ${duration}`, pageWidth / 2, headerTop + 28);

    const drawContainerSegment = (
      doc: any,
      startY: number,
      height: number,
      pageWidth: number,
      options: { isFirst: boolean; isLast: boolean }
    ) => {
      const marginX = 10;
      const width = pageWidth - marginX * 2;
      const radius = 5;

      // Base box (always rounded)
      doc.setFillColor(249, 250, 251);
      doc.setDrawColor(230);
      doc.setLineWidth(0.3);

      doc.roundedRect(marginX, startY, width, height, radius, radius, 'FD');

      // 🔧 Flatten corners when needed
      doc.setFillColor(249, 250, 251); // same background

      // 👉 NOT FIRST → remove top radius
      if (!options.isFirst) {
        doc.rect(marginX, startY, width, radius, 'F');
      }

      // 👉 NOT LAST → remove bottom radius
      if (!options.isLast) {
        doc.rect(marginX, startY + height - radius, width, radius, 'F');
      }
    };

    const drawTranscriptHeader = (doc: jsPDF, y: number, pageWidth: number) => {


      // Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(60);

      doc.text('Transcript', marginX, y);

      // Divider line (very subtle)
      doc.setDrawColor(235);
      doc.setLineWidth(0.2);
      doc.line(marginX, y + 4, pageWidth - marginX, y + 4);

      return y + 15; // next content start
    };


    const renderBoatCard = (contentWidth: number, msg: any, y: number, type: string) => {
      const boxPadding = 3;
      const lineHeight = 5;

      let contactLines = [
        CardHeading(type),
      ];

      if (type === 'boat_cards') {
        for (const item of msg?.boats) {
          contactLines.push(`${item?.year ?? '-'} ${item?.brand ?? '-'} ${item?.model ?? '-'} - ${item?.startingPrice ?? '-'}`)
        }
      } else if (type === 'buyer_profile') {
        Object.entries(msg?.profile || {}).map(([key, value], idx) => {
          if (key === "summary" || value === "Not discussed") return null;
          const label = key?.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str?.toUpperCase());
          contactLines.push(`${label}: ${String(value)}`)
        })
      } else if (type === 'lead_created') {
        contactLines.push(
          `Name: ${msg?.profile?.name ?? '-'}`,
          `Email: ${msg?.profile?.email ?? '-'}`,
          `Phone: ${msg?.profile?.phone ?? '-'}`
        )
      } else if (type === 'boat_show_events') {
        for (const event of msg?.events) {
          const days = dayjs(event?.endDate).diff(dayjs(event?.startDate), 'day');
          const label = `(${days} ${days === 1 ? 'day' : 'days'})`;

          contactLines.push(`${event?.startDate ? dayjs(event?.startDate)?.format('MMM DD') : '-'} ${event?.endDate ? dayjs(event?.endDate)?.format('DD') : '-'}${label}`,
            `${event?.name ?? '-'}`,
            `${event?.location ?? '-'}`,
            ''
          )
        }
      } else if (type === 'appointment') {
        contactLines.push(
          `Date: ${msg?.appointment?.date ? dayjs(msg?.appointment?.date).format('DD-MMM-YYYY') : '-'}`,
          `Time: ${msg?.appointment?.time || '-'}`,
          `Preferred Mode of Contact: ${msg?.appointment?.appointmentType ?? '-'}`
        )
      }

      // Calculate height
      const boxHeight = contactLines.length * lineHeight + boxPadding * 2;

      // Draw blue background
      doc.setFillColor(240, 247, 255); // soft blue
      doc.setDrawColor(240, 247, 255);
      doc.roundedRect(
        marginX,
        y - 2,
        contentWidth,
        boxHeight,
        2,
        2,
        'FD'
      );

      // Text inside box
      let textY = y + boxPadding + 2;

      contactLines.forEach((line: any, index) => {
        doc.setFont('helvetica', index === 0 ? 'bold' : 'normal');
        doc.setFontSize(10);
        if (index === 0) {
          doc.setTextColor(45, 45, 45);
        } else {
          doc.setTextColor(91, 91, 91);
        }

        doc.text(line, marginX + boxPadding, textY);
        textY += lineHeight;
      });

      return boxHeight
    }

    const getCardHeight = (msg: any, type: string) => {
      const boxPadding = 3;
      const lineHeight = 5;

      let lines = 1; // heading

      if (type === 'boat_cards') {
        lines += msg?.boats?.length ?? 0;
      } else if (type === 'buyer_profile') {
        lines += Object.entries(msg?.profile || {})
          .filter(([key, value]) => key !== "summary" && value !== "Not discussed")
          .length;
      } else if (type === 'lead_created') {
        lines += 3;
      } else if (type === 'boat_show_events') {
        lines += (msg?.events?.length ?? 0) * 4; // 4 lines per event
      } else if (type === 'appointment') {
        lines += 3;
      }

      return lines * lineHeight + boxPadding * 2 + 8; // +8 for bottom gap
    };

    const renderMessage = (doc: any, msg: any, y: any, pageWidth: any) => {

      const contentWidth = pageWidth - marginX * 2;

      const isAI = msg?.role === "ASSISTANT";
      const msgName = msg?.role === "ASSISTANT" ? "Ginger AI" : "Customer"
      // Name
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(isAI ? 18 : 45, isAI ? 117 : 45, isAI ? 179 : 45);
      doc.text(msgName, marginX, y);

      // Time
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(140);
      const nameWidth = doc.getTextWidth(msgName);
      doc.text(msg?.createdAt ? dayjs(msg.createdAt).format('DD-MMM-YYYY HH:mm') : '-', marginX + nameWidth + 6, y);

      y += 6;



      if (msg?.type === 'boat_cards' ||
        msg?.type === "buyer_profile" ||
        msg?.type === 'lead_created' ||
        msg?.type === 'boat_show_events' ||
        msg?.type === "appointment"
      ) {
        const estimatedCardHeight = getCardHeight(msg, msg?.type);
        if (y + estimatedCardHeight > pageHeight - 20) {
          doc.addPage();
          addHeader();
          y = 30;
        }
        const bxHeight = renderBoatCard(contentWidth, msg, y, msg?.type)
        return y + bxHeight + 8;
      }

      // ===============================
      // 📝 NORMAL MESSAGE
      // ===============================
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(91, 91, 91);

      const cleanMessage = msg?.content
        ?.normalize('NFKD')
        ?.replace(/[\p{Extended_Pictographic}]/gu, '');

      doc.text(cleanMessage, marginX, y, {
        maxWidth: contentWidth,
        align: 'left',
      });

      const textHeight = doc.getTextDimensions(cleanMessage, {
        maxWidth: contentWidth,
      }).h;

      return y + textHeight + 6;
    };

    let y = 42;
    let segmentStartY = y;
    let isFirstSegment = true;

    const getMessageHeight = (doc: any, msg: any, pageWidth: any) => {
      const marginX = 16;
      const contentWidth = pageWidth - marginX * 2;

      if (msg.type === 'contact') {
        const lineHeight = 5;
        const padding = 6;
        const lines = 4;
        return 6 + (lines * lineHeight) + (padding * 2) + 8 + 6; // name + box + bottom gap
      }

      const cleanMessage = msg?.content
        ?.normalize('NFKD')
        ?.replace(/[\p{Extended_Pictographic}]/gu, '');

      const textHeight = doc.getTextDimensions(cleanMessage, {
        maxWidth: contentWidth,
      }).h;

      return 6 + textHeight + 6; // name line (6) + text + bottom gap (6)
    };

    y += 10;

    // Header inside box (only onnce)
    y = drawTranscriptHeader(doc, y, pageWidth);

    message?.forEach((msg: any) => {
      if (msg?.type !== "lead_form_request" && !msg?.content.includes('[LEAD FORM SUBMITTED]') && !msg?.content.includes('[APPOINTMENT SUBMITTED] ')) {

        if (y > pageHeight - 20) {
          doc.addPage();
          addHeader();
          y = 30;
        }

        y = renderMessage(doc, msg, y, pageWidth);
      }
    });





    doc.save(`${customerName} Full transcript.pdf`)
  }

  return (
    <div className={styles.container}>
      <div className={styles.topRow}>
        <h2 className={` ${styles.title} inter_regular_oblack_20px`}>Full Chat Transcript</h2>
        <button className={styles.downloadBtn} aria-label="Download Transcript" onClick={() => generatePDF('fromPrint')}>
          <Download size={16} />
        </button>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statItem}>
          <span className={` ${styles.label} inter_regular_darkgrey_14px`}>Customer:</span>
          <span className={`${styles.value} inter_regular_darkblack_14px`}>{customerName}</span>
        </div>
        <div className={styles.statItem}>
          <span className={` ${styles.label} inter_regular_darkgrey_14px`}>Total messages:</span>
          <span className={`${styles.value} inter_regular_darkblack_14px`}>{totalMessages}</span>
        </div>
        <div className={styles.statItem}>
          <span className={` ${styles.label} inter_regular_darkgrey_14px`}>Start time:</span>
          <span className={`${styles.value} inter_regular_darkblack_14px`}>{startTime}</span>
        </div>
        <div className={styles.statItem}>
          <span className={` ${styles.label} inter_regular_darkgrey_14px`}>Duration:</span>
          <span className={`${styles.value} inter_regular_darkblack_14px`}>{duration}</span>
        </div>
      </div>
    </div>
  );
};

export default TranscriptHeader;