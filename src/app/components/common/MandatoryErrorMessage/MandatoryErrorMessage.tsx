import React from 'react'
import { BiError } from "react-icons/bi";
import style from './MandatoryErrorMessage.module.sass'

const MandatoryErrorMessage = () => {
  return (
    <div className={`${style['error-heading-container']}`}>
        <BiError color='#D71A23' size={18} />
        <p className='inter_regular_red_16px'>To continue, please enter all required information</p>
    </div>
  )
}

export default MandatoryErrorMessage