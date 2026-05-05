import React from 'react'
import styles from './Table.module.sass'

type TableProps = {
    columnHeading: string[];
    children: React.ReactNode;
    showFullBorder?: boolean
}

const Table = (props: TableProps) => {
    const {columnHeading,children,showFullBorder } = props
  return (
    <div className='table-responsive'>
        <table className={`${styles["section__table"]} table ${showFullBorder ? `${styles['section_table_fullborder']}` : ''}`}>
        <thead className={`${styles["section__table-header"]} inter_regular_black_14px`}>
            <tr>
            {
                columnHeading?.map((data,index)=> (
                    
                        <th key={`${data}-${index}`} className={data === 'Role' ? styles['roleColumnWidth']: ''}>{data}</th>
                    
                ))
            }
            </tr>
        </thead>
        {children}
    </table>
    </div>
  )
}

export default Table