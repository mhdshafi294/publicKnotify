import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/language-switcher";

export default function Home() {
  const t = useTranslations("Index");

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <p>{t("title")}</p>
      </main>
    </>
  );
}
