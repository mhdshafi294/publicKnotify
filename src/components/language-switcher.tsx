"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { useSession } from "next-auth/react";
import { getDirection } from "@/lib/utils";

const locales = [
  { locale: "ar" as const, name: "Arabic" },
  { locale: "en" as const, name: "English" },
];

export function LanguageSwitcher() {
  const t = useTranslations("Index");
  const pathname = usePathname();
  const locale = useLocale();
  const dir = getDirection(locale);
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(Array.from(searchParams.entries()));
  const { data: session, status } = useSession();

  return (
    <div>
      <DropdownMenu dir={dir}>
        <DropdownMenuTrigger asChild>
          <Button
            size={"icon"}
            variant={"ghost"}
            className="hover:bg-transparent hover:text-white"
          >
            <Globe />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 text-white border-input border-opacity-20">
          <DropdownMenuLabel>{t("language")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {locales.map(({ locale, name }) => {
            const href = `/${pathname.split("/").slice(2).join("/")}?${params}`;
            if (session) {
              return (
                <Link key={locale} href={href} locale={locale}>
                  <DropdownMenuItem className="px-4 py-1">
                    {name === "Arabic" ? "العربية" : name}
                  </DropdownMenuItem>
                </Link>
              );
            } else {
              return (
                <Link key={locale} href={href} locale={locale}>
                  <DropdownMenuItem className="px-4 py-1">
                    {name === "Arabic" ? "العربية" : name}
                  </DropdownMenuItem>
                </Link>
              );
            }
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
