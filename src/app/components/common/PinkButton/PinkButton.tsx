import React from 'react'
import style from './PinkButton.module.sass'
import {ClipLoader } from 'react-spinners'
type PinkButtonProps = {
    label: string
    disabled?: boolean
    onClick?: any;
    showLoad?: boolean
    whiteButton?: boolean
    widthFixed?: boolean
    widthAuto?: boolean
    widthCustom?: any
    dashborder?: any
    widthHalf?: any
}

const PinkButton = (props:PinkButtonProps) => {
    const { label, disabled, onClick,showLoad, whiteButton, widthFixed, widthAuto, widthCustom, dashborder, widthHalf } = props
    let loaderColor = ''
    if(disabled){
      loaderColor = '#5F5F5F'
    }
    else if(whiteButton){
      loaderColor = '#1275B3'
    }else{
      loaderColor = '#fff'
    }

  return (
    <button type='button' className={`btn inter_regular_white_14px ${whiteButton ? style['white-button'] : style['pink-button']} ${dashborder ? style['dash-button'] : ''} ${label.includes('Submit for') ? style['submit-approve'] : ''} d-flex ${widthFixed ? style['fixed-width-btn'] : ''}  ${widthAuto ? 'w-auto' : ''} ${widthHalf ? style['width-half'] : ''}`} disabled={disabled} onClick={onClick} style={{width: widthCustom ?? ''}}>
      {showLoad ? <ClipLoader size={25} color={loaderColor}/> : label}
      
    </button>
  )
}

export default PinkButton