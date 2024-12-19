"use client";

import { MessageCircleMoreIcon } from "lucide-react";
import { FC } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { Request } from "@/types/request";
import { format } from "date-fns";
import { useLocale, useTranslations } from "next-intl";
import ChangeRequestStatusButton from "../[requestId]/_components/change-request-status-button";

/**
 * RequestCard Component
 * Displays a card with detailed information about a request.
 * Includes a link to the detailed view of the request.
 *
 * @param {Object} props - The props object.
 * @param {Request} props.request - The request object to be displayed.
 *
 * @returns {JSX.Element} The card displaying the request details.
 */
const RequestCard: FC<{ request: Request; userType: string }> = ({
  request,
  userType,
}) => {
  // Translation function for internationalization
  const t = useTranslations("Index");
  const lang = useLocale();

  return (
    <Card className="bg-card/50 hover:bg-card/80 duration-200 border-card-foreground/0 w-full rounded-2xl h-28 ">
      <CardContent
        className={cn("flex items-center justify-between p-5", {
          "items-end": request.status !== "Pending",
        })}
      >
        <div className="flex gap-3">
          <Avatar className="size-[74px]">
            <AvatarImage
              src={
                "podcaster" in request
                  ? request.podcaster.image
                  : request.company.image
              }
              alt={
                "podcaster" in request
                  ? request.podcaster.full_name
                  : request.company.full_name
              }
              className="object-cover"
            />
            <AvatarFallback className="bg-greeny_lighter  text-black font-bold">
              {"podcaster" in request
                ? request.podcaster.full_name.slice(0, 2).toUpperCase()
                : request.company.full_name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-2xl capitalize">
                {"podcaster" in request
                  ? request.podcaster.full_name
                  : request.company.full_name}
              </h2>
              <p className="text-muted-foreground text-sm">
                {format(new Date(request.created_at), "d MMM yyyy")}
              </p>
            </div>
            <p className="text-greeny capitalize text-sm">{request?.type}</p>
            <p className="text-primary capitalize text-sm">
              {request?.advertising_section?.type?.name[lang as "ar" | "en"]}
            </p>
          </div>
        </div>
        {/* {request?.status} */}
        {request?.status !== "Pending" ? (
          <div className="flex h-full items-end justify-end gap-4">
            <Link
              href={`/&${userType}/chats`}
              className={cn(
                buttonVariants({
                  variant: "secondary",
                  className:
                    "font-bold bg-greeny text-secondary hover:bg-greeny_lighter rounded-full gap-2 items-center text-sm px-5 capitalize",
                })
              )}
            >
              <MessageCircleMoreIcon size={16} />
              {t("open")} {t("chat")}
            </Link>
          </div>
        ) : request?.status === "Pending" && userType === "podcaster" ? (
          <div className="flex h-full items-center justify-end gap-4">
            <ChangeRequestStatusButton
              requestId={request?.id.toString()}
              userType={userType}
              status="accept"
            />
            <ChangeRequestStatusButton
              requestId={request?.id.toString()}
              userType={userType}
              status="reject"
            />
          </div>
        ) : request?.status === "Pending" && userType === "company" ? (
          <div className="flex h-full items-center justify-end gap-4">
            <ChangeRequestStatusButton
              requestId={request?.id.toString()}
              userType={userType}
              status="cancel"
            />
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default RequestCard;
