import { redirect } from "@/navigation";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";

import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import ProfileCard from "../../_components/profile-card";
import ProfileContent from "../../_components/profile-content";

import { getCompanyAction } from "@/app/actions/companyActions";
import { getPodcasterAction } from "@/app/actions/podcasterActions";
import { getProfileAction } from "@/app/actions/profileActions";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";

import { cn } from "@/lib/utils";
import { Company } from "@/types/company";
import { PodcasterDetails } from "@/types/podcaster";
import { User } from "@/types/profile";

/**
 * Profile component for displaying user, podcaster, or company profile.
 *
 * @param {object} props - Component props.
 * @param {object} props.params - URL parameters.
 * @param {string} props.params.profileUserType - The type of the profile user (e.g., "user", "podcaster", "company").
 * @param {string} props.params.profileId - The ID of the profile being viewed.
 * @param {object} props.searchParams - Additional search parameters.
 *
 * @returns {JSX.Element} The rendered profile page.
 */
export default async function ProfilePage({
  params,
  searchParams,
}: {
  params: { profileUserType: string; profileId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let profileData: User | PodcasterDetails | Company | undefined;
  let profileType: string | undefined;
  let isSelfProfile: boolean | undefined;
  const t = await getTranslations("Index");

  const session = await getServerSession(authOptions);

  // If the session user matches the profile being viewed, load the profile as self
  if (
    session?.user?.type === params.profileUserType &&
    session?.user?.id?.toString() === params.profileId
  ) {
    const profileResponse = await getProfileAction({
      type: session?.user?.type as string,
    });
    profileData = profileResponse.user;
    isSelfProfile = true;
    profileType = profileData.type;
  } else {
    // Handle viewing another user's profile
    switch (params.profileUserType) {
      case "podcaster":
        if (session?.user?.type === "podcaster")
          redirect(`/${session?.user?.type}`);
        isSelfProfile = false;
        profileType = "podcaster";
        const podcasterResponse = await getPodcasterAction({
          id: params.profileId,
          type: session?.user?.type as string,
        });
        profileData = podcasterResponse.podcaster;
        break;

      case "company":
        if (session?.user?.type !== "podcaster")
          redirect(`/${session?.user?.type}`);
        isSelfProfile = false;
        profileType = "company";
        const companyResponse = await getCompanyAction({
          id: params.profileId,
          type: session?.user?.type as string,
        });
        profileData = companyResponse.company;
        break;

      case "user":
        redirect(`/${session?.user?.type}`);
        break;

      default:
        // Handle unexpected profile types
        redirect("/");
    }
  }

  // Render the profile components if data is available
  if (!profileData || !profileType || isSelfProfile === undefined) return null;

  return (
    <main className="flex lg:min-h-[calc(100vh-72px)] flex-col items-center justify-between flex-1 py-12">
      <MaxWidthContainer
        className={cn(
          "w-full lg:min-h-[calc(100vh-168px)] flex flex-col gap-2 lg:flex-row lg:gap-10",
          { "max-w-[2000px]": session?.user?.type === "podcaster" }
        )}
      >
        <ProfileCard
          profileData={profileData!}
          session={session}
          profileType={profileType!}
          isSelfProfile={isSelfProfile!}
        />
        <ProfileContent
          profileData={profileData!}
          session={session}
          profileType={profileType!}
          isSelfProfile={isSelfProfile!}
          params={params}
          searchParams={searchParams}
        />
      </MaxWidthContainer>
    </main>
  );
}
