import { SlLocationPin } from 'react-icons/sl';
import { HiUser } from "react-icons/hi";
import SideSectionBar from '@/src/app/components/common/SideSectionBar/SideSectionBar';
import ComponentWrapper from './ComponentWrapper';


function page() {


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
          
        <ComponentWrapper/>
        
      </div>
    </section>
  )
}

export default page