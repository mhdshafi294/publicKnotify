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
import { LogOutIcon, Settings, User } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

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
          <DropdownMenuContent className="bg-background border-none shadow-2xl w-screen md:w-56">
            <DropdownMenuLabel>
              {session?.user?.full_name as string}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="opacity-50" />
            <Link
              href={`/${session?.user?.type}/profile/${session?.user?.type}/${session?.user?.id}`}
            >
              <DropdownMenuItem>
                <User className="me-2 h-4 w-4" />
                <span>{t("profile")}</span>
              </DropdownMenuItem>
            </Link>
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
