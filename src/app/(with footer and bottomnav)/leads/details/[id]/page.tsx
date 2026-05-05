import LeadsDetails from "../Components/LeadsDetails";
import { axiosBackendCall } from "@/src/helpers/graphqlHelper";
import { leadsRoute } from "@/src/routes";
import BreadCrumbs from "@/src/app/components/common/BreadCrumbs/BreadCrumbs";
import ResetFullPageLoader from "@/src/app/components/FullPageLoader/ResetFullPageLoader";

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

    const [results] = await Promise.all([getLeadsDetail(id)])

    const breadCrumbData = [{
        label: 'Leads',
        path: `/leads`,
        isEdit: false,
        isActive: false,
        isLink: true
    },
    {
        label: 'Leads details',
        path: '/leads',
        isEdit: false,
        isActive: true,
        isLink: false
    }];
    return (
        <div>
            <BreadCrumbs breadCrumbData={breadCrumbData} />
            <LeadsDetails leadData={results?.data} />
            <ResetFullPageLoader />
        </div>
    )
}

export default page
