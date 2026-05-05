import React from 'react'
import styles from './DynamicTableAddButton.module.sass'
type DynamicTableProps = {
    label: string;
    onClick? : () => void
}

const DynamicTableAddButton = (props: DynamicTableProps) => {
    const {onClick,label} = props
  return (
    <button type='button' onClick={()=>onClick && onClick()} className={`btn inter_regular_black_20px mt-3 ${styles['table-add-button']}`}>
{label}
</button>
  )
}

export default DynamicTableAddButton