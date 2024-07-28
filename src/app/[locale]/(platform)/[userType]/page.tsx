import { useTranslations } from "next-intl";

import TrendingSection from "@/app/[locale]/(platform)/_components/trending-section";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import CategorySecrtion from "@/app/[locale]/(platform)/_components/category-secrtion";
import PodcastersSection from "@/app/[locale]/(platform)//_components/podcasters-section";
import { redirect } from "@/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getTranslations } from "next-intl/server";

export default async function Home({
  params,
  searchParams,
}: {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const t = getTranslations("Index");

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const content = () => {
    if (session?.user?.type !== "podcaster")
      return (
        <>
          <TrendingSection params={params} searchParams={searchParams} />
          <CategorySecrtion />
          <PodcastersSection params={params} searchParams={searchParams} />
        </>
      );
    else return <CategorySecrtion />;
  };

  return (
    <main className="flex flex-col items-start justify-start gap-6 w-full mt-8 mb-2">
      <h1 className="sr-only">Knotify Home Page</h1>
      {content()}
    </main>
  );
}
