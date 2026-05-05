import LoginForm from "./components/LoginForm/LoginForm";
import styles from './style.module.sass'
import Image from "next/image";
import LogInPageimage from './img/NewLoginImage.webp'
export default async function Login() {

  const logoSvgData = <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 4C0 1.79086 1.79086 0 4 0H32C34.2091 0 36 1.79086 36 4V32C36 34.2091 34.2091 36 32 36H4C1.79086 36 0 34.2091 0 32V4Z" fill="white"/>
<path d="M29.0002 24.608L28.5871 24.8307L18.3723 30.3307L18.0002 30.5309L17.6272 30.3307L7.41331 24.8307L6.99925 24.608V8.42932L8.13694 8.99768L17.9992 13.9293L27.8625 8.99768L29.0002 8.42932V24.608Z" fill="url(#paint0_linear_35_1133)" stroke="url(#paint1_linear_35_1133)" stroke-width="1.57145"/>
<path d="M17.9995 18.7857L12.4994 15.6428V22.7143L17.9995 25.8572L23.4996 22.7143V15.6428L17.9995 18.7857Z" fill="url(#paint2_linear_35_1133)"/>
<defs>
<linearGradient id="paint0_linear_35_1133" x1="17.9998" y1="7.63828" x2="17.9998" y2="29.6386" gradientUnits="userSpaceOnUse">
<stop stop-color="#1E1D50"/>
<stop offset="0.749261" stop-color="#40689A"/>
<stop offset="1" stop-color="#5AC3F0"/>
</linearGradient>
<linearGradient id="paint1_linear_35_1133" x1="17.9998" y1="7.63828" x2="17.9998" y2="29.6386" gradientUnits="userSpaceOnUse">
<stop stop-color="#1E1D50"/>
<stop offset="0.75" stop-color="#40689A"/>
<stop offset="1" stop-color="#5AC3F0"/>
</linearGradient>
<linearGradient id="paint2_linear_35_1133" x1="17.9995" y1="15.6428" x2="17.9995" y2="25.8572" gradientUnits="userSpaceOnUse">
<stop stop-color="#5AC3F0"/>
<stop offset="1" stop-color="#31BA9B"/>
</linearGradient>
</defs>
</svg>


  return (
    <section style={{ overflowX: 'hidden' }}>
      <div className="row">
        <div className={`col-sm-12 col-md-12 col-lg-5 col-xl-5 ${styles['login-image-section']}`}
          style={{ position: 'sticky', top: '0', height: '100vh', background: "radial-gradient(circle at top left, #eef2f7 0%, #d9e3ed 100%)" }}
        >
          <div className={styles.imageWrapper}>
            <Image src={LogInPageimage} alt='loginImage' fill className={styles.loginImage} />
          </div>
          <div className={styles.pageContainer}>
            <div className={styles.logoContainer}>
              <div className={styles.logoIcon}>
                {/* Replace with your actual SVG logo */}
                {logoSvgData}

              </div>
              <span className={styles.logoText}>Mini Marty</span>
            </div>

            <div className={styles.heroContent}>

              <h1 className={` ${styles.title} inter_regular_Exo_24px`}>Smarter Hardware Procurement</h1>
              <p className={styles.subtitle}>
                Automated hardware sourcing, approvals, and tracking
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

        <div className={`${styles['login-form-section']} col-sm-12 col-md-12 col-lg-7 col-xl-7`}>
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
