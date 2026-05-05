"use client"
import React, { useState } from 'react'
import styles from './TabGroup.module.sass'

type TabGroupProps = {
    tabHeading: string[]
    setFilterHeadingTab?: (tab: string) => void
    paramValue?: string | null
}

const InventoryTab = (props: TabGroupProps) => {
    const {tabHeading, setFilterHeadingTab,paramValue} = props
    const [currentTabIndex, setCurrentTabIndex] = useState(tabHeading.indexOf(paramValue ?? '') !== -1 ? tabHeading.indexOf(paramValue ?? '') : 0)

    function handleFilterHeading(tab: string, index: number){
        if(setFilterHeadingTab){
            setFilterHeadingTab(tab)
        }
        setCurrentTabIndex(index)
    }
    return (
        <div className={styles["section__tabs"]}>
            {tabHeading?.map((tab, index) => (
                <button data-test={tab} key={tab} onClick={() => handleFilterHeading(tab, index)} 
               className={`${styles["intsection__tab"]} mr-4 ${currentTabIndex === index ? 'inter_semibold_pink_16px' : 'inter_regular_black_16px'} `}>{tab}</button>
            ))}
        </div>
    )
}

export default InventoryTab