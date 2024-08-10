// External dependencies
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"; // Authentication options import
import { getServerSession } from "next-auth"; // NextAuth utility to get server session
import { redirect } from "next/navigation"; // Next.js utility for redirection
import React from "react"; // React import

// Internal dependencies
import EditUserProfile from "./_components/edit-user-profile"; // Internal component for editing user profiles
import EditCompanyProfile from "./_components/edit-company-profile"; // Internal component for editing company profiles
import EditPodcasterContainer from "./_components/edit-podcaster-container"; // Internal component for editing podcaster profiles

/**
 * EditProfilepage Component
 *
 * This component handles the profile editing for different types of users based on their session type.
 * It checks the user's session to determine their type and renders the appropriate editing component.
 * If no session is found, the user is redirected to the login page.
 *
 * @returns {JSX.Element} The rendered component with profile editing options based on user type.
 */
const EditProfilepage = async () => {
  // Fetch the current user session
  const session = await getServerSession(authOptions);

  // Redirect to login page if no session exists
  if (!session) {
    redirect("/login");
    return null; // Ensure no further rendering if redirected
  }

  // Render the appropriate editing component based on user type
  const content = () => {
    switch (session.user.type) {
      case "user":
        return <EditUserProfile user={session.user} />;
      case "podcaster":
        return <EditPodcasterContainer user={session.user} />;
      case "company":
        return <EditCompanyProfile user={session.user} />;
      default:
        return <p>Invalid user type</p>; // Fallback for unknown user types
    }
  };

  return (
    <div className="md:max-w-screen-sm px-4 flex flex-col w-full items-center">
      {content()}
    </div>
  );
};

export default EditProfilepage;
