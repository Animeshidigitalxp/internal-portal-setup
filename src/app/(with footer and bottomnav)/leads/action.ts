import { axiosBackendCall } from "@/src/helpers/graphqlHelper"
import { leadsRoute } from "@/src/routes"

export const getAllLeads = async (nextCursor?: string) => {
  try {
    const result = await axiosBackendCall('GET', `${leadsRoute}${nextCursor ? `?cursor=${nextCursor}` : ''}`)
    return result
  } catch (err) {
    console.log('getAllLeads error', err)
  }
}