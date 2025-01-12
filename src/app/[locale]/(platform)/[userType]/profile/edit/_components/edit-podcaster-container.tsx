// Internal Imports
import { getCategoriesAction } from "@/app/actions/podcastActions";
import { getProfileAction } from "@/app/actions/profileActions";
import { CustomUser } from "@/app/api/auth/[...nextauth]/auth-options";
import EditPodcasterProfile from "./edit-podcaster-profile";

/**
 * Container component for editing a podcaster's profile.
 *
 * Fetches the current profile data and list of categories, then renders the
 * `EditPodcasterProfile` component with the fetched data.
 *
 * @param {object} props - Component props.
 * @param {CustomUser} props.user - The current user data.
 * @returns {JSX.Element} The rendered `EditPodcasterProfile` component.
 */
const EditPodcasterContainer = async ({ user }: { user: CustomUser }) => {
  // Fetch profile data for the podcaster
  const profileResponse = await getProfileAction({
    type: "podcaster",
  });

  // Fetch list of categories
  const categories = await getCategoriesAction();

  // Render the EditPodcasterProfile component with fetched data
  return (
    <EditPodcasterProfile
      user={user}
      profile={profileResponse}
      categoriesList={categories}
    />
  );
};

export default EditPodcasterContainer;
