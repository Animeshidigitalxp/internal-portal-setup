import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import styles from '../SideBar.module.css'
type SideBarLinkProps = {
    item: any;
    isActiveCheck: boolean;
    handleItemClick: any;
    openDropdowns: any;
    isChildActive: any;
    handleDropdownItemClick: any
    dropdownCheck: boolean
}

const SideBarLink = (props: SideBarLinkProps) => {
    const { item, isActiveCheck, handleItemClick, openDropdowns, isChildActive, handleDropdownItemClick, dropdownCheck } = props
    return (
        <React.Fragment>
            <Link href={`${item.path}`}
                prefetch={item.exists}
                className={` ${styles.sidebarItem} ${isActiveCheck ? styles.active + ' inter_semibold_hotPink_14px dropdownIconContainer' : 'inter_regular_dimgray_14px'} ${dropdownCheck ? 'dropdownIconContainer' : ''}`}
                onClick={(e) => handleItemClick(item, e)}
                data-test={item.name}
            >
                <span className={`${openDropdowns[item.path] ? styles.selectedDropdown : ''} ${dropdownCheck || isActiveCheck ? styles.iconActive + ' dropdownIconActive' : ''} ${styles.iconsdiv} `}>
                    <img src={item.icon} alt={item.name} />
                </span>
                <span className={`${styles.sidebarItemName} sidebar-menu`}>{item.name}</span>
                {item.dropdownItems && (
                    <ChevronDown
                        className={`${styles.chevron} ${openDropdowns[item.path] ? styles.rotated : ''}`}
                        size={16}
                        color={item.name === 'Setup' && openDropdowns[item.path] ? "#FF5A8C" : "#888"}
                    />
                )}
            </Link>

            {item.dropdownItems && (
                <div
                    className={styles.dropdownWrapper}
                    style={{
                        height: openDropdowns[item.path] ? `${item.dropdownItems.filter((d:{show:boolean}) => d?.show).length * 26}px` : '0'
                    }}
                >
                    {item.dropdownItems.map((dropdownItem: any) => {
                        if (dropdownItem?.show) {
                            return (
                                <Link
                                    data-test={`${item.name}-${dropdownItem.name}`}
                                    prefetch={dropdownItem.exists}
                                    href={dropdownItem.path}
                                    key={dropdownItem.path}
                                    className={`${styles.dropdownItem} ${isChildActive(dropdownItem) ? styles.active : ''}`}
                                    onClick={() => handleDropdownItemClick(dropdownItem.path)}
                                >
                                    {dropdownItem.name}
                                </Link>
                            )
                        }
                    }

                    )}
                </div>
            )}


        </React.Fragment>
    )
}

export default SideBarLink