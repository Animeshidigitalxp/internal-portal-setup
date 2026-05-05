"use client"
import React, { useEffect, useRef, useState } from 'react'
import style from './LabelAndDropdown.module.sass'
import { BsChevronDown } from "react-icons/bs";
import OutsideClickHandler from 'react-outside-click-handler';
import { ClipLoader } from 'react-spinners';

type LabelAndDropdownProps = {
    label: string
    defaultValue: string
    options: any
    value?: string | number
    disabled?: boolean
    onChange?: (value: string, index?: number) => void
    hideLabel?: boolean
    noMargin?: boolean
    dataTest?: string
    mandatory?: boolean
    mandatoryError?: boolean
    maxHeight?: string
    marginTopzero?: boolean
}

const LabelAndDropdownKeyValue = (props: LabelAndDropdownProps) => {

    const { maxHeight, dataTest, noMargin, label, defaultValue, options, value, disabled, onChange, hideLabel, mandatory, mandatoryError, marginTopzero } = props

    const [showDropdown, setShowDropdown] = useState(false)
    const [selectedValue, setSelectedValue] = useState(value === '' || value == null || value == undefined ? defaultValue : value)
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

    const optionRefs = useRef<(HTMLParagraphElement | null)[]>([]);

    useEffect(() => {
        setSelectedValue(value === '' || value == null || value == undefined ? defaultValue : value)
    }, [value, defaultValue])

    useEffect(() => {
        // When dropdown opens, reset highlighted index to selected value
        if (showDropdown) {
            const index = options.findIndex((opt: any) => opt === selectedValue);
            setHighlightedIndex(index >= 0 ? index : 0);
        }
    }, [showDropdown, selectedValue, options]);

    useEffect(() => {
        // Scroll to highlighted option
        if (highlightedIndex >= 0 && optionRefs.current[highlightedIndex]) {
            optionRefs.current[highlightedIndex]?.scrollIntoView({ block: 'nearest' });
        }
    }, [highlightedIndex]);



    const handleSelect = (item: any, index: number) => {
        //uncomment if something is not working if(item?.Material_Name !== 'Data not available' && item?.Material_Name !== 'None'){
        //     setSelectedValue(item?.Material_Name);
        // } else {
        //     setSelectedValue(defaultValue);
        // }
        setShowDropdown(false);
        if (onChange) onChange(item, index);
        setHighlightedIndex(-1);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (disabled) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setShowDropdown(true);
                setHighlightedIndex(prev => (prev < options.length - 1 ? prev + 1 : 0));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setShowDropdown(true);
                setHighlightedIndex(prev => (prev > 0 ? prev - 1 : options.length - 1));
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                if (showDropdown && highlightedIndex >= 0) {
                    handleSelect(options[highlightedIndex], highlightedIndex);
                } else {
                    setShowDropdown(prev => !prev);
                }
                break;
            case 'Escape':
                setShowDropdown(false);
                setHighlightedIndex(-1);
                break;
        }
    };

    return (
        <div className='position-relative'>
            <OutsideClickHandler onOutsideClick={() => setShowDropdown(false)}>


                <div data-test={dataTest} className={"w-100 border-0 bg-white cursor-pointer"}

                    id="profile">
                    {!hideLabel && <label className='w-100 text-left inter_regular_gray_14px'>{label}{mandatory && <span className={`${style['mandatory-star']}`}>*</span>}</label>}
                    <button
                        type='button'
                        tabIndex={0}
                        data-test={dataTest}
                        onClick={() => !disabled && setShowDropdown(!showDropdown)}
                        aria-haspopup="listbox"
                        aria-expanded={showDropdown}
                        onKeyDown={handleKeyDown}
                        className={`form-control ${selectedValue === defaultValue ? 'inter_regular_lightgray_14px' : 'inter_regular_shark_14px'} ${showDropdown ? style['label-and-dropdown-active'] : ''} ${style['label-and-dropdown']} ${disabled ? style['disabled'] : ""} ${disabled ? 'inter_regular_lightgray2_14px' : ''} ${noMargin ? style['documentcombine-dropdown'] : ''} ${mandatoryError ? style['mandatoryError-border'] : ''} ${marginTopzero ? 'mt-0' : ''}`}>
                        <p className={` ${disabled ? style['disabledColor'] : ''} ${selectedValue !== 'Fetching ...' ? 'text-left' : 'text-center'}`}>
                            {selectedValue !== 'Fetching ...' ? selectedValue : <ClipLoader size={25} color={'#5f5f5f'} className={style['loadermargin']} />}


                        </p>
                        {!disabled && <BsChevronDown />}
                    </button>
                </div>
                {
                    showDropdown && (
                        <div className={` ${style['label-and-dropdown-otpion']}`}
                            style={maxHeight ? { maxHeight } : undefined}
                        >
                            {
                                options.map((item: any, index: number) => {
                                    const isHighlighted = index === highlightedIndex;
                                    return (
                                        (

                                            <p key={`${item?.Record_No}-${index}`}// NOSONAR
                                                id={`option-${item?.Material_Name}`}
                                                data-test={`${dataTest}-${item?.Material_Name}`}
                                                role="option" // NOSONAR
                                                aria-selected={item?.Material_Name === selectedValue}
                                                tabIndex={-1}
                                                ref={el => { optionRefs.current[index] = el; }}
                                                // onKeyDown={(e) => {
                                                //     if (e.key === 'Enter' || e.key === ' ') {
                                                //         e.preventDefault();
                                                //         handleSelect(item);
                                                //     }
                                                // }}
                                                onMouseEnter={() => setHighlightedIndex(index)}
                                                className={`${isHighlighted ? style['highlighted'] : ''} cursor-pointer ${index === 0 ? 'mt-3' : ''} inter_regular_gray_14px ${style['label-item']}`}
                                                onClick={() => handleSelect(item, index)}
                                            >
                                                {item?.Material_Name || '-'}
                                            </p>
                                        )
                                    )
                                })
                            }

                        </div>
                    )}
            </OutsideClickHandler>
        </div>
    )
}

export default LabelAndDropdownKeyValue