import {
    getCategoriesAction
} from "@/app/actions/podcastActions";
import { getProfileAction } from "@/app/actions/profileActions";
import { CustomUser } from "@/app/api/auth/[...nextauth]/authOptions";
import EditPodcasterProfile from "./edit-podcaster-profile";
const EditPodcasterContainer = async ({ user }: { user: CustomUser }) => {
  const profileResponse = await getProfileAction({
    type: "podcaster",
  });
  const catergories = await getCategoriesAction();

  return (
    <EditPodcasterProfile
      user={user}
      profile={profileResponse}
      categoriesList={catergories}
    />
  );
};

export default EditPodcasterContainer;
