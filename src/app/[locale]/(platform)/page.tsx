import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import { redirect } from "@/navigation";

/**
 * Home Component
 * This is the default home page component that checks for user authentication
 * and redirects to the user's specific type page if a session exists.
 * If no session is found, it displays a welcome message, however this page should not appears on no-error scinario.
 *
 * @returns {JSX.Element} The home page content.
 */
export default async function Home() {
  // Fetch the current session using NextAuth's getServerSession
  const session = await getServerSession(authOptions);

  if (!session || session.expires) {
    redirect("/sign-in");
  }

  // If a session exists, redirect the user to their respective type page
  if (session) {
    redirect(`/${session?.user?.type}`);
  }

  // Render the home page with a welcoming message if no session is found
  return (
    <MaxWidthContainer className="mt-20 flex flex-col justify-center items-center">
      <h2 className="text-5xl">Hello There!</h2>
    </MaxWidthContainer>
  );
}
