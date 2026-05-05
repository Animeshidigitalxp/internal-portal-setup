import React from 'react'
import style from './LabelAndInput.module.sass'
import dayjs from 'dayjs'
import { MdOutlineInfo } from 'react-icons/md'

type LabelAndInputProps = {
  label: string
  placeholder: string
  type: string
  value?: string | number
  disabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  hideLabel?: boolean
  max?: string
  min?: string
  dataTest?: string
  mandatory?: boolean
  mandatoryError?: boolean
  info?: boolean
  setShowTooltip?: any
  sharkLabel?: any
  autoComplete?: any
}

const LabelAndInput = (props: LabelAndInputProps) => {



  const { dataTest, label, placeholder, type, value, disabled, onChange, hideLabel, max, min, mandatory, mandatoryError, info, setShowTooltip, sharkLabel, autoComplete } = props

  let inputClassName = '';

  if (disabled) {
    inputClassName = 'inter_regular_lightgray2_14px';
  } else if (value && value !== '') {
    inputClassName = 'inter_regular_shark_14px';
  } else {
    inputClassName = 'inter_regular_lightgray_14px';
  }

  const numberInputProps =
    type === 'number'
      ? {
        min: 0,
        onWheel: (e: React.WheelEvent<HTMLInputElement>) => {
          e.currentTarget.blur();
        },
      }
      : {};

    const renderDateInput = () => {
      return (
        <div className='position-relative'>
            <div
              className={`${inputClassName} ${style['custom-date-input-label']}`}>
              {value && value !== '' ? dayjs(value).format('DD-MMM-YYYY') : 'DD-MMM-YYYY'}
            </div>
            <input
              type={type}
              data-test={dataTest}
              className={`form-control  ${style['label-and-input']} ${style['label-date-input']}`}
              placeholder={placeholder}
              value={value ?? ''}
              disabled={disabled}
              onChange={onChange}
              min={min}
              max={max}


            />
          </div>
      )
    }
  return (
    <div>
      {!hideLabel && <label className={`${sharkLabel ? 'arial_regular_shark_16px' : 'inter_regular_gray_14px'}`}>{label}{mandatory && <span className={`${style['mandatory-star']}`}>*</span>}</label>}
      <div className={`${info && 'd-flex'}`}>
      {

        type === 'date' ?
         renderDateInput()
          :
          <input
            autoComplete={autoComplete ?? "off"}
            type={type}
            data-test={dataTest}
            className={`form-control ${disabled ? 'inter_regular_lightgray2_14px' : 'inter_regular_shark_14px'} ${style['label-and-input']} ${label?.toLowerCase()?.includes('url') ? style['url'] : ''} ${mandatoryError ? style['mandatoryError-border'] : ''}`}
            placeholder={placeholder}
            value={value ?? ''}
            disabled={disabled}
            onChange={onChange}
            {...numberInputProps}

          />
      }

      {
        info && <MdOutlineInfo size={15} color='#8F9595' className={`${style['info-icon']}`} onClick={setShowTooltip}/>
      }
      </div>

    </div>
  )
}

export default LabelAndInput