import React from 'react'
import styles from './DyamicTableInput.module.sass'
type LabelAndInputProps = {

    value?: string | number
    disabled?: boolean
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    placeholder?: string
    dataTest?: string
    rows?: number
}

const DyamicTableTextArea = (props: LabelAndInputProps) => {
    const {dataTest,placeholder, value, disabled, onChange,rows= 1 } = props

    return (
        <div>
            <textarea
                className={`form-control ${styles['table-input']} ${styles['table-input-textarea']}`}
                placeholder={placeholder}
                data-test={dataTest}
                value={value ?? ''}
                disabled={disabled}
                onChange={onChange}
                rows={rows}
            />
        </div>
    )
}

export default DyamicTableTextArea