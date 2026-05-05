// utils/amplify-server-utils.ts
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth/server";
import { cookies } from "next/headers";

import {
  runWithAmplifyServerContext,
} from "@/src/utils/amplifyServerUtils";

// FIX Warning 2: getAuthRouteHandler was defined identically in both this file
// and amplifyServerUtils.ts. Removed the duplicate here and re-export from the
// single source of truth to avoid the two copies drifting out of sync.
export { getAuthRouteHandler } from "@/src/utils/amplifyServerUtils";

export const fetchSessionData = async () => {
  // FIX Bug 5: Previously logged `cookies` (the function reference) instead of
  // its resolved value, producing a useless "[Function: cookies]" log line.
  // Now we await and resolve the store before logging.
  const cookieStore = await cookies();
  console.log(
    "fetchSessionData cookies:",
    JSON.stringify(cookieStore.getAll()),
  );

  const session = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: async (contextSpec) => {
      console.log("contextSpec:", JSON.stringify(contextSpec));
      try {
        const session = await fetchAuthSession(contextSpec, {
          forceRefresh: true,
        });
        console.log("fetchAuthSession session:", JSON.stringify(session));

        // FIX Bug 6: Previously called getCurrentUser but silently discarded
        // its result, returning only the bare session. This was inconsistent
        // with amplifyServerUtils.ts which correctly merges user + session.
        // Now we merge both so callers receive the full user + token payload.
        try {
          const user = await getCurrentUser(contextSpec);
          console.log("getCurrentUser:", JSON.stringify(user));
          return { ...session, ...user };
        } catch (error) {
          // getCurrentUser can throw when the session exists but the user
          // record is unavailable — still return the session in that case.
          console.log(
            "getCurrentUser error (returning session only):",
            JSON.stringify(error),
          );
          return session;
        }
      } catch (err) {
        console.log("fetchAuthSession error:", err);
        return undefined;
      }
    },
  });

  return session;
};
