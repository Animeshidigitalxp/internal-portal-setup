import React from 'react'
import style from '../LabelAndInput/LabelAndInput.module.sass'
import { CiSearch } from "react-icons/ci";

type LabelAndInputProps = {
  label: string
  placeholder: string
  type: string
  value?: string | number
  disabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  hideLabel?: boolean
  
  dataTest?: string
  mandatory?: boolean
  mandatoryError?: boolean
 
}
const LabelAndInputSearchIcon = (props: LabelAndInputProps) => {

    

  const { dataTest, label, placeholder, type, value, disabled, onChange, hideLabel, mandatory, mandatoryError } = props

  let inputClassName = '';

  if (disabled) {
    inputClassName = 'inter_regular_lightgray2_14px';
  } else if (value && value !== '') {
    inputClassName = 'inter_regular_shark_14px';
  } else {
    inputClassName = 'inter_regular_lightgray_14px';
  }
  return (
    <div>
      {/* {!hideLabel && <label className={`${'inter_regular_gray_14px'}`}>{label}{mandatory && <span className={`${style['mandatory-star']}`}>*</span>}</label>} */}
      <div 
      style={{display:'flex',alignItems:'center'}}
      className={`form-control mt-0 ${disabled ? 'inter_regular_lightgray2_14px' : 'inter_regular_shark_14px'} ${style['label-and-input']} ${label?.toLowerCase()?.includes('url') ? style['url'] : ''} ${mandatoryError ? style['mandatoryError-border'] : ''}`}>
      
        <CiSearch fontSize={'1.8rem'}/>
        
          <input
            type={type}
            data-test={dataTest}
            placeholder={placeholder}
            value={value ?? ''}
            disabled={disabled}
            onChange={onChange}
            className='ml-2'
            style={{width:'93%'}}

          />
      
      </div>

    </div>
  )
}

export default LabelAndInputSearchIcon