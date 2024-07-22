import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import { useTranslations } from "next-intl";
import ProfileCard from "./_components/profile-card";
import { getTranslations } from "next-intl/server";

export default async function Profile() {
  const t = await getTranslations("Index");

  return (
    <>
      <main className="flex lg:min-h-[calc(100vh-72px)] flex-col items-center justify-between py-12 ">
        <MaxWidthContainer className="w-full lg:min-h-[calc(100vh-168px)] flex flex-col gap-2 lg:flex-row lg:gap-10">
          <ProfileCard />
          <div className="w-full lg:w-8/12"></div>
        </MaxWidthContainer>
      </main>
    </>
  );
}
