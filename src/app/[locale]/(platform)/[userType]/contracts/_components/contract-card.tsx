"use client";

import { MessageCircleMoreIcon, ScrollTextIcon } from "lucide-react";
import { FC } from "react";

import EllipsisVerticalIconKnotify from "@/components/icons/ellipsis-verticalIcon-knotify";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { Contract } from "@/types/contract";
import { format } from "date-fns";
import { Session } from "next-auth";
import { useLocale, useTranslations } from "next-intl";

/**
 * contractCard Component
 * Displays a card with detailed information about a contract.
 * Includes a link to the detailed view of the contract.
 *
 * @param {Object} props - The props object.
 * @param {contract} props.contract - The contract object to be displayed.
 *
 * @returns {JSX.Element} The card displaying the contract details.
 */
const ContractCard: FC<{ contract: Contract; session: Session }> = ({
  contract,
  session,
}) => {
  // Translation function for internationalization
  const t = useTranslations("Index");
  const lang = useLocale();

  return (
    <Card className="bg-card/50 hover:bg-card/80 duration-200 border-card-foreground/0 w-full rounded-2xl h-28 ">
      <CardContent className={cn("flex items-center justify-between p-5")}>
        <div className="flex gap-3">
          <Avatar className="size-[74px]">
            <AvatarImage
              src={
                "podcaster" in contract
                  ? contract?.podcaster?.image
                  : contract?.company?.image
              }
              alt={
                "podcaster" in contract
                  ? contract?.podcaster?.full_name
                  : contract?.company?.full_name
              }
              className="object-cover"
            />
            <AvatarFallback className="bg-greeny_lighter  text-black font-bold">
              {"podcaster" in contract
                ? contract.podcaster.full_name.slice(0, 2).toUpperCase()
                : contract.company.full_name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-2xl capitalize">
                {"podcaster" in contract
                  ? contract.podcaster.full_name
                  : contract.company.full_name}
              </h2>
              <p className="text-muted-foreground text-sm">
                {format(new Date(contract.created_at), "d MMM yyyy")}
              </p>
            </div>
            <p className="text-greeny capitalize text-sm">
              {contract?.advertising_section?.name[lang as "ar" | "en"]}
            </p>
            <p className="text-primary capitalize text-sm">
              {contract?.advertising_section?.type?.name[lang as "ar" | "en"]}
            </p>
          </div>
        </div>
        <div className="flex h-full items-center justify-end gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVerticalIconKnotify strokeWidth={3} className="size-6" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* {session?.user?.type === "podcaster" && (
                  <>
                    <DropdownMenuItem>
                      <Link
                        href={`/&${session?.user?.type}/chats`}
                        className="flex items-center gap-2 capitalize"
                      >
                        <CirclePlusIcon size={16} strokeWidth={2.5} />
                        {t("new-publish")}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />{" "}
                  </>
                )} */}
              <DropdownMenuItem>
                <Link
                  href={`/&${session?.user?.type}/chats`}
                  className="flex items-center gap-2 capitalize"
                >
                  <MessageCircleMoreIcon size={16} strokeWidth={2.5} />
                  {t("chat")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link
                  href={`contracts/${contract?.id}`}
                  className="flex items-center gap-2 capitalize"
                >
                  <ScrollTextIcon size={16} strokeWidth={2.5} />
                  {t("view-contract")}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* {contract?.status} */}
        {/* {contract?.status_translation !== "Pending" ? (
            <div className="flex h-full items-end justify-end gap-4">
              <Link
                href={`/&${session?.user?.type}/chats`}
                className={cn(
                  buttonVariants({
                    variant: "secondary",
                    className:
                      "font-bold bg-greeny_lighter text-secondary hover:text-foreground rounded-full px-6 py-3 gap-2 items-center w-36 h-11",
                  })
                )}
              >
                <MessageCircleMoreIcon size={20} />
                {t("chat")}
              </Link>
            </div>
          ) : contract?.status_translation === "Pending" &&
            session?.user?.type === "podcaster" ? (
            <div className="flex h-full items-center justify-end gap-4"></div>
          ) : contract?.status_translation === "Pending" &&
            session?.user?.type === "company" ? (
            <div className="flex h-full items-center justify-end gap-4"></div>
          ) : null} */}
      </CardContent>
    </Card>
  );
};

export default ContractCard;
