'use client'
import React, { useEffect, useRef, useState, useLayoutEffect } from 'react'
import ReactDOM from 'react-dom'
import styles from '../DynamicTableInput/DyamicTableInput.module.sass'
import style from '../../LabelAndDropdown/LabelAndDropdown.module.sass'
import { BsChevronDown } from 'react-icons/bs'
import { ClipLoader } from 'react-spinners'

type LabelAndInputProps = {
  defaultValue: string
  value?: string | number
  disabled?: boolean
  onChange?: (value: string, usrIdx: number, e?: any) => void
  options: string[]
  label?: string
  dataTest?: string
  maxHeight?: string
  showLoad?: boolean
}

const DynamicTableDropdown = (props: LabelAndInputProps) => {
  const { showLoad, maxHeight, dataTest, value, disabled, onChange, defaultValue, options, label } = props

  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedValue, setSelectedValue] = useState<string | number>(value && value !== '' ? value : defaultValue)
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1)

  const anchorRef = useRef<HTMLButtonElement | null>(null)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const optionRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    setSelectedValue(value && value !== '' ? value : defaultValue)
  }, [value, defaultValue])

  // keep optionRefs in sync length-wise
  useEffect(() => {
    optionRefs.current = optionRefs?.current?.slice(0, options?.length)
  }, [options?.length])

  const handleSelect = (item: string, index: number, e?: any) => {
    setSelectedValue(item === 'None' ? defaultValue : item)
    setShowDropdown(false)
    onChange?.(item, index, e)
    anchorRef?.current?.focus()
  }

  // outside click closes
  useEffect(() => {
    const onOutside = (ev: MouseEvent) => {
      if (
        !anchorRef.current?.contains(ev.target as Node) &&
        !dropdownRef.current?.contains(ev.target as Node)
      ) {
        setShowDropdown(false)
      }
    }
    if (showDropdown) document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [showDropdown])

  // try to focus container after portal mount (best-effort)
  useLayoutEffect(() => {
    if (showDropdown && options.length > 0) {
      const existingIndex = options.findIndex((o) => o === String(selectedValue))
      setHighlightedIndex(existingIndex >= 0 ? existingIndex : 0)
      // focus container after paint
      rafRef.current = requestAnimationFrame(() => {
        dropdownRef?.current?.focus?.()
        const idx = existingIndex >= 0 ? existingIndex : 0
        optionRefs?.current?.[idx]?.scrollIntoView?.({ block: 'nearest' })
      })
    }
    return () => {
      if (rafRef?.current) cancelAnimationFrame(rafRef?.current)
      rafRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showDropdown, options?.length])

  // DOCUMENT key handler — this is the key fix for portal scenarios.
  useEffect(() => {
    if (!showDropdown) return

    const handler = (ev: KeyboardEvent) => {
      // ignore keys when focusing inputs / selects / textareas / contenteditable
      const tgt = ev.target as HTMLElement | null
      const isEditable =
        !tgt ? false : ['INPUT', 'TEXTAREA', 'SELECT'].includes(tgt.tagName) || tgt.isContentEditable
      if (isEditable) return

      if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
        ev.preventDefault()
        ev.stopPropagation()
        const dir = ev.key === 'ArrowDown' ? 1 : -1
        let next = highlightedIndex + dir
        if (next < 0) next = options.length - 1
        if (next >= options.length) next = 0
        setHighlightedIndex(next)
        // scroll into view
        optionRefs.current[next]?.scrollIntoView({ block: 'nearest' })
        return
      }

      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault()
        ev.stopPropagation()
        if (highlightedIndex >= 0 && highlightedIndex < options.length) {
          handleSelect(options[highlightedIndex], highlightedIndex, ev)
        }
        return
      }

      if (ev.key === 'Escape') {
        ev.preventDefault()
        ev.stopPropagation()
        setShowDropdown(false)
        anchorRef.current?.focus()
        return
      }

      if (ev.key === 'Tab') {
        // let the natural tab happen but close dropdown first
        setShowDropdown(false)
        return
      }
    }

    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [showDropdown, highlightedIndex, options, selectedValue])

  const renderDropdown = () => {
    if (!anchorRef.current) return null
    const rect = anchorRef.current.getBoundingClientRect()
    const viewportWidth = window.innerWidth

    const dropdownStyle: React.CSSProperties = {
      position: 'absolute',
      top: rect.bottom + window.scrollY,
      zIndex: 9999,
      minWidth: rect.width,
      width: 'fit-content',
      maxWidth: viewportWidth - 20,
      backgroundColor: '#fff',
      border: '1px solid #E3E3E3',
      borderRadius: '0.8rem',
      overflowX: 'hidden',
      overflowY: 'auto',
      maxHeight: maxHeight ?? '300px',
      padding: '0 0.5rem 1rem',
      pointerEvents: 'auto'
    }

    dropdownStyle.left = rect.left + window.scrollX
    if (rect.left + 500 > viewportWidth) {
      delete dropdownStyle.left
      dropdownStyle.right = window.innerWidth - rect.right + window.scrollX
    }

    return ReactDOM.createPortal(
      <div
        ref={dropdownRef}
        style={dropdownStyle}
        className={style['table-label-and-dropdown-otpion']}
        role="listbox"
        tabIndex={0} // focusable container (best-effort)
        aria-activedescendant={highlightedIndex >= 0 ? `option-${highlightedIndex}` : undefined}
      >
        {options.map((item: string, index: number) => {
          let itemStyle = ''
          if (label === 'Status') {
            if (item === 'Active') itemStyle = style['activecolor']
            else if (item === 'Deactivated') itemStyle = style['deactivated']
            else if (item === 'Draft') itemStyle = style['draft']
            else if (item === 'Entered') itemStyle = style['entered']
            else if (item === 'Approved' || item === 'Sent') itemStyle = style['approved']
            else if (item === 'Planned') itemStyle = style['planned']
            else if (item === 'Completed') itemStyle = style['Completed']
            else if (item === 'Overdue') itemStyle = style['overdue']
            else itemStyle = 'inter_regular_lightgray_14px'
          }

          const isHighlighted = index === highlightedIndex
          const isSelected = item === selectedValue

          return (
            <p
              key={`${item}-${index}`}
              id={`option-${index}`}
              ref={(el) => { optionRefs.current[index] = el; }}
              data-test={`${dataTest}-${item}`}
              role="option"
              aria-selected={isSelected}
              tabIndex={-1}
              className={`${itemStyle} cursor-pointer ${index === 0 ? 'mt-3' : ''} inter_regular_gray_14px ${style['label-item']} ${isHighlighted ? style['highlighted'] : ''}`}
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={(e) => handleSelect(item, index, e)}
            >
              {item || '-'}
            </p>
          )
        })}
      </div>,
      document.body
    )
  }

  return (
    <div className="position-relative">
      <div className="cursor-pointer" id="profile">
        <button
          type="button"
          data-test={dataTest}
          ref={anchorRef}
          onClick={() => {
            if (disabled) return
            setShowDropdown((s) => !s)
          }}
          tabIndex={0}
          aria-haspopup="listbox"
          aria-expanded={showDropdown}
          onKeyDown={(e) => {
            if (disabled) return
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setShowDropdown((s) => !s)
            }
          }}
          className={`form-control mt-0 ${styles['table-input-drop']} ${selectedValue === defaultValue ? 'inter_regular_lightgray_14px' : 'inter_regular_shark_14px'} ${showDropdown ? style['label-and-dropdown-active'] : ''} ${style['label-and-dropdown']} ${disabled ? style['disabled'] : ''} ${disabled ? 'inter_regular_lightgray2_14px' : ''}`}
        >
          <p className={`${disabled ? style['disabledColor'] : ''} text-left`}>
            {showLoad ? <ClipLoader size={25} color={'#5f5f5f'} className={style['loadermargin']} /> : selectedValue}
          </p>
          {!disabled && <BsChevronDown className="ml-2" />}
        </button>
      </div>

      {showDropdown && renderDropdown()}
    </div>
  )
}

export default DynamicTableDropdown
