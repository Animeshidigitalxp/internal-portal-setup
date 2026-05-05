'use client'
import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import styles from '../DynamicTableInput/DyamicTableInput.module.sass'
import style from '../../LabelAndDropdown/LabelAndDropdown.module.sass'
import { BsChevronDown } from 'react-icons/bs'
import { ClipLoader } from 'react-spinners'

type LabelAndInputProps = {
    defaultValue: string
    value?: string | number
    disabled?: boolean
    onChange?: (key: string, value:any ) => void
    options: any
    dataTest?: string
}

const DynamicTableDropdownObject = (props: LabelAndInputProps) => {
    const {dataTest, value, disabled, onChange, defaultValue, options } = props

    const [showDropdown, setShowDropdown] = useState(false)
    const [selectedValue, setSelectedValue] = useState(value && value !== '' ? value : defaultValue)

    const anchorRef = useRef<HTMLButtonElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setSelectedValue(value && value !== '' ? value : defaultValue)
    }, [value, defaultValue])

    const handleSelect = (key: any, value: any) => {
        //for use if (item?.Material_Name !== 'Data not available' && item?.Material_Name !== 'None') {
        //     setSelectedValue(item?.Material_Name)
        // }
        setShowDropdown(false)
        if (onChange) onChange(key, value)
    }

    const handleOutsideClick = (e: MouseEvent) => {
        if (
            !anchorRef.current?.contains(e.target as Node) &&
            !dropdownRef.current?.contains(e.target as Node)
        ) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        if (showDropdown) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [showDropdown]);

    const renderDropdown = () => {
        if (!anchorRef.current) return null
        const rect = anchorRef.current.getBoundingClientRect()
        const stylePos = {
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
            position: 'absolute' as const,
            zIndex: 9999,
            backgroundColor: '#fff',
            border: '1px solid #E3E3E3',
            borderRadius: '0.8rem',
            overflowX: 'hidden' as const,
            overflowY: 'auto' as const,
            padding: '0 0.5rem 1rem',
            maxHeight: '300px',
            pointerEvents: 'auto' as const
        }

        return ReactDOM.createPortal(
            <div style={stylePos} ref={dropdownRef} className={style['table-label-and-dropdown-otpion']}>
                {Object.entries(options).map(([key, value]: [string, any], index: number) => (
                    <p //NOSONAR
                        key={`${'item'}-${index}`}//NOSONAR
                        id={`option-${key}`}
                        role="option"//NOSONAR
                        data-test={`${dataTest}-${key}`}
                        aria-selected={key === selectedValue}
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault()
                                handleSelect(key,value )
                            }
                        }}
                        className={`cursor-pointer ${index === 0 ? 'mt-3' : ''} inter_regular_gray_14px ${style['label-item']}`}
                        onClick={() => handleSelect(key,value )}
                    >
                        {key || '-'}
                    </p>
                ))}
            </div>,
            document.body
        )
    }

    return (
        <div className='position-relative'>
           
                <div className='cursor-pointer' data-test={dataTest}>
                    <button
                        data-test={dataTest}
                        ref={anchorRef}
                        onClick={() => !disabled && setShowDropdown(!showDropdown)}
                        tabIndex={0}
                        aria-haspopup="listbox"
                        aria-expanded={showDropdown}
                        onKeyDown={(e) => {
                            if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
                                e.preventDefault()
                                setShowDropdown(!showDropdown)
                            }
                        }}
                        className={`form-control mt-0 ${styles['table-input-drop']} ${selectedValue === defaultValue ? 'inter_regular_lightgray_14px' : 'inter_regular_shark_14px'
                            } ${showDropdown ? style['label-and-dropdown-active'] : ''} ${style['label-and-dropdown']} ${disabled ? style['disabled'] : ''
                            } ${disabled ? 'inter_regular_lightgray2_14px' : ''}`}
                    >
                        <p
                            className={`${disabled ? style['disabledColor'] : ''
                                } ${selectedValue !== 'Fetching ...' ? 'text-left' : 'text-center'}`}
                        >
                            {selectedValue !== 'Fetching ...' ? (
                                selectedValue
                            ) : (
                                <ClipLoader size={25} color={'#5f5f5f'} className={style['loadermargin']} />
                            )}
                        </p>
                        {!disabled && <BsChevronDown className='ml-2' />}
                    </button>
                </div>
                {showDropdown && renderDropdown()}
            
        </div>
    )
}

export default DynamicTableDropdownObject
