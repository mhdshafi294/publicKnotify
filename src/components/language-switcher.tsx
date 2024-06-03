// app/components/LanguageSwitcher.tsx
"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
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

const locales = [
  { locale: "en" as const, name: "English" },
  { locale: "ar" as const, name: "Arabic" },
];

export function LanguageSwitcher() {
  const t = useTranslations("Index");
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(Array.from(searchParams.entries()));
  const { data: session, status } = useSession();

  return (
    <div>
      <DropdownMenu>
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
                <Link
                  key={locale}
                  href={`/${session.user?.type}`}
                  locale={locale}
                >
                  <DropdownMenuItem className="px-4 py-1">
                    {name}
                  </DropdownMenuItem>
                </Link>
              );
            } else {
              return (
                <Link key={locale} href={`/`} locale={locale}>
                  <DropdownMenuItem className="px-4 py-1">
                    {name}
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
