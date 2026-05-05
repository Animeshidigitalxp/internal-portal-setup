import React from 'react'
import style from './MandatoryErrorMessage.module.sass'

type WarningMessageProps = {
    message: string
}

const YellowDivMessage = (props: WarningMessageProps) => {
    const {message} = props
  return (
    <div className={`${style['yellow-heading-container']}`}>
        
        <p className='inter_regular_black_12px'>
            {message}
        </p>
    </div>
  )
}

export default YellowDivMessage