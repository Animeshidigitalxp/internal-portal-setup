import React from 'react'
import style from './PinkButton.module.sass'
import {ClipLoader } from 'react-spinners'
import Link from 'next/link'
type PinkButtonProps = {
    label: string
    path: string
    disabled?: boolean
    onClick?: any;
    showLoad?: boolean
    whiteButton?: boolean
    widthFixed?: boolean
    widthAuto?: boolean
    widthCustom?: any
    dashborder?: any
    widthHalf?: any
    customHeight?: any
}

const PinkLinkButton = (props:PinkButtonProps) => {
    const {path, label, disabled, onClick,showLoad, whiteButton, widthFixed, widthAuto, widthCustom, dashborder, widthHalf, customHeight } = props
    let loaderColor = ''
    if(disabled){
      loaderColor = '#5F5F5F'
    }
    else if(whiteButton){
      loaderColor = '#FF73B5'
    }else{
      loaderColor = '#fff'
    }

  return (
    <Link href={path} className={`btn inter_regular_white_14px ${whiteButton ? style['white-button'] : style['pink-button']} ${dashborder ? style['dash-button'] : ''} ${label.includes('Submit for') ? style['submit-approve'] : ''} d-flex ${widthFixed ? style['fixed-width-btn'] : ''}  ${widthAuto ? 'w-auto' : ''} ${widthHalf ? style['width-half'] : ''}`} 
     onClick={onClick} style={{width: widthCustom ?? '', height: customHeight ?? ''}}>
      {showLoad ? <ClipLoader size={25} color={loaderColor}/> : label}
      
    </Link>
  )
}

export default PinkLinkButton