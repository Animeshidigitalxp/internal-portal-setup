import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/globals.css';
import '../styles/_styleguide.sass';
import type { Metadata, Viewport } from "next";
import { Exo } from "next/font/google";
import StoreProvider from "./StoreProvider";
import FullPageLoader from "./components/FullPageLoader/FullPageLoader";
// import ConfigureAmplify from "./ConfigureAmplify";
// import MicrosoftClarity from "./components/Clarity/MicrosoftClarity";

const exo = Exo({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-exo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mini Marty",
  description: "Mini Marty",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={exo.variable}>
      <body
        // className={`
        //    ${geistSans.variable} ${geistMono.variable}
        //   antialiased`}
        className="antialiased"
      >
        {/* <ConfigureAmplify> */}
        <StoreProvider>
          <FullPageLoader />
          {children}
          {/* <MicrosoftClarity /> */}
        </StoreProvider>
        {/* </ConfigureAmplify> */}
        {/* <script
          src="https://dk010ec1xodxm.cloudfront.net/ginger-widget.js"
          data-dealer="sunrise-marine"
          data-theme="light"
          data-position="bottom-right"
          data-primary-color="#0057B8"
          data-auto-open-delay="5000"
          
        ></script> */}

      </body>
    </html>
  );
}
