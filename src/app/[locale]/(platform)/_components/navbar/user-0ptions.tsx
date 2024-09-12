import { Fragment } from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn, getDirection } from "@/lib/utils";
import { Link } from "@/navigation";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HeartHandshakeIcon,
  LifeBuoyIcon,
  LogOutIcon,
  MessagesSquareIcon,
  Settings,
  ShieldAlertIcon,
  User,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Separator } from "@/components/ui/separator";

const UserOptions = () => {
  const { data: session, status } = useSession();
  const t = useTranslations("Index");
  const locale = useLocale();
  const dir = getDirection(locale);

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
        <DropdownMenu dir={dir}>
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
          <DropdownMenuContent className="bg-background border-none shadow-2xl w-screen md:w-56 rounded-2xl p-2">
            <DropdownMenuLabel>
              {session?.user?.full_name as string}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="opacity-20" />

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
            <DropdownMenuSeparator className=" my-2 opacity-20" />
            <Link
              href={`/${session?.user?.type}/profile/${session?.user?.type}/${session?.user?.id}`}
            >
              <DropdownMenuItem>
                <User className="me-2 h-4 w-4" />
                <span>{t("profile")}</span>
              </DropdownMenuItem>
            </Link>
            {session?.user?.type !== "user" ? (
              <Link href={`/${session?.user?.type}/chats`}>
                <DropdownMenuItem>
                  <MessagesSquareIcon className="me-2 h-4 w-4" />
                  <span>{t("messages")}</span>
                </DropdownMenuItem>
              </Link>
            ) : null}
            <Link href={`/${session?.user?.type}/settings`}>
              <DropdownMenuItem>
                <Settings className="me-2 h-4 w-4" />
                <span>{t("settings")}</span>
              </DropdownMenuItem>
            </Link>
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
