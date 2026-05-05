import { axiosBackendCall } from "@/src/helpers/graphqlHelper"
import { conversationRoute } from "@/src/routes"

export const getAllConversation = async (nextCursor?: string) => {
  try {
    const result = await axiosBackendCall('GET', `${conversationRoute}${nextCursor ? `?cursor=${nextCursor}` : ''}`)
    return result
  } catch (err) {
    console.log('getAllConversation error', err)
  }
}