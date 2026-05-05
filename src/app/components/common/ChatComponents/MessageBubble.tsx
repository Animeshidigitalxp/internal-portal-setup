/**
 * MessageBubble.tsx — Renders a single chat message
 *
 * TypeScript benefit: `message` is typed as `TextMessage` — if a caller
 * accidentally passes a BoatCardsMessage here, it's a compile error.
 * In JS this would silently render an empty/broken bubble.
 */


interface MessageBubbleProps {
  message: any;
  primaryColor: string;
}


export const MessageBubble = (props: MessageBubbleProps) => {
  const {message,primaryColor} = props
  const isUser = message?.role?.toLowerCase() === 'user';

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '8px',
    marginBottom: '12px',
    justifyContent: isUser ? 'flex-end' : 'flex-start',
    padding: '0 16px',
  };

  const bubbleStyle: React.CSSProperties = {
    maxWidth: '80%',
    padding: '10px 14px',
    borderRadius: isUser ? '12px 12px 4px 12px' : '18px 18px 18px 4px',
    background: isUser ? '#1859CF' : '#F0F0F0',
    color: isUser ? '#fff' : '#1A1A1A',
    fontSize: '14px',
    lineHeight: '1.5',
    wordBreak: 'break-word',
    fontFamily: 'inherit',
    position: 'relative',
    whiteSpace: 'pre-wrap',
  };

  const avatarStyle: React.CSSProperties = {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #0057B8, #00A3E0)',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    color: 'white',
    fontWeight: '700',
    fontFamily: 'system-ui, sans-serif',
  };

  const cursorStyle: React.CSSProperties = {
    display: 'inline-block',
    width: '2px',
    height: '14px',
    background: isUser ? '#fff' : '#555',
    marginLeft: '2px',
    verticalAlign: 'middle',
    // Blinking cursor animation — defined in styles.ts keyframes
    animation: 'gingerBlink 0.8s step-end infinite',
  };

  return (
    <div className={'widget-umessage-tile'} style={rowStyle}>
      {/* GINGER avatar — only on assistant messages */}
      {!isUser && <div style={avatarStyle}>G</div>}

      <div style={bubbleStyle}>
        {message.content}
        {/* Blinking cursor only while tokens are still streaming */}
        {message.isStreaming && <span style={cursorStyle} />}
      </div>
    </div>
  );
};
