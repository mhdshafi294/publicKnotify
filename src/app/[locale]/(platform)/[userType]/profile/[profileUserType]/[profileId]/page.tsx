import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import { getTranslations } from "next-intl/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getProfileAction } from "@/app/actions/profileActions";
import ProfileCard from "../../_components/profile-card";
import ProfileContent from "../../_components/profile-content";
import { User } from "@/types/profile";
import { getPodcasterAction } from "@/app/actions/podcasterActions";
import { PodcasterDetails } from "@/types/podcaster";
import { redirect } from "@/navigation";

export default async function Profile({
  params,
  searchParams,
}: {
  params: { profileUserType: string; profileId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let profileData: User | PodcasterDetails | undefined;
  let profileType: string | undefined;
  let isSelfProfile: boolean | undefined;
  const t = await getTranslations("Index");

  const session = await getServerSession(authOptions);

  // if (
  //   session?.user?.type === params.profileUserType &&
  //   params.profileId !== session?.user?.id?.toString()
  // ) {
  //   redirect(`/${session?.user?.type}`);
  // }

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
    if (params.profileUserType === "podcaster") {
      if (session?.user?.type !== "company")
        redirect(`/${session?.user?.type}`);
      isSelfProfile = false;
      profileType = "podcaster";
      const profileResponse = await getPodcasterAction({
        //Todo: Change this to getPodcasterAction
        id: params.profileId,
        type: session?.user?.type as string,
      });
      profileData = profileResponse.podcaster;
    } else if (params.profileUserType === "company") {
      if (session?.user?.type !== "podcaster")
        redirect(`/${session?.user?.type}`);
      isSelfProfile = false;
      profileType = "company";
      const profileResponse = await getProfileAction({
        //Todo: Change this to getCompanyAction
        type: session?.user?.type as string,
      });
      profileData = profileResponse.user;
    } else if (params.profileUserType === "user") {
      redirect(`/${session?.user?.type}`);
    }
  }

  // if (!profileData || !profileType || !isSelfProfile) return null;
  // console.log(profileData);

  return (
    <>
      <main className="flex lg:min-h-[calc(100vh-72px)] flex-col items-center justify-between py-12 ">
        <MaxWidthContainer className="w-full lg:min-h-[calc(100vh-168px)] flex flex-col gap-2 lg:flex-row lg:gap-10">
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
    </>
  );
}
