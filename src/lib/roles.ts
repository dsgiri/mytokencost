import { auth, currentUser } from "@clerk/nextjs/server";

export type SystemRole = "MTC-GUEST" | "MTC-DEMO" | "MTC-USER" | "MTC-ADMIN";

/**
 * Securely extracts the user's role from the Clerk JWT token.
 * Defaults to 'MTC-GUEST' if no role is explicitly assigned, enforcing a zero-trust model.
 */
export async function getUserRole(): Promise<SystemRole> {
  const { sessionClaims } = await auth();
  const user = await currentUser();

  // Root Admin Override
  if (user?.emailAddresses?.[0]?.emailAddress === "dharmendra.giri@gmail.com") {
    return "MTC-ADMIN";
  }
  
  // Clerk stores custom public metadata inside the JWT token under sessionClaims.metadata
  // We typecast it, and strictly fallback to the lowest permission level.
  const role = (sessionClaims?.metadata as any)?.role as SystemRole | undefined;
  
  return role || "MTC-GUEST";
}
