import React from 'react'
import styles from './DyamicTableInput.module.sass'
import dayjs from 'dayjs'
type LabelAndInputProps = {

  type: string
  value?: string | number
  disabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  dataTest?: string
  min?: string
  allowSigns?: boolean

}

const DyamicTableInput = (props: LabelAndInputProps) => {
  const { min, dataTest, placeholder, type, value, disabled, onChange,allowSigns } = props
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
        onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
          if (!allowSigns && (e.key === '-' || e.key === '+')) {
            e.preventDefault();
          }
        },

      }
      : {};
  return (
    <div>
      {
        type === 'date' ?
          <div className='position-relative'>
            <div
              className={`${inputClassName} ${styles['custom-date-input-label']}`}>
              {value && value !== '' ? dayjs(value).format('DD-MMM-YYYY') : 'DD-MMM-YYYY'}
            </div>
            <input
              type={type}
              //data-test={dataTest}
              className={`form-control  ${styles['table-input']} ${styles['label-date-input']}`}
              data-test={dataTest}
              value={value ?? ''}
              disabled={disabled}
              onChange={onChange}
              min={min}



            />
          </div>
          :
          <input
            type={type}
            className={`form-control  ${styles['table-input']}`}
            placeholder={placeholder}
            data-test={dataTest}
            //value={''}
            value={value ?? ''}
            disabled={disabled}
            onChange={onChange}
            {...numberInputProps}

          />
      }
    </div>
  )
}

export default DyamicTableInput