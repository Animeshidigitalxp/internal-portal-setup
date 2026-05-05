import { SlLocationPin } from "react-icons/sl";
import SideSectionBar from '../../components/common/SideSectionBar/SideSectionBar';
import { HiUser } from "react-icons/hi";


const menuItems = [
  {
    path: '/settings',
    label: 'Company details',
    icon: <SlLocationPin />,
    active: true,
  },
  {
    path: '/user-and-role',
    label: 'Users & Roles',
    icon: <HiUser />,

  },
]
function page() {
  return (
    <section className='d-flex'>
      <SideSectionBar title='Settings' menuItems={menuItems} />
      <div className='flex-grow-1 page-with-breadcrumb-ml'>
      </div>
    </section>
  )
}

export default page