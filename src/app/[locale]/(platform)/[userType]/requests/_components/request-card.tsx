import { MessageCircleMoreIcon, MessagesSquareIcon } from "lucide-react";
import { FC } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { Request } from "@/types/request";
import { format } from "date-fns";
import { useLocale, useTranslations } from "next-intl";

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
const RequestCard: FC<{ request: Request; type: string }> = ({
  request,
  type,
}) => {
  // Translation function for internationalization
  const t = useTranslations("Index");
  const lang = useLocale();

  return (
    <Card className="bg-card/50 hover:bg-card/80 duration-200 border-card-foreground/0 w-full rounded-2xl h-28 ">
      <CardContent className="flex items-end justify-between p-5">
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
        <div className="flex h-full items-end">
          <Link
            href={`/&${type}/chats`}
            className={cn(
              buttonVariants({
                variant: "secondary",
                className:
                  "font-bold bg-greeny_lighter text-secondary hover:text-foreground rounded-full px-6 py-3 gap-2 items-center",
              })
            )}
          >
            <MessageCircleMoreIcon size={20} />
            {t("chat")}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default RequestCard;
