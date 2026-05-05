"use client"
import React, { useState } from 'react';

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



type SidebarProps = {
  permissions: any
}

const Sidebar: React.FC<SidebarProps> = ({ permissions }) => {

  const closeSidebar = () => {
    const checkbox = document?.getElementById?.("sidebarToggle");
    if (checkbox) checkbox.checked = true;
  };

  const sidebarItems: SidebarItem[] = [
    {
      name: 'Conversations',
      path: `/`,
      icon: homeSvg.src,
      ogpath: '/',
      exists: true
    },
    {
      name: 'Dashboard',
      path: `/dashboard`,
      icon: conversation.src,
      ogpath: '/dashboard',
      exists: false,
      // dropdownItems: [
        // {
        //   name: 'Purchase order',
        //   path: `/${countryCode}/purchase-orders`,
        //   ogpath: '/purchase-orders',
        //   exists: true,
        //   show: permissions?.['Purchase Order']?.View
        // },
        // {
        //   name: 'Bills',
        //   path: `/${countryCode}/bills`,
        //   ogpath: '/bills',
        //   exists: true,
        //   show: permissions?.['Bills']?.View
        // },
        // {
        //   name: 'Material Intake',
        //   path: `/${countryCode}/purchase/material-intake`,
        //   ogpath: '/purchase/material-intake',
        //   exists: countryCode === 'uk',
        //   show: countryCode === 'uk' && permissions?.['Purchase']?.['Material Intake']?.View
        // },
      // ]

    },
    {
      name: 'Leads',
      path: `/leads`,
      icon: lead.src,
      ogpath: '/leads',
      exists: true,
      // dropdownItems: [
      //   { name: 'Demand Forecasting', path: `/demand-planning`, ogpath: '/demand-planning', exists: true, show: true },
        
      // ]
    },
    {
      name: 'Inventory',
      path: `/inventory`,
      icon: inventory.src,
      ogpath: '/inventory',
      exists: false,

    },
    {
      name: 'Knowledge Base',
      path: `/knowledge-base`,
      icon: document.src,
      ogpath: '/knowledge-base',
      exists: false,
      // dropdownItems: [
        // { name: 'Materials', path: `/${countryCode}/inventory/materials`, ogpath: '/inventory/materials', exists: true, show: permissions?.['Inventory']?.['Material'] },
        // { name: 'Products', path: `/${countryCode}/inventory/products`, ogpath: '/inventory/products', exists: true, show: permissions?.['Inventory']?.['Products'] },
      // ]
    },
    {
      name: 'Events',
      path: `/events`,
      icon: event.src,
      ogpath: '/events',
      exists: false,
      // dropdownItems: [
        // {
        //   name: countryCode === 'uk' ? 'Production plans' : 'Production order',
        //   path: countryCode === 'uk' ? `/${countryCode}/production/production-plans` : `/${countryCode}/production/production-order`,
        //   ogpath: countryCode === 'uk' ? '/production/production-plans' : '/production/production-order',
        //   exists: true,
        //   show: countryCode === 'uk' ? permissions?.['Production']?.['Production Plan']?.View : permissions?.['Production']?.['Production Order']?.View
        // },
        // {
        //   name: 'Production run',
        //   path: countryCode === 'uk' ? `/${countryCode}/production/production-run-uk` : `/${countryCode}/production/production-run`,
        //   ogpath: countryCode === 'uk' ? '/production/production-run-uk' : '/production/production-run',
        //   exists: true,
        //   show: permissions?.['Production']?.['Production Run']?.View
        // },
        // {
        //   name: 'Production stats', path: `/${countryCode}/production/production-stats`,
        //   ogpath: '/production/production-stats',
        //   exists: true,
        //   show: permissions?.['Production']?.['Production stats']?.View
        // }
      // ]
    },
    
    {
      name: 'Settings',
      path: `/settings`,
      icon: settings.src,
      ogpath: '/settings',
      exists: false,
      // dropdownItems: [
        // { name: 'Sales order entry', path: `/${countryCode}/sales/sales-orders`, ogpath: '/sales/sales-orders', exists: true, show: permissions?.['Sales']?.['Sales order entry']?.View },
        // { name: 'Sales order management', path: `/${countryCode}/sales/sales-order-management`, ogpath: '/sales/sales-order-management', exists: true, show: permissions?.['Sales']?.['Sales order management']?.View },
        // { name: 'Invoices', path: `/${countryCode}/sales/invoices`, ogpath: '/sales/invoices', exists: true, show: permissions?.['Sales']?.['Invoices']?.View },
        // {
        //   name: 'Despatch Check',
        //   path: `/${countryCode}/sales/despatch-check`,
        //   ogpath: '/sales/despatch-check',
        //   exists: countryCode === 'uk',
        //   show: countryCode === 'uk' && permissions?.['Sales']?.['Despatch Check']?.View
        // },
      // ],
    }
    

  ];

  const navigate = useRouter();
  const dispatchRedux = useAppDispatch()
  

  let location: any = usePathname();

  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>( {});

  // Initialize dropdown states based on current route
  // useEffect(() => {

  //   const newOpenState = { ...openDropdowns };
  //   setOpenDropdowns(newOpenState);
  // }, [location]);



  const handleItemClick = (item: SidebarItem, event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (item.dropdownItems) {
      event.preventDefault();

      
    } else {
      
      closeSidebar();
      dispatchRedux(setFullPageLoader(true))
    }
    // else {
    //   navigate.push(`${item.path}`);
    // }
  };

  const handleDropdownItemClick = (path: string) => {
    navigate.push(`${path}`);
    dispatchRedux(setFullPageLoader(true))
  };



  // Updated to correctly check for path segments in the URL
  const isChildActive = (dropdownItem: DropdownItem) => {

    // Get the last segment of the path to check
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
            // permissions?.['Home']?.['Sales Analytics'] &&

            <SideBarLink
              item={sidebarItems?.[0]}
              isActiveCheck={(sidebarItems?.[0].path === `/` && location === '/') || location.split('/').includes('conversations') }
              handleItemClick={handleItemClick}
              openDropdowns={openDropdowns}
              isChildActive={isChildActive}
              handleDropdownItemClick={handleDropdownItemClick}
              dropdownCheck={false} />
          }

          {hideSection &&
            // permissions?.['Purchase Order'] || permissions?.['Bills'] || permissions?.['Purchase']?.['Material Intake'] ?
              <SideBarLink
                item={sidebarItems?.[1]}
                isActiveCheck={location.split('/').includes('conversations')}
                handleItemClick={handleItemClick}
                openDropdowns={openDropdowns}
                isChildActive={isChildActive}
                handleDropdownItemClick={handleDropdownItemClick}
                dropdownCheck={false} />
              // :
              // <></>
          }

          {
            // permissions?.['Carrier'] &&
            <SideBarLink
              item={sidebarItems?.[2]}
              isActiveCheck={location.split('/').includes('leads') || location.split('/').includes('transcript') }
              handleItemClick={handleItemClick}
              openDropdowns={openDropdowns}
              isChildActive={isChildActive}
              handleDropdownItemClick={handleDropdownItemClick}
              dropdownCheck={sidebarItems?.[2].dropdownItems?.some(child => isChildActive(child)) ?? false}
            />
          }

          {hideSection &&
            // permissions?.['Dispatch Order']?.View &&

            <SideBarLink
              item={sidebarItems?.[3]}
              isActiveCheck={sidebarItems?.[3].path === location}
              handleItemClick={handleItemClick}
              openDropdowns={openDropdowns}
              isChildActive={isChildActive}
              handleDropdownItemClick={handleDropdownItemClick}
              dropdownCheck={false} />

          }

          {hideSection &&
            // permissions?.['Inventory'] &&
            <SideBarLink
              item={sidebarItems?.[4]}
              isActiveCheck={sidebarItems?.[4].path === location}
              handleItemClick={handleItemClick}
              openDropdowns={openDropdowns}
              isChildActive={isChildActive}
              handleDropdownItemClick={handleDropdownItemClick}
              dropdownCheck={sidebarItems?.[4].dropdownItems?.some(child => isChildActive(child)) ?? false}
            />

          }

          {hideSection &&
            // permissions?.['Production'] &&
            <SideBarLink
              item={sidebarItems?.[5]}
              isActiveCheck={sidebarItems?.[5].path === location}
              handleItemClick={handleItemClick}
              openDropdowns={openDropdowns}
              isChildActive={isChildActive}
              handleDropdownItemClick={handleDropdownItemClick}
              dropdownCheck={sidebarItems?.[5].dropdownItems?.some(child => isChildActive(child)) ?? false}
            />

          }

          {/* {
            permissions?.['Bills']?.View &&

          <SideBarLink
            item={sidebarItems?.[6]}
            isActiveCheck={location.split('/').includes('bills')}
            handleItemClick={handleItemClick}
            openDropdowns={openDropdowns}
            isChildActive={isChildActive}
            handleDropdownItemClick={handleDropdownItemClick}
            dropdownCheck={false} 
          />
  } */}

          {hideSection &&
            // permissions?.['Sales'] &&

            <SideBarLink
              item={sidebarItems?.[6]}
              isActiveCheck={sidebarItems?.[6].path === location}
              handleItemClick={handleItemClick}
              openDropdowns={openDropdowns}
              isChildActive={isChildActive}
              handleDropdownItemClick={handleDropdownItemClick}
              dropdownCheck={sidebarItems?.[6].dropdownItems?.some(child => isChildActive(child)) ?? false}
            />
          }

          {
            // permissions?.['Sample']?.View &&

            // <SideBarLink
            //   item={sidebarItems?.[8]}
            //   isActiveCheck={sidebarItems?.[8].path === location}
            //   handleItemClick={handleItemClick}
            //   openDropdowns={openDropdowns}
            //   isChildActive={isChildActive}
            //   handleDropdownItemClick={handleDropdownItemClick}
            //   dropdownCheck={false}
            // />

          }

          {
            // permissions?.['Documents']?.View &&


            // <SideBarLink
            //   item={sidebarItems?.[9]}
            //   isActiveCheck={sidebarItems?.[9].path === location}
            //   handleItemClick={handleItemClick}
            //   openDropdowns={openDropdowns}
            //   isChildActive={isChildActive}
            //   handleDropdownItemClick={handleDropdownItemClick}
            //   dropdownCheck={sidebarItems?.[9].dropdownItems?.some(child => isChildActive(child)) ?? false}
            // />
          }
          {/* {

            <SideBarLink
              item={sidebarItems?.[10]}
              isActiveCheck={location.split('/').includes('compliance')}
              handleItemClick={handleItemClick}
              openDropdowns={openDropdowns}
              isChildActive={isChildActive}
              handleDropdownItemClick={handleDropdownItemClick}
              dropdownCheck={sidebarItems?.[10].dropdownItems?.some(child => isChildActive(child)) ?? false}
            />

          } */}
          {/* {
            permissions?.['Setup'] &&
            <SideBarLink
              item={sidebarItems?.[11]}
              isActiveCheck={location.split('/').includes('setup')}
              handleItemClick={handleItemClick}
              openDropdowns={openDropdowns}
              isChildActive={isChildActive}
              handleDropdownItemClick={handleDropdownItemClick}
              dropdownCheck={sidebarItems?.[11].dropdownItems?.some(child => isChildActive(child)) ?? false}
            />
          }

          {
            permissions?.['Analytics']?.View &&

            <SideBarLink
              item={sidebarItems?.[12]}
              isActiveCheck={location.split('/').includes('analytics')}
              handleItemClick={handleItemClick}
              openDropdowns={openDropdowns}
              isChildActive={isChildActive}
              handleDropdownItemClick={handleDropdownItemClick}
              dropdownCheck={sidebarItems?.[12].dropdownItems?.some(child => isChildActive(child)) ?? false}
            />
          }

          {
            permissions?.['External Setup'] &&

            <SideBarLink
              item={sidebarItems?.[13]}
              isActiveCheck={location.split('/').includes('external-setup')}
              handleItemClick={handleItemClick}
              openDropdowns={openDropdowns}
              isChildActive={isChildActive}
              handleDropdownItemClick={handleDropdownItemClick}
              dropdownCheck={sidebarItems?.[13].dropdownItems?.some(child => isChildActive(child)) ?? false}
            />
          } */}
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