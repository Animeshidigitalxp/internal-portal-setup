"use client"
import React, { useState } from 'react'
import styles from './DynamicTable.module.sass'
import OutsideClickHandler from 'react-outside-click-handler';
import { MdOutlineInfo } from 'react-icons/md';
type DynamicTableProps = {
    columnHeading: any[];
    children: React.ReactNode;
    fromDetail?: boolean
    showInfoColumn?: boolean
    showInfoHeading?: string
    showInfoSubHeading?: string,
    widthAuto?: boolean
}

const DynamicTable = (props: DynamicTableProps) => {
    const {widthAuto,showInfoColumn, showInfoHeading, showInfoSubHeading, children, columnHeading, fromDetail } = props
    const [showTooltip, setShowTooltip] = useState(false)
    return (
        <table className={`${styles["section__table"]} table ${widthAuto ? styles['tableWidthAuto'] : ''} `}>
            <thead className={`${styles["section__table-header"]} ${fromDetail ? 'inter_regular_gray_14px' : ''} inter_regular_gray_14px `}
            >
                <tr>
                    {
                        showInfoColumn &&
                    
                    <th>
                        <div className="position-relative d-flex">
                            {showInfoHeading}
                            <OutsideClickHandler onOutsideClick={() => setShowTooltip(false)}>
                            <MdOutlineInfo size={15} color='#8F9595' className={`${styles['info-icon']}`}
                                onClick={(e) => {
                                    e.stopPropagation(); // prevent bubbling if needed
                                    setShowTooltip((prev) => !prev);
                                }}
                            />
                            {
                                showTooltip &&
                                
                                    <div className={styles['tooltip2']}>

                                        <div className='d-flex p-3'>
                                            <p className='inter_regular_gray_11px mr-2 text-wrap'>
                                            {showInfoSubHeading}    
                                            </p>
                                            <button
                                                className={styles['closeButton']}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setShowTooltip(false);
                                                }}
                                            >
                                                ×
                                            </button>
                                        </div>
                                        <div className={styles['tooltipArrow']}></div>

                                    </div>
                                
                            }
                            </OutsideClickHandler>
                        </div>
                    </th>
                }
                    {
                        columnHeading?.map((data: any, index: number) => (
                            <th key={`${data}-${index}`}>{data}</th>
                        ))
                    }
                </tr>
            </thead>
            {children}
        </table>
    )
}

export default DynamicTable