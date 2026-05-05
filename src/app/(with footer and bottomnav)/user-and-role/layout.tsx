import { SlLocationPin } from 'react-icons/sl';
import { HiUser } from "react-icons/hi";
import SideSectionBar from '@/src/app/components/common/SideSectionBar/SideSectionBar';
export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const menuItems = [
        {
            path: '/settings',
            label: 'Company details',
            icon: <SlLocationPin />,

        },
        {
            path: '/user-and-role',
            label: 'Users & Roles',
            icon: <HiUser />,
            active: true,
        },
    ]

    return (
        <section className='d-flex'>
            <SideSectionBar title='Settings' menuItems={menuItems} />
            <div className='flex-grow-1 page-with-breadcrumb-ml'>

                {children}

            </div>
        </section>
    )
}