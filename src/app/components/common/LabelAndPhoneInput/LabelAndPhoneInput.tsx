import React from 'react'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import style from './LabelAndPhoneInput.module.sass'
type LabelAndInputProps = {
    label: string;
    placeholder: string;
    value?: string;
    countryCode: string
    onChange?: (value: any,data: any,formattedValue: any) => void
    disableDropdown: boolean
    disabled?: boolean
    mandatory?: boolean
    mandatoryError?: boolean
}
const LabelAndPhoneInput = (props: LabelAndInputProps) => {

    const { label,placeholder,value,countryCode,onChange,disableDropdown, disabled, mandatory, mandatoryError } = props
    const onMobileHandleChange = (
        value: string,
        data: any,
        event: React.ChangeEvent<HTMLInputElement>,
        formattedValue: any,
  ) => {
    
    if(onChange){
        onChange(value,data,formattedValue)
    }
  }
  

  const getEmptyPhoneValue = (countryCode: string) => {
  switch (countryCode) {
    case 'us': return '1';
    case 'gb': return '44';
    case 'ca': return '1';
    default: return '';
  }
};

    return (
        <div className={`${mandatoryError ? 'mandatory-error-border' : ''}`}>
            <label className={`${style['phone-input-label']} inter_regular_gray_14px`}>{label}{mandatory && <span className={`${style['mandatory-star']}`}>*</span>}</label>
            <PhoneInput
                country={countryCode === 'uk' ? 'gb' : countryCode}
                enableSearch={true}
                disableSearchIcon={true}
                disableCountryGuess={true} 
                placeholder={placeholder}
                value={value || getEmptyPhoneValue(countryCode)}
                countryCodeEditable={false}
                //disableDropdown={disableDropdown}
                disabled={disabled}
                //autoFormat={false}
                //onlyCountries={!disableDropdown ? ['us','gb','ca'] : [countryCode === 'uk' ? 'gb' : countryCode]}
                preferredCountries={['us','gb','ca']}
                inputClass={`form-control inter_regular_gray_14px ${style['phone-label-and-input']} ${mandatoryError ? style['mandatoryError-border'] : ''}`}
                onChange={(
                    value: string,
                    data: any,
                    event: React.ChangeEvent<HTMLInputElement>,
                    formattedValue: any,


                ) =>
                    onMobileHandleChange(
                        value,
                        data,
                        event,
                        formattedValue,
                    )
                }

            />
        </div>
    )
}

export default LabelAndPhoneInput