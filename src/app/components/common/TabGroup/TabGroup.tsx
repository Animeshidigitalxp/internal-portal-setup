"use client"
import React, { useEffect, useState } from 'react'
import styles from './TabGroup.module.sass'

type TabGroupProps = {
    tabHeading: string[]
    setFilterHeadingTab?: (tab: string) => void
    paramValue?: string | null
}

const TabGroup = (props: TabGroupProps) => {
    const {tabHeading, setFilterHeadingTab,paramValue} = props
    const [currentTabIndex, setCurrentTabIndex] = useState(0)

    useEffect(()=>{
        if(paramValue && tabHeading.indexOf(paramValue ?? '') !== -1){
            setCurrentTabIndex(tabHeading.indexOf(paramValue ?? ''))
        }
    },[tabHeading,paramValue])

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
               className={`${styles["section__tab"]} mr-4 ${currentTabIndex === index ? 'inter_semibold_shark_16px' : 'inter_regular_black_16px'} ${currentTabIndex === index ? styles['current-tab'] : ''}`}>{tab}</button>
            ))}
        </div>
    )
}

export default TabGroup