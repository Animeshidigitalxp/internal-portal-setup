"use client"
import React, { useEffect, useRef, useState } from 'react'
import style from './LabelAndDropdown.module.sass'
import { BsChevronDown } from "react-icons/bs";
import OutsideClickHandler from 'react-outside-click-handler';

type LabelAndDropdownProps = {
    label: string
    defaultValue: string
    options: any
    value?: string | number
    disabled?: boolean
    onChange?: (value: string) => void
    hideLabel?: boolean
    noMargin?: boolean
    dataTest?: string
    mandatory?: boolean
    mandatoryError?: boolean
    sharkLabel?: boolean
}

const LabelAndDropdown = (props: LabelAndDropdownProps) => {

    const { dataTest, noMargin, label, defaultValue, options, value, disabled, onChange, hideLabel, mandatory, mandatoryError, sharkLabel } = props

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



    const handleSelect = (item: string) => {
        if (item === 'None') {
            setSelectedValue(defaultValue);
        } else {
            setSelectedValue(item);
        }
        setShowDropdown(false);
        if (onChange) onChange(item);
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
                    handleSelect(options[highlightedIndex]);
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
                    {!hideLabel && <label className={`w-100 text-left ${sharkLabel ? 'arial_regular_shark_16px' : 'inter_regular_gray_14px'} `}>{label}{mandatory && <span className={`${style['mandatory-star']}`}>*</span>}</label>}
                    <button
                        type='button'
                        tabIndex={0}
                        data-test={dataTest}
                        onClick={() => !disabled && setShowDropdown(!showDropdown)}
                        aria-haspopup="listbox"
                        aria-expanded={showDropdown}
                        onKeyDown={handleKeyDown}
                        className={`form-control ${selectedValue === defaultValue ? 'inter_regular_lightgray_14px' : 'inter_regular_shark_14px'} ${showDropdown ? style['label-and-dropdown-active'] : ''} ${style['label-and-dropdown']} ${disabled ? style['disabled'] : ""} ${disabled ? 'inter_regular_lightgray2_14px' : ''} ${noMargin ? style['documentcombine-dropdown'] : ''} ${mandatoryError ? style['mandatoryError-border'] : ''}`}>
                        {(() => {
                            let textStyle = '';
                            if (label === 'Status' || 'Update the current status of this dispatch order.') {
                                if (selectedValue === 'Active') {
                                    textStyle = style['activecolor'];
                                } else if (selectedValue === 'Deactivated' || selectedValue === 'Closed') {
                                    textStyle = style['deactivated'];
                                } else if (selectedValue === 'Draft') {
                                    textStyle = style['draft'];
                                } else if (selectedValue === 'Entered') {
                                    textStyle = style['entered'];
                                } else if (selectedValue === 'Approved' || selectedValue === 'Sent') {
                                    textStyle = style['approved'];
                                } else if (selectedValue === 'Received') {
                                    textStyle = style['received'];
                                } else if (selectedValue === 'In Progress') {
                                    textStyle = style['inprogress'];
                                } else if (selectedValue === 'Completed') {
                                    textStyle = style['completed'];
                                }
                            }
                            return (
                                <p className={`${textStyle} ${disabled ? style['disabledColor'] : ''} text-left`}>
                                    {selectedValue}
                                </p>
                            );
                        })()}
                        {!disabled && <BsChevronDown />}
                    </button>
                </div>
                {
                    showDropdown && (
                        <div className={` ${style['label-and-dropdown-otpion']}`}
                        >
                            {
                                options.map((item: any, index: number) => {
                                    let itemStyle = '';
                                    const isHighlighted = index === highlightedIndex;
                                    if (label === 'Status' || label === 'Update the current status of this dispatch order.') {
                                        if (item === 'Active') {
                                            itemStyle = style['activecolor'];
                                        } else if (item === 'Deactivated' || item === 'Closed') {
                                            itemStyle = style['deactivated'];
                                        } else if (item === 'Draft') {
                                            itemStyle = style['draft'];
                                        } else if (item === 'Entered') {
                                            itemStyle = style['entered'];
                                        } else if (item === 'Approved' || item === 'Sent') {
                                            itemStyle = style['approved'];
                                        } else if (item === 'Received') {
                                            itemStyle = style['received'];
                                        } else if (item === 'In Progress' || item === 'In progress') {
                                            itemStyle = style['inprogress'];
                                        } else if (item === 'Completed') {
                                            itemStyle = style['completed'];
                                        }
                                    }
                                    return (
                                        (

                                            <p key={`${item}-${index}`}// NOSONAR
                                                id={`option-${item}`}
                                                data-test={`${dataTest}-${item}`}
                                                role="option" // NOSONAR
                                                aria-selected={item === selectedValue}
                                                tabIndex={-1}
                                                ref={el => { optionRefs.current[index] = el; }}
                                                // onKeyDown={(e) => {
                                                //     if (e.key === 'Enter' || e.key === ' ') {
                                                //         e.preventDefault();
                                                //         handleSelect(item);
                                                //     }
                                                // }}
                                                onMouseEnter={() => setHighlightedIndex(index)}
                                                className={`${itemStyle} ${isHighlighted ? style['highlighted'] : ''} cursor-pointer ${index === 0 ? 'mt-3' : ''} inter_regular_gray_14px ${style['label-item']}`}
                                                onClick={() => handleSelect(item)}
                                            >
                                                {item || '-'}
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

export default LabelAndDropdown