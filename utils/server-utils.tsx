
// utils/amplify-utils.ts
import { cookies } from "next/headers";

import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";
import { fetchUserAttributes, getCurrentUser } from "aws-amplify/auth/server";

import { type Schema } from "@/amplify/data/resource";
import outputs from "@/amplify_outputs.json";
import { updateUserAttributes } from "aws-amplify/auth";



export const { runWithAmplifyServerContext } = createServerRunner({
  config: outputs,
});

export const cookiesClient = generateServerClientUsingCookies<Schema>({
  config: outputs,
  cookies,
});

export async function AuthGetCurrentUserServer() {

  try {
    const currentUser = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => getCurrentUser(contextSpec),
    });
    return currentUser;
  } catch (error) {
    console.error(error);
  }
}
export async function AuthGetCurrentUserAtribServer() {
  try {
    const currentUserAtrib = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => fetchUserAttributes(contextSpec),
    });
    return currentUserAtrib;
  } catch (error) {
    console.error(error);
  }
}

export async function UpdateUserAtribServer(keys:string, values:string) {
  try {
    const currentUserAtrib = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => updateUserAttributes({userAttributes:{
        keys,values
      }}),
    });
    return currentUserAtrib;
  } catch (error) {
    console.error(error);
  }
}