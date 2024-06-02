import { useTranslations } from "next-intl";

import TrendingSection from "@/app/[locale]/(platform)/_components/trending-section";

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
      <main className="flex min-h-screen flex-col items-center justify-start gap-10 p-24">
        <p>{t("title")}</p>
        <p>{t("new")}</p>
        {/* <p>{t("title")}</p> */}
        <TrendingSection params={params} searchParams={searchParams} />
      </main>
    </>
  );
}
