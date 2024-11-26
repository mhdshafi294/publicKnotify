"use client";

import * as React from "react";
import { Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function DarkModeToggle() {
  const { setTheme } = useTheme();
  const t = useTranslations("Index");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isDesktop ? (
          <DropdownMenuItem>
            <Sun className=" size-4 me-2 rotate-0 scale-100  dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute size-4 me-2 rotate-90 scale-0  dark:rotate-0 dark:scale-100" />
            <span>{t("toggle-theme")}</span>
          </DropdownMenuItem>
        ) : (
          <Button
            variant="outline"
            size="icon"
            className="hover:bg-transparent md:hidden flex gap-2 hover:text-foreground relative"
          >
            <Sun className=" size-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute size-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">{t("toggle-theme")}</span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className=" size-4 me-2 rotate-0 scale-100 " />
          {t("light")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="size-4 me-2 rotate-0 scale-100" />
          {t("dark")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <SunMoon className="size-4 me-2 rotate-0 scale-100" />
          {t("system")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
