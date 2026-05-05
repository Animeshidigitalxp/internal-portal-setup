"use client"
import MessageList from "./MessageList"

type ChatPanelProps  = {
    messages: any
}
const ChatPanel = (props: ChatPanelProps) => {
    const {messages} = props
  return (
    <div style={{ flex: 1, overflowY: 'auto',}}>
        <MessageList
          messages={messages}
          
          
        />
      </div>
  )
}

export default ChatPanel