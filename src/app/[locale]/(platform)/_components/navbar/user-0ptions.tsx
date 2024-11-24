"use client";

import { Fragment, useEffect, useState } from "react";

import { LanguageSwitcher } from "@/components/language-switcher";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { DarkModeToggle } from "@/components/ui/dark-mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, getDirection } from "@/lib/utils";
import { Link } from "@/navigation";
import {
  HandshakeIcon,
  HeartHandshakeIcon,
  LifeBuoyIcon,
  LogOutIcon,
  MessagesSquareIcon,
  ShieldAlertIcon,
  User,
  WalletIcon,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import SelfStoriesDropdownSubMenu from "../../[userType]/stories/_components/self-stories-dropdownsub-menu";

const UserOptions = () => {
  const { data: session, status } = useSession();
  const t = useTranslations("Index");
  const locale = useLocale();
  const dir = getDirection(locale);
  const [userOptionDropdownMenu, setUserOptionDropdownMenu] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) setIsMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isMounted) return null; // Avoid rendering during SSR phase

  return (
    <Fragment>
      {status === "unauthenticated" ? (
        <Link
          href="/sign-in"
          className={cn(buttonVariants({ variant: "default" }), "")}
        >
          {t("signIn")}
        </Link>
      ) : (
        <DropdownMenu
          dir={dir}
          open={userOptionDropdownMenu}
          onOpenChange={setUserOptionDropdownMenu}
        >
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage
                src={session?.user?.image!}
                alt={session?.user?.full_name}
                className="object-cover "
              />
              <AvatarFallback className="uppercase text-black">
                {session?.user?.full_name?.slice(0, 2) as string}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-screen md:w-56">
            <DropdownMenuLabel>
              {session?.user?.full_name as string}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="dark:opacity-20" />
            <Link href={`/terms`}>
              <DropdownMenuItem>
                <HeartHandshakeIcon className="me-2 h-4 w-4" />
                <span>{t("terms")}</span>
              </DropdownMenuItem>
            </Link>
            <Link href={`/privacy`}>
              <DropdownMenuItem>
                <ShieldAlertIcon className="me-2 h-4 w-4" />
                <span>{t("privacy")}</span>
              </DropdownMenuItem>
            </Link>
            <Link href={`/support`}>
              <DropdownMenuItem>
                <LifeBuoyIcon className="me-2 h-4 w-4" />{" "}
                <span>{t("support")}</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator className=" my-2 dark:opacity-20" />
            <Link
              href={`/${session?.user?.type}/profile/${session?.user?.type}/${session?.user?.id}`}
            >
              <DropdownMenuItem>
                <User className="me-2 h-4 w-4" />
                <span>{t("Profile")}</span>
              </DropdownMenuItem>
            </Link>
            {session?.user?.type === "podcaster" ? (
              <SelfStoriesDropdownSubMenu
                setUserOptionDropdownMenu={setUserOptionDropdownMenu}
              />
            ) : null}
            {session?.user?.type !== "user" ? (
              <Link href={`/${session?.user?.type}/chats`}>
                <DropdownMenuItem>
                  <MessagesSquareIcon className="me-2 h-4 w-4" />
                  <span>{t("messages")}</span>
                </DropdownMenuItem>
              </Link>
            ) : null}
            {session?.user?.type === "podcaster" ? (
              <Link href={`/${session?.user?.type}/wallet`}>
                <DropdownMenuItem>
                  <WalletIcon className="me-2 h-4 w-4" />
                  <span>{t("wallet")}</span>
                </DropdownMenuItem>
              </Link>
            ) : null}
            {session?.user?.type !== "user" ? (
              <Link href={`/${session?.user?.type}/contracts`}>
                <DropdownMenuItem>
                  <HandshakeIcon className="me-2 h-4 w-4" />
                  <span>{t("Contracts")}</span>
                </DropdownMenuItem>
              </Link>
            ) : null}
            <LanguageSwitcher />
            <DarkModeToggle />
            {/* <Link href={`/${session?.user?.type}/settings`}>
              <DropdownMenuItem>
                <Settings className="me-2 h-4 w-4" />
                <span>{t("settings")}</span>
              </DropdownMenuItem>
            </Link> */}
            <DropdownMenuItem
              className="text-red-500"
              onClick={() => signOut()}
            >
              <LogOutIcon className="me-2 h-4 w-4" />
              <span>{t("logOut")}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </Fragment>
  );
};

export default UserOptions;
