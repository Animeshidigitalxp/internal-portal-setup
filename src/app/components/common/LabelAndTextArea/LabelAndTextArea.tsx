import React from 'react'
import style from '../LabelAndInput/LabelAndInput.module.sass'

type LabelAndInputProps = {
  label: string
  placeholder: string
  value?: string | number
  disabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  hideLabel?: boolean
  dataTest?: string
  mandatory?: boolean
  mandatoryError?: boolean
}

const LabelAndTextArea = (props:LabelAndInputProps) => {
    const {dataTest, label, placeholder, value, disabled, onChange, hideLabel,mandatory, mandatoryError } = props
    return (
      <div>
          {!hideLabel && <label className='inter_regular_gray_14px'>{label}{mandatory && <span className={`${style['mandatory-star']}`}>*</span>}</label>}
          <textarea
              
              className={`form-control inter_regular_shark_14px ${style['label-and-input']} ${style['label-and-text']} ${style['textarea-padding']} ${mandatoryError ? style['mandatoryError-border'] : ''}`}
              placeholder={placeholder}
              value={value ?? ''}
              disabled={disabled}
              onChange={onChange}
              data-test={dataTest}
              
          />
  
      </div>
    )
}

export default LabelAndTextArea