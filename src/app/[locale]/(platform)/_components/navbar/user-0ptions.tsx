"use client";

import { Fragment, useState } from "react";

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
import AddStoryDropdownMenu from "../../[userType]/stories/_components/add-story-dropdown-menu";
import StoryUploadDialogsFormContainer from "../../[userType]/stories/_components/story-upload-dialogs-form-container";

const UserOptions = () => {
  const { data: session, status } = useSession();
  const t = useTranslations("Index");
  const locale = useLocale();
  const dir = getDirection(locale);
  const [userOptionDropdownMenu, setUserOptionDropdownMenu] = useState(false);
  const [isStoryMediaDialogOpen, setStoryMediaDialogIsOpen] = useState(false);
  const [isStoryTextDialogOpen, setStoryTextDialogIsOpen] = useState(false);

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
          <DropdownMenuTrigger
            asChild
            onClick={() => setUserOptionDropdownMenu(true)}
          >
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
                <span>{t("profile")}</span>
              </DropdownMenuItem>
            </Link>
            {session?.user?.type === "podcaster" ? (
              <AddStoryDropdownMenu
                isOpen={isStoryMediaDialogOpen}
                setIsMediaDialogOpen={setStoryMediaDialogIsOpen}
                setIsTextDialogOpen={setStoryTextDialogIsOpen}
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
            {session?.user?.type !== "user" ? (
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
                  <span>{t("contracts")}</span>
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
      <StoryUploadDialogsFormContainer
        isStoryMediaDialogOpen={isStoryMediaDialogOpen}
        setStoryMediaDialogIsOpen={setStoryMediaDialogIsOpen}
        isStoryTextDialogOpen={isStoryTextDialogOpen}
        setStoryTextDialogIsOpen={setStoryTextDialogIsOpen}
      />
    </Fragment>
  );
};

export default UserOptions;
