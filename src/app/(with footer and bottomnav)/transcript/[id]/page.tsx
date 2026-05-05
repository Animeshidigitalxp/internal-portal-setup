
import { axiosBackendCall } from '@/src/helpers/graphqlHelper';

import ComponentWrapper from '../ComponentWrapper'

import BreadCrumbs from '@/src/app/components/common/BreadCrumbs/BreadCrumbs';
import { leadsRoute } from '@/src/routes';
import ResetFullPageLoader from '@/src/app/components/FullPageLoader/ResetFullPageLoader';

const getLeadsDetail = async (id: string) => {
    try {
        const result = await axiosBackendCall('GET', `${leadsRoute}/${id}`)
        return result
    } catch (err) {
        console.log('getLeadsDetail error', err)
        return null
    }
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const [convoDetail] = await Promise.all([getLeadsDetail(id)])


  const breadCrumbData = [{
    label: 'Leads',
    path: `/leads`,
    isEdit: false,
    isActive: false,
    isLink: true
  },
  {
    label: 'Leads details',
    path: `/leads/details/${id}`,
    isEdit: false,
    isActive: false,
    isLink: true
  },
  {
    label: 'Full Transcript',
    path: '/leads',
    isEdit: false,
    isActive: true,
    isLink: false
  }];
  return (
    <div>
      <BreadCrumbs breadCrumbData={breadCrumbData} />
      <ComponentWrapper convoDetail={convoDetail?.data ?? {}} />
      <ResetFullPageLoader />

    </div>

  )
}

export default page