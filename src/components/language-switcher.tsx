// app/components/LanguageSwitcher.tsx
"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { ChevronDown, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useTranslations } from "next-intl";

const locales = [
  { locale: "en", name: "English" },
  { locale: "ar", name: "Arabic" },
];

export function LanguageSwitcher() {
  const t = useTranslations("Index");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(Array.from(searchParams.entries()));

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
        <DropdownMenuContent className="w-56 bg-input text-white border-input border-opacity-20">
          <DropdownMenuLabel>{t("language")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {locales.map(({ locale, name }) => {
            const href = `/${locale}/${pathname
              .split("/")
              .slice(2)
              .join("/")}?${params}`;
            return (
              <DropdownMenuItem key={locale} className="px-4 py-1">
                <Link href={href} locale={locale}>
                  <button>{name}</button>
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
