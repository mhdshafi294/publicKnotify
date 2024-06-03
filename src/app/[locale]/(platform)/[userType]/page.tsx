import { useTranslations } from "next-intl";

import TrendingSection from "@/app/[locale]/(platform)/_components/trending-section";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";

export default function Home({
  params,
  searchParams,
}: {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const t = useTranslations("Index");

  return (
    <>
      <MaxWidthContainer className="mt-20">
        <main className="flex flex-col items-start justify-start gap-10 w-full">
          <h1 className="sr-only">Knotify Home Page</h1>
          {/* <p>{t("title")}</p> */}
          <TrendingSection params={params} searchParams={searchParams} />
        </main>
      </MaxWidthContainer>
    </>
  );
}
