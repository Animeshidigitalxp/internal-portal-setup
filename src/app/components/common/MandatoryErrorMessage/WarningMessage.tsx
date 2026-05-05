import React from 'react'
import style from './MandatoryErrorMessage.module.sass'

type WarningMessageProps = {
    message: string
}

const WarningMessage = (props: WarningMessageProps) => {
    const {message} = props
  return (
    <div className={`${style['warning-heading-container']}`}>
        
        <p className='inter_regular_black_12px'>
            {message}
        </p>
    </div>
  )
}

export default WarningMessage