import LoginForm from "./components/LoginForm/LoginForm";
import styles from './style.module.sass'
import Image from "next/image";
import LogInPageimage from './img/LogInPageimage.webp'
export default async function Login() {

  const logoSvgData = <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.642857" y="0.642857" width="34.7143" height="34.7143" rx="17.3571" fill="white" />
                  <rect x="0.642857" y="0.642857" width="34.7143" height="34.7143" rx="17.3571" stroke="#024272" strokeWidth="1.28571" />
                  <path d="M9.91993 19.4005L17.3888 8.66407V19.4005H9.91993ZM18.7892 19.4005C18.9759 18.9648 19.1782 18.2024 19.396 17.1132C19.6139 16.024 19.7228 14.9192 19.7228 13.7989C19.7228 12.6786 19.6177 11.5271 19.4077 10.3446C19.1976 9.16199 18.9914 8.29063 18.7892 7.73047C19.7383 8.01055 20.6836 8.53181 21.625 9.29426C22.5664 10.0567 23.4144 10.967 24.1691 12.025C24.9237 13.0831 25.5383 14.2462 26.0129 15.5144C26.4875 16.7825 26.7248 18.0779 26.7248 19.4005H18.7892ZM15.5216 24.5353C14.9614 24.5353 14.4401 24.4031 13.9578 24.1386C13.4754 23.874 13.0631 23.5395 12.7207 23.1349C12.5029 23.3683 12.2656 23.5862 12.0089 23.7885C11.7521 23.9907 11.4682 24.1541 11.157 24.2786C10.6124 23.874 10.1494 23.3722 9.76822 22.7732C9.387 22.1741 9.12637 21.5167 8.98633 20.8009H27.6584C27.5184 21.5167 27.2577 22.1741 26.8765 22.7732C26.4953 23.3722 26.0324 23.874 25.4878 24.2786C25.1766 24.1541 24.8926 23.9907 24.6359 23.7885C24.3791 23.5862 24.1418 23.3683 23.924 23.1349C23.5661 23.5395 23.1499 23.874 22.6753 24.1386C22.2007 24.4031 21.6833 24.5353 21.1232 24.5353C20.563 24.5353 20.0418 24.4031 19.5594 24.1386C19.077 23.874 18.6647 23.5395 18.3224 23.1349C17.98 23.5395 17.5677 23.874 17.0853 24.1386C16.603 24.4031 16.0817 24.5353 15.5216 24.5353ZM8.98633 28.2698V26.4025H9.91993C10.4179 26.4025 10.9041 26.3247 11.3787 26.1691C11.8533 26.0135 12.3006 25.7801 12.7207 25.4689C13.1409 25.7801 13.5882 26.0097 14.0628 26.1575C14.5374 26.3053 15.0236 26.3792 15.5216 26.3792C16.0195 26.3792 16.5018 26.3053 16.9686 26.1575C17.4354 26.0097 17.8867 25.7801 18.3224 25.4689C18.7425 25.7801 19.1898 26.0097 19.6644 26.1575C20.139 26.3053 20.6253 26.3792 21.1232 26.3792C21.6211 26.3792 22.1035 26.3053 22.5703 26.1575C23.0371 26.0097 23.4883 25.7801 23.924 25.4689C24.3597 25.7801 24.8109 26.0135 25.2777 26.1691C25.7445 26.3247 26.2269 26.4025 26.7248 26.4025H27.6584V28.2698H26.7248C26.2424 28.2698 25.7679 28.2114 25.3011 28.0947C24.8343 27.978 24.3752 27.803 23.924 27.5696C23.4727 27.803 23.0137 27.978 22.5469 28.0947C22.0801 28.2114 21.6055 28.2698 21.1232 28.2698C20.6408 28.2698 20.1662 28.2114 19.6994 28.0947C19.2326 27.978 18.7736 27.803 18.3224 27.5696C17.8711 27.803 17.4121 27.978 16.9453 28.0947C16.4785 28.2114 16.0039 28.2698 15.5216 28.2698C15.0392 28.2698 14.5646 28.2114 14.0978 28.0947C13.631 27.978 13.172 27.803 12.7207 27.5696C12.2695 27.803 11.8105 27.978 11.3437 28.0947C10.8769 28.2114 10.4023 28.2698 9.91993 28.2698H8.98633Z" fill="#024272" />
                </svg>

  return (
    <section style={{ overflowX: 'hidden' }}>
      <div className="row">
        <div className={`col-sm-7 col-md-7  col-lg-7 col-xl-7 ${styles['login-image-section']}`}
          style={{ position: 'sticky', top: '0', height: '100vh', background: "radial-gradient(circle at top left, #eef2f7 0%, #d9e3ed 100%)" }}
        >
          <Image src={LogInPageimage} alt='loginImage' className={styles.loginImage} />
          <div className={styles.pageContainer}>
            <div className={styles.logoContainer}>
              <div className={styles.logoIcon}>
                {/* Replace with your actual SVG logo */}
                {logoSvgData}

              </div>
              <span className={styles.logoText}>Ginger AI</span>
            </div>

            <div className={styles.heroContent}>

              <h1 className={styles.title}>Welcome to Ginger AI</h1>
              <p className={styles.subtitle}>
                Sign in to manage your AI assistant, conversations, <br></br> and intelligence settings.
              </p>
              {/* <ul className={styles.featureList}>
                <li>
                  <span className={styles.iconWrapper}>
                  <PiStarFour color="#1275B3" fontSize={'1.8rem'}/>
                  </span>
                  Intelligent Conversations
                </li>
                <li>
                   <span className={styles.iconWrapper}>
                  <PiLightning color="#1275B3" fontSize={'1.8rem'}/>
                  </span>
                  Real-time Analytics
                </li>

                <li>
                   <span className={styles.iconWrapper}>
                  <LuBrain color="#1275B3" fontSize={'1.8rem'}/>
                  </span>
                  Advanced AI Settings
                </li>
                
              </ul> */}
            </div>

          </div>



        </div>

        <div className={`${styles['login-form-section']} col-sm-12 col-md-12  col-lg-5 col-xl-5`}>
          <div className={styles.loginLogoContainer1}>

            <div className="ml-4 mb-4 d-flex align-items-center">
              {logoSvgData}

              <span className={`ml-3 ${styles.logoText}`}>Ginger AI</span>
            </div>
            <hr className={`${styles['ec-img-hr']}`} />

          </div>

          <div className={`${styles['login-form-wrapper']}`}>
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
}
