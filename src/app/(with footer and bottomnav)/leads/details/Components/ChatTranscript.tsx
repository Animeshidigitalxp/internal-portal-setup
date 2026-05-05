"use client"

import styles from './BuyerProfileCard/BuyerProfileCard.module.sass'
import PinkButton from "@/src/app/components/common/PinkButton/PinkButton"
import { useEffect, useState } from 'react'
import Transcript from '../../../transcript/Components/TranscriptChat/TranscriptChat'
import { useRouter } from 'next/navigation'
type ChatTranscriptProps = {
  newMessage: any
  id: number
}

const ChatTranscript = (props: ChatTranscriptProps) => {
  const { newMessage, id } = props
  const [chatMessage, setChatMessage] = useState([])
  const [showLoad,setShowLoad] = useState(false)
 
  const router = useRouter()


  useEffect(() => {
    const newMessageSliced = newMessage?.slice?.(0, 5)?.map?.((data: { role: string, type: string | null }) => {
      let stP = ''
      if (data?.role === 'ASSISTANT') {
        stP = 'question'
      } else {
        stP = 'text'
      }

      return {
        ...data,
        type: data?.type && data?.type !== "stream_end" ? data?.type : stP
      }
    })
    setChatMessage(newMessageSliced)
  }, [])


  const handleShowFullChat = () => {
    router.push(`/transcript/${id}`)
   
    setShowLoad(true)
  }


  console.log('chatMessage', chatMessage)
  return (
    <div className={`${styles.card}`}>
      <h3 className={`inter_regular_oblack_18px  pb-0 mb-4`}>Chat Transcript Preview</h3>
      <Transcript
        title="Transcript"
        messages={chatMessage || []}
        messageLength={newMessage?.length } 

      />


      <div className={` pt-3`}>
        <PinkButton
          onClick={() => handleShowFullChat()}
          label={"View Full Transcript"} widthFixed={true}
          showLoad={showLoad}/>
      </div>
    </div>
  )
}

export default ChatTranscript