'use client'

import React, { useState } from 'react'
import styles from './Section.module.sass';
import PinkButton from '../PinkButton/PinkButton';
import { useRouter } from 'next/navigation';


interface SectionProps {
    heading?: string;
    showAddButton?: boolean
    path?: string
    children: React.ReactNode
    filterHeadingTab?: string
    buttonLabel?: string
    widthFixed?: boolean
    onClick?: any
    options?: any
    whiteButtonLabel?: string
    whiteButtonOnClick?: any
    whiteButtonWidthFixed?: boolean
}

const Section = (props: SectionProps) => {

    const {whiteButtonWidthFixed,whiteButtonOnClick,whiteButtonLabel,options, onClick, widthFixed, heading, children, showAddButton, path, filterHeadingTab, buttonLabel } = props
    const router = useRouter()

   

    const [showLoad, setShowLoad] = useState(false)
    const handleMaterialRedirect = () => {
        if (onClick) {
            onClick()
        } else {
            if (path) {
                setShowLoad(true)
              router.push(path)
                

            }
        }
    }

    const handleMaterialRedirect2 = () => {
        if(whiteButtonOnClick){
            whiteButtonOnClick()
        }
    }

    



    return (
        <div className={styles["section_container"]}>
            <div className={styles["section_header_container"]}>
                <div className={styles["section__header"]}>
                    <h4 className={styles['heading-text']}>{heading}</h4>
                    <div className={styles["section__actions"]}>
                        
                        {showAddButton  && 
                            <div className='d-flex'>
                                {whiteButtonLabel &&
                                <span className='mr-3'>
                                    <PinkButton 
                                    whiteButton={true}
                                    // showLoad={showLoad} 
                                    label={whiteButtonLabel ?? ''} 
                                    onClick={handleMaterialRedirect2}
                                    widthAuto={whiteButtonWidthFixed}  />
                                </span>
                                }
                                

                                <PinkButton showLoad={showLoad} label={buttonLabel ?? ''} onClick={handleMaterialRedirect} widthFixed={buttonLabel === 'Add technical recipe' || buttonLabel === 'Add material/service' || buttonLabel === 'Create purchase order' || widthFixed} />
                            </div>
                        }
                      
                    </div>
                </div>

            </div>

            <div className={styles["section_body"]}>
                {children}
            </div>
        </div>
    )
}

export default Section