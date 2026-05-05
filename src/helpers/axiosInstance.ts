// import axios, { AxiosInstance } from "axios";
// import { cookies } from "next/headers";
// import { jwtDecode } from "jwt-decode";
// import { fetchSessionData } from "./amplify-server-utils";
// import cognitoConfig from "../aws-exports";
// import endpointData from "../../config.json";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

// // Function to create an Axios instance with a dynamic baseURL
// export const createAPI = (baseURL: string): AxiosInstance => {
//   return axios.create({
//     baseURL,
//   });
// };

// export const deleteAllTheCookies = async () => {
//   const cookiesStore = await cookies();
//   const allCookies = cookiesStore.getAll();
//   console.log("All cookies before deletion:", allCookies);
//   for (const cookie of allCookies) {
//     cookiesStore.delete(cookie?.name);
//   }
//   console.log("All cookies after deletion:", cookiesStore.getAll());
// };

// // FIX Warning 1: redirect() internally throws a special Next.js error that must
// // not be swallowed by a try/catch. Removed the wrapper function and instead call
// // revalidatePath + redirect directly at the call site (in authenticatedUser below),
// // outside of any try/catch block.
// export async function revalidateHome() {
//   revalidatePath("/");
// }

// export const getToken = async (): Promise<string | undefined> => {
//   try {
//     let accessToken: string | undefined;
//     let userID: string | undefined;
//     const cookiesStore = await cookies();

//     userID = cookiesStore.get(
//       `CognitoIdentityServiceProvider.${cognitoConfig.aws_user_pools_web_client_id}.LastAuthUser`,
//     )?.value;
//     console.log("axios userID:", userID);

//     if (userID !== undefined) {
//       accessToken = cookiesStore.get(
//         `CognitoIdentityServiceProvider.${cognitoConfig.aws_user_pools_web_client_id}.${userID}.accessToken`,
//       )?.value;
//       return accessToken;
//     } else {
//       console.log("userId not found:", cookiesStore.getAll());
//       return undefined;
//     }
//   } catch (err) {
//     // FIX Bug 4: Fixed typo in log message ("uaerID" → "userID", "accessTocken" → "accessToken")
//     console.log("Error accessing userID and accessToken:", err);
//     return undefined;
//   }
// };

// // FIX Bug 2: Previously returned `false` (not expired) when no token was present.
// // That caused the interceptor to skip the refresh branch entirely for missing tokens.
// // Now returns `true` (treat as expired) so a refresh is always attempted when
// // there is no token.
// export async function isTokenExpired(): Promise<boolean> {
//   const token = await getToken();
//   console.log("axios token:", token);
//   if (!token) return true;

//   try {
//     const decoded: { exp: number } = jwtDecode(token);
//     console.log(
//       "decoded.exp:",
//       decoded.exp,
//       "Math.floor(Date.now() / 1000):",
//       Math.floor(Date.now() / 1000),
//     );
//     return decoded.exp < Math.floor(Date.now() / 1000);
//   } catch (error) {
//     console.log("Error decoding token:", error);
//     return true;
//   }
// }

// async function authenticatedUser() {
//   try {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const session: any = await fetchSessionData();
//     console.log(
//       "fetchAuthSession axios intercept auth:",
//       JSON.stringify(session),
//     );

//     if (session?.name === "UserUnAuthenticatedException") {
//       await deleteAllTheCookies();
//       // FIX Warning 1: revalidatePath + redirect called directly here, outside
//       // any try/catch, so Next.js can correctly handle the thrown redirect error.
//       revalidatePath("/");
//       redirect("/");
//     } else if (!session?.tokens) {
//       return false;
//     } else {
//       return session?.tokens;
//     }
//   } catch (error) {
//     console.log("axios fetchAuthSession session error:", JSON.stringify(error));
//     return false;
//   }
// }

// export const attachInterceptors = (
//   apiInstance: AxiosInstance,
//   apikey: string,
// ) => {
//   apiInstance.interceptors.request.use(
//     async (config) => {
//       let accessToken = await getToken();
//       const tokenExpiry = await isTokenExpired();
//       console.log("tokenExpiry:", tokenExpiry);

//       if (tokenExpiry) {
//         // FIX Bug 2 (continued): Previously only entered this branch when
//         // `accessToken` was truthy AND expired. Now enters whenever expired
//         // (or token missing), so a missing token also triggers a refresh attempt.
//         try {
//           const newAccessToken = await authenticatedUser();

//           if (newAccessToken) {
//             accessToken = newAccessToken.accessToken.toString();
//             console.log("intercepted refreshed token:", accessToken);

//             // FIX Bug 3: The refreshed token was used for the current request
//             // but never written back to the cookie store. On the next request
//             // the stale/missing cookie would be read again, causing an infinite
//             // refresh loop. Now we persist the new token immediately.
//             const cookiesStore = await cookies();
//             const userID = cookiesStore.get(
//               `CognitoIdentityServiceProvider.${cognitoConfig.aws_user_pools_web_client_id}.LastAuthUser`,
//             )?.value;
//             if (userID) {
//               cookiesStore.set(
//                 `CognitoIdentityServiceProvider.${cognitoConfig.aws_user_pools_web_client_id}.${userID}.accessToken`,
//                 accessToken as string,
//                 {
//                   path: "/",
//                   sameSite: "lax",
//                   secure: process.env.NODE_ENV === "production",
//                   maxAge: 60 * 60 * 24 * 365,
//                 },
//               );
//             }
//           }
//         } catch (error) {
//           console.log("Token refresh failed:", error);
//         }
//       }

//       if (accessToken) {
//         config.headers.Authorization = `Bearer ${accessToken}`;
//         console.log("Authorization header set");
//       } else {
//         config.headers["x-api-key"] = apikey;
//       }

//       return config;
//     },
//     // FIX Bug 7: Previously wrapped errors in `new Error(String(error))` which
//     // discards the original stack trace and type information. Rejecting the
//     // original value preserves the full error context for debugging.
//     (error) => Promise.reject(error),
//   );
// };

// const authAPI = createAPI(endpointData.auth.url);
// attachInterceptors(authAPI, endpointData.auth.apikey);

// export { authAPI };
