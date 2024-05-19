import { Link } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");

  const locale = useLocale();
  const otherLocale = locale === "en" ? "ar" : "en";

  return (
    <Link href="/" locale={otherLocale}>
      {t("switchLocale", { locale: otherLocale })}
    </Link>
  );
}
