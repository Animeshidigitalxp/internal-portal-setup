"use client"
import { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import { signOut } from "aws-amplify/auth";
import Link from 'next/link';
import OutsideClickHandler from 'react-outside-click-handler';
import { usePathname, useRouter } from 'next/navigation';
import { clearListCookies, deleteCookiesBasedOnDomains } from '@/src/helpers/helper';
import { useAppDispatch } from '@/src/lib/hooks';
import { storeCurrentUserPermission, storeCurrentUserSlice } from './Reducer/currentUserSlice';
import profile from '../SideBar/svg/profile.svg'
import profileImg from '../SideBar/svg/profileImg.png'
import { setFullPageLoader } from '../FullPageLoader/reducer/fullPageLoaderSlice';
import { BiSolidBell } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import minimarty from './svg/minimarty.svg'

type NavbarProps = {
  currentUser: any;
}

const Navbar = (props: NavbarProps) => {
  const { currentUser } = props
  const [showDropdown, setShowDropdown] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  
  const pathname = usePathname()
  const router = useRouter()
  const dispatchRedux = useAppDispatch()

  

  const currentPermission = currentUser?.Permissions ? JSON?.parse(currentUser?.Permissions) : {}

  useEffect(() => {
    dispatchRedux(storeCurrentUserSlice(currentUser))
    dispatchRedux(storeCurrentUserPermission(currentUser?.Permissions ? JSON.parse(currentUser?.Permissions) : {}))
    
  }, [])

  //console.log('replacePathSuff pathSuff', replacePathSuff)

  const handleLogout = async () => {
    console.log('Logout function called');
   
    await signOut()
    deleteCookiesBasedOnDomains()
    clearListCookies()

    router.push('/login')
    dispatchRedux(setFullPageLoader(true))
  }

  const handleChangeCountry = (newCountry: string) => {

    dispatchRedux(setFullPageLoader(true))
    
  }

  
  return (

    <header className={`${styles.navbar} fixed-top`}>
      <div className={styles.container}>
        {/* Logo Section */}
        <div className={styles.logoSection}>


          <Link href="/" className={styles.logo} suppressHydrationWarning>
             <img className={` mr-3 ${styles.mobile} ${styles.brandLogoImgIcon}`} alt="brand logo"
              src={minimarty.src} />
              <span className='exo_semibold_blue_16px' suppressHydrationWarning>Mini Marty</span>
          </Link>
        </div>

        {/* Search Section */}
        {/* <div className={`${styles.searchSection} ${styles.desktop}`}>
          <div className={styles.searchContainer}>
            <Search size={20} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search applications, reports, or tasks..."
              className={`${styles.searchInput} inter_light_dimgray_12px`}
            />
          </div>
        </div> */}

        {/* User Section */}
        <div className={styles.userSection}>
         

         
          
          {
            // currentPermission?.Settings?.Notification?.View &&
            <Link
              onClick={() => dispatchRedux(setFullPageLoader(true))}
              href={`#`} className={styles.iconButton}>
                <BiSolidBell size={24} color="#ffffff" />
              {/* <BellIcon size={24} color="#dddada" /> */}
              {/* <img src={bell.src} alt='Notification' style={{ width: '2.5rem', height: '2.5rem' }} /> */}
            </Link>
          }
          {/* User Profile */}
          <div className={styles.userProfile}>
            <OutsideClickHandler onOutsideClick={() => setShowProfile(false)}>
              <div className='position-relative cursor-pointer'>
                <button type='button' className={`border-0 d-flex justify-content-center align-items-center ${styles['profile-button']}`} onClick={() => setShowProfile(!showProfile)}>
                  {
                    currentUser?.Profile_Photo_URL ?
                      <img src={currentUser?.Profile_Photo_URL} alt='profile' className={`${styles.userProfileImage}`} />
                      :
                      // <img src={profileImg.src} alt='profile' className={styles.dropdownIcon} style={{ width: '3rem', height: '3rem' }} />
                      <BsPersonCircle size={30} className={styles.dropdownIcon}/>

                    // <LuCircleUser size={30} className={styles.dropdownIcon} />
                  }
                  <div className={`${styles.desktop} ${styles.textAlign} pl-3 `}>
                    <div className='inter_regular_white_12px mb-1'>User name </div>
                    <div className='inter_regular_white_10px'>Position </div>
                  </div>
                </button>
                {
                  showProfile && (
                    <div className={`inter_regular_gray_14px ${styles['label-and-dropdown-otpion']} ${styles['label-and-profiledropdown-otpion']}`}>
                      <Link
                        onClick={() => dispatchRedux(setFullPageLoader(true))}
                        className='mb-4' href={`#`}>
                        Profile

                      </Link>
                      <br />
                      <button onClick={() => handleLogout()} className='mb-4 mt-4 inter_regular_gray_14px'>

                        Logout
                      </button>
                    </div>
                  )
                }
              </div>
            </OutsideClickHandler>

            {/* <Link href={`/${countryCode === 'gb' ? 'uk' : countryCode.toLowerCase()}/profile`}>
              {
                currentUser?.Profile_Photo_URL ?
                <img src={currentUser?.Profile_Photo_URL} alt='profile' className={`${styles.userProfileImage}`}/>
                :
                <LuCircleUser size={32} className={styles.dropdownIcon} />
              }
              
              </Link> */}



          </div>
        </div>
      </div>
    </header>


  );
};

export default Navbar;
