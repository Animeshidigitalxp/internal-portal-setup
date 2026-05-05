import LayoutClient from "../components/common/LayoutClient/LayoutClient";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/SideBar/Sidebar";
import styles from './layout.module.sass'


import { Menu } from "lucide-react";

const getUserDetail = async () => {
    try {
        // const result = await gqlAxiosApiQuery(getUser)
        return {
            data: {
                getUser: {
                    "id": "1",
                    "name": "Sanjit",
                    "email": "sanjitmaji08@gmail.com",
                    "Permissions": "{\"isAdmin\":true,\"isBuyer\":true,\"isSupplier\":true}"
                }
            }
        }
    } catch (e) {
        console.log('getUser error', e)
    }
}

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [currentUser] = await Promise.all([getUserDetail()])
    
    return (
        <section>
            <LayoutClient />

            <Navbar
                currentUser={currentUser?.data?.getUser}
                
            />
            {/* position: absolute;
    top: 19px;
    left: 22px;
    z-index: 1050; */}
            <div className={''}>
                <input type="checkbox" id="sidebarToggle" className={`toggle ${styles['layout-start-menu']}`} hidden
                    // defaultChecked
                />
                <label htmlFor="sidebarToggle" className={`cursor-pointer ${styles['layout-start-menu']}`}>
                    <Menu size={24} color="#ffffff" />
                </label>
                
                <Sidebar
                    permissions={currentUser?.data?.getUser?.Permissions ?
                        JSON.parse(currentUser?.data?.getUser?.Permissions) :
                            {}} />
                
                <div className={'main-layout-content'}>
                    {children}
                </div>
            </div>

            {/* <LayoutComponentWrapper countryCode={countryCode} currency={currency} currentUser={currentUser}>
                {children}
            </LayoutComponentWrapper> */}
        </section>
    )
}