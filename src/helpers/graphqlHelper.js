"use server";
import { cookies, headers } from 'next/headers';
import endpointData from "../../config.json";
import axios from "axios";



let accessToken = "";
let userID = "";;
let useragent = "";

export async function GET() {

  try {
    const cookiesStore = await cookies();
    const headersList = await headers();
    useragent = headersList.get('user-agent') || '';
    // if (useragent !== "ELB-HealthChecker/2.0") {
    // 	console.log('cookiesStore', JSON.stringify(cookiesStore))
    // }
    userID = cookiesStore.get(`CognitoIdentityServiceProvider.${endpointData.cognito.webclient}.LastAuthUser`)?.value
    if (userID) {
      accessToken = cookiesStore.get(
        `CognitoIdentityServiceProvider.${endpointData.cognito.webclient}.${userID}.idToken`,
      )?.value;
      //console.log('user is logged in:' + userID + '\naccessToken:' + accessToken)
    }
    else if (useragent !== "ELB-HealthChecker/2.0") {

      console.log('user is not logged in',);
      accessToken = ''
      console.log('user is not accessToken')
    }
  } catch (err) {
    console.log('getting error on accessing uaerID and accessTocken', err)
  }
  return useragent;

}
export const axiosBackendCall = async (method = "GET", path, input) => {
  await GET()
  const url = `${endpointData?.endpoint}${path}`;

  if (accessToken && typeof accessToken !== 'object') {
    const options = {
      method,
      url,
      headers: {
        "Content-Type": "application/json",
        "authorization": `${accessToken}`
      },
    };

    if (input && method !== 'GET') {
      options.body = JSON.stringify(input)
    }

    if (useragent !== "ELB-HealthChecker/2.0") {
        console.log("axiosBackendCall options:", JSON.stringify(options));
    }
    try {
      const { data } = await axios(options);
      if (useragent !== "ELB-HealthChecker/2.0") {
        
        console.log("axiosBackendCall response:", JSON.stringify(data));
      }
      return data;
    } catch (error) {
      console.error("Error in axiosBackendCall:", error);
      return { Message: error?.message || String(error) };
    }
  }


};
