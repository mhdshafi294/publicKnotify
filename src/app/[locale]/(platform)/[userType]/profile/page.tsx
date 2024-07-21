import { getProfileAction } from "@/app/actions/profileActions";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import { getServerSession } from "next-auth";
import { useTranslations } from "next-intl";

export default async function Profile() {
  const t = useTranslations("Index");

  const session = await getServerSession(authOptions);

  const profileResponse = await getProfileAction({
    type: session?.user?.type as string,
  });
  const profileData = profileResponse.user;

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <MaxWidthContainer className="w-full h-full flex flex-col gap-2 lg:flex-row lg:gap-10">
          <div className="lg:w-2/12 h-full rounded-lg bg-card py-10 px-5"></div>
          <div className="w-full lg:w-9/12"></div>
        </MaxWidthContainer>
      </main>
    </>
  );
}
