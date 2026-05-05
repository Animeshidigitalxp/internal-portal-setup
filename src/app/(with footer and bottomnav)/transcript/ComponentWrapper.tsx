import styles from './page.module.sass'
import Transcript from './Components/TranscriptChat/TranscriptChat'
import TranscriptHeader from './Components/Transcriptheader/Transcriptheader'
import { TranscriptMessage } from './Components/Type';
import dayjs from 'dayjs';
import { getDuration } from '@/src/helpers/helper';

interface ComponentWrapperProps {
  convoDetail: any; // Replace 'any' with the actual type if available
}

function ComponentWrapper(props: ComponentWrapperProps) {
  const { convoDetail } = props


  const message = convoDetail?.conversation?.messages?.map((data: { role: string, type: string | null }) => {
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
  

  return (
    <div className={`${styles['details-con']}`}>

      <main className=''>
        <TranscriptHeader
          customerName={convoDetail?.name ?? '-'}
          totalMessages={message?.length}
          startTime={convoDetail?.createdAt ? dayjs(convoDetail.createdAt).format('DD-MMM-YYYY HH:mm') : '-'}
          duration={convoDetail?.conversation?.endedAt ? getDuration(convoDetail?.conversation?.startedAt, convoDetail?.conversation?.endedAt) : '-'}
          message={message}
        />
      </main>

      <main className={`${styles['transcript-con']}`}>
        <Transcript
          title="Transcript"
          messages={message || []}
          
        />
      </main>
    </div>
  )
}

export default ComponentWrapper