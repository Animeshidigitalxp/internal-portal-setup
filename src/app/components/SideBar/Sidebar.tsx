"use client"
import React, { useState } from 'react';

import dashboard from './svg/dashboard.svg';
import orderqueue from './svg/orderqueue.svg';
import purchaseorder from './svg/purchaseorder.svg';
import recommendation from './svg/recommendation.svg';
import customer from './svg/customer.svg'

import homeSvg from './svg/home.svg'
import conversation from './svg/conversation.svg'
import lead from './svg/lead.svg'
import inventory from './svg/inventory.svg'
import document from './svg/document.svg'
import event from './svg/event.svg'
import settings from './svg/settings.svg'
import styles from './SideBar.module.css';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import SideBarLink from './SideBarLink/SideBarLink';
import { useAppDispatch } from '@/src/lib/hooks';
import { setFullPageLoader } from '../FullPageLoader/reducer/fullPageLoaderSlice';

interface DropdownItem {
  name: string;
  path: string;
  ogpath: string;
  exists: boolean;
  show?: boolean;
}

interface SidebarItem {
  name: string;
  path: string;
  icon: string;
  dropdownItems?: DropdownItem[];
  ogpath: string;
  exists: boolean;
}

const sidebarItems: SidebarItem[] = [
  {
    name: 'Dashboard',
    path: `/`,
    icon: dashboard.src,
    ogpath: '/',
    exists: true,
  },
  {
    name: 'Order / Queue',
    path: `/order-queue`,
    icon: orderqueue.src,
    ogpath: '/order-queue',
    exists: true,
  },
  {
    name: 'Purchase Order',
    path: `/purchase-order`,
    icon: purchaseorder.src,
    ogpath: '/purchase-order',
    exists: true,
  },
  {
    name: 'Recommendations',
    path: `/recommendations`,
    icon: recommendation.src,
    ogpath: '/recommendations',
    exists: true,
  },
  {
    name: 'Customers',
    path: `/customers`,
    icon: customer.src,
    ogpath: '/customers',
    exists: true,
  },
];

type SidebarProps = {
  permissions: any
}

const Sidebar: React.FC<SidebarProps> = ({ permissions }) => {

  const closeSidebar = () => {
    const checkbox = document?.getElementById?.("sidebarToggle");
    if (checkbox) checkbox.checked = true;
  };

  const navigate = useRouter();
  const dispatchRedux = useAppDispatch()

  let location: any = usePathname();

  console.log('location:', location)

  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});

  const handleItemClick = (item: SidebarItem, event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (item.dropdownItems) {
      event.preventDefault();
    } else {
      closeSidebar();
      dispatchRedux(setFullPageLoader(true))
    }
  };

  const handleDropdownItemClick = (path: string) => {
    navigate.push(`${path}`);
    dispatchRedux(setFullPageLoader(true))
  };

  const isChildActive = (dropdownItem: DropdownItem) => {
    const pathParts = dropdownItem.path.split(`/`);
    const pathSegmentToCheck = pathParts[pathParts.length - 1];
    return location.trim().includes(pathSegmentToCheck) && location.includes(dropdownItem.ogpath);
  };

  const hideSection = false;
  return (
    <div className={`sidebarEat ${styles.sidebar}`}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ flex: '1 1 auto', overflowY: 'auto', overflowX: 'hidden', marginBottom: '12rem'}}>
          {
            <SideBarLink
              item={sidebarItems[0]}
              isActiveCheck={location === '/'}
              handleItemClick={handleItemClick}
              openDropdowns={openDropdowns}
              isChildActive={isChildActive}
              handleDropdownItemClick={handleDropdownItemClick}
              dropdownCheck={false} />
          }

          <SideBarLink
            item={sidebarItems[1]}
            isActiveCheck={sidebarItems[1].path === location}
            handleItemClick={handleItemClick}
            openDropdowns={openDropdowns}
            isChildActive={isChildActive}
            handleDropdownItemClick={handleDropdownItemClick}
            dropdownCheck={false} />

          {
            <SideBarLink
              item={sidebarItems[2]}
              isActiveCheck={sidebarItems[2].path === location}
              handleItemClick={handleItemClick}
              openDropdowns={openDropdowns}
              isChildActive={isChildActive}
              handleDropdownItemClick={handleDropdownItemClick}
              dropdownCheck={sidebarItems[2].dropdownItems?.some(child => isChildActive(child)) ?? false}
            />
          }

          <SideBarLink
            item={sidebarItems[3]}
            isActiveCheck={sidebarItems[3].path === location}
            handleItemClick={handleItemClick}
            openDropdowns={openDropdowns}
            isChildActive={isChildActive}
            handleDropdownItemClick={handleDropdownItemClick}
            dropdownCheck={false} />

          <SideBarLink
            item={sidebarItems[4]}
            isActiveCheck={sidebarItems[4].path === location}
            handleItemClick={handleItemClick}
            openDropdowns={openDropdowns}
            isChildActive={isChildActive}
            handleDropdownItemClick={handleDropdownItemClick}
            dropdownCheck={sidebarItems[4].dropdownItems?.some(child => isChildActive(child)) ?? false}
          />

          {hideSection &&
            <SideBarLink
              item={sidebarItems[5]}
              isActiveCheck={sidebarItems[5]?.path === location}
              handleItemClick={handleItemClick}
              openDropdowns={openDropdowns}
              isChildActive={isChildActive}
              handleDropdownItemClick={handleDropdownItemClick}
              dropdownCheck={sidebarItems[5]?.dropdownItems?.some(child => isChildActive(child)) ?? false}
            />
          }
        </div>
      </div>

      <div style={{ position: 'absolute', right: 0, bottom: '65px', left: 0, zIndex: 1030, background: '#fff', paddingBottom: '15px', paddingLeft: '10px', paddingRight: '8px', flex: '1 1 auto', overflowY: 'auto', overflowX: 'hidden' }}>
        {
          permissions?.['Settings'] &&
          <Link href={`/settings`}
            onClick={() => {
              dispatchRedux(setFullPageLoader(true))
            }}
            prefetch={true}
            className={
              `${styles.sidebarItem} ` +
              (`/settings` === location.trim()
                ? `${styles.active} inter_semibold_hotPink_14px dropdownIconContainer`
                : 'inter_regular_dimgray_14px') +
              (location.split('/').includes('settings')
                ? ` ${styles.active} dropdownIconContainer`
                : '')
            }
          >
            <span
              className={`${styles.iconsdiv} ${`/settings` === location.trim() || location.split('/').includes('settings')
                ? `${styles.iconActive} dropdownIconActive`
                : ''
                }`}
            >
              {/* <img src={settings.src} alt="Settings" /> */}
            </span>
            <span className={`${styles.sidebarItemName}`}>{'Settings'}</span>
          </Link>
        }
      </div>
    </div>

  );
};

export default Sidebar;
