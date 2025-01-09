import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

/**
 * Handles GET requests to retrieve the user's access token.
 *
 * @returns {Promise<NextResponse>} - A response containing the access token or an error message.
 */
export async function GET() {
  // Get the current session using the authentication options
  const session = await getServerSession(authOptions);

  // Check if the session or user is missing
  if (!session || !session.user) {
    // Return an unauthorized response if the user is not authenticated
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Return the user's access token in the response
  return NextResponse.json({ token: session.user.access_token });
}
