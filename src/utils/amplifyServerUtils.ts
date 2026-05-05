import { createServerRunner, NextServer } from "@aws-amplify/adapter-nextjs";
import awsmobile from "@/src/aws-exports";
import { fetchAuthSession } from "aws-amplify/auth/server";
import configData from "../../config.json";

const outputs = {
  ...awsmobile,
  oauth: {
    ...awsmobile.oauth,
    redirectSignIn: `${configData.domain}/`,
    redirectSignOut: `${configData.domain}/`,
    responseType: "code",
  },
};

const domain = configData.domain.split("www")[1];

const coookiesDomain = {
  domain: domain,
  path: "/",
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 24 * 365,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const runner: any = (createServerRunner as any)({
  config: outputs,
  runtimeOptions: {
    cookies: coookiesDomain,
  },
});

export const runWithAmplifyServerContext =
  runner.runWithAmplifyServerContext as ReturnType<
    typeof createServerRunner
  >["runWithAmplifyServerContext"];

export const createAuthRouteHandlers = (
  typeof runner.createAuthRouteHandlers === "function"
    ? runner.createAuthRouteHandlers
    : undefined
) as
  | undefined
  | ((args: {
      redirectOnSignInComplete: string;
      redirectOnSignOutComplete: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) => any);

// Warning 2 FIX: getAuthRouteHandler was duplicated in both amplifyServerUtils.ts
// and amplify-server-utils.ts. Keeping the single source of truth here and
// re-exporting from amplify-server-utils.ts to avoid drift between the two copies.
export function getAuthRouteHandler(args: {
  redirectOnSignInComplete: string;
  redirectOnSignOutComplete: string;
}) {
  if (typeof createAuthRouteHandlers === "function") {
    return createAuthRouteHandlers(args);
  }
  return async () =>
    new Response("Auth route handlers not available in this adapter version", {
      status: 501,
    });
}

export async function authenticatedUser(context: NextServer.Context) {
  console.log("context middleware:", JSON.stringify(context));
  try {
    const currentUser = await runWithAmplifyServerContext({
      nextServerContext: context,
      operation: async (contextSpec) => {
        console.log("contextSpec middleware:", JSON.stringify(contextSpec));
        try {
          const session = await fetchAuthSession(contextSpec, {
            forceRefresh: true,
          });
          console.log("fetchAuthSession:", JSON.stringify(session));
          if (!session.tokens) {
            return;
          }

          const user = {
            ...session,
            
          };
          console.log("user:", JSON.stringify(user));
          return user;
        } catch (error) {
          console.log("middleware inside error:", JSON.stringify(error));
          return false;
        }
      },
    });

    return currentUser;
  } catch (err) {
    console.log("middleware outside err:", JSON.stringify(err));
  }
}

export async function authenticatedUserDontRefreshToken(
  context: NextServer.Context,
) {
  try {
    console.log("context middleware:", JSON.stringify(context));
    const currentUser = await runWithAmplifyServerContext({
      nextServerContext: context,
      operation: async (contextSpec) => {
        console.log("contextSpec middleware:", JSON.stringify(contextSpec));
        try {
          const session = await fetchAuthSession(contextSpec);
          console.log("fetchAuthSession:", JSON.stringify(session));
          if (!session.tokens) {
            return;
          }

          const user = {
            ...session,
            
          };
          
          return user;
        } catch (error) {
          console.log("middleware inside error:", JSON.stringify(error));
          return false;
        }
      },
    });

    return currentUser;
  } catch (err) {
    console.log("middleware outside err:", JSON.stringify(err));
  }
}
