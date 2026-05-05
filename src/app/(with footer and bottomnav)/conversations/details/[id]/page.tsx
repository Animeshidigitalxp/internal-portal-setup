import ConversationDetails from "../Components/ConversationDetails";
import { axiosBackendCall } from "@/src/helpers/graphqlHelper";
import { conversationRoute } from "@/src/routes";
import BreadCrumbs from "@/src/app/components/common/BreadCrumbs/BreadCrumbs";




const getConversationDetail = async (id: string) => {
  try {
    const result = await axiosBackendCall('GET', `${conversationRoute}/${id}`)
    return result
  } catch (err) {
    console.log('getConversationDetail error', err)
    return null
  }
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
     const [convoDetail] = await Promise.all([getConversationDetail(id)])
    const breadCrumbData =  [{
            label: 'Conversations',
            path: `/`,
            isEdit: false,
            isActive: false,
            isLink: true
        },
        {
            label: 'Conversations details',
            path: '/',
            isEdit: false,
            isActive: true,
            isLink: false
        }];

    return (
        <div>
            <BreadCrumbs breadCrumbData={breadCrumbData}/>
            <ConversationDetails
            convoDetail={convoDetail?.data ?? {}}/>
        </div>
    )
}

export default page