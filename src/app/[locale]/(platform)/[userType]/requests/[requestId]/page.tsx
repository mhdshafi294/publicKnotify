import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import { format } from "date-fns";
import Image from "next/image";
import { Link, redirect } from "@/navigation";
import {
  CalendarClockIcon,
  CircleDollarSignIcon,
  Clock4Icon,
  MessagesSquareIcon,
  ReplaceAllIcon,
  RouterIcon,
} from "lucide-react";

import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import { getRequestAction } from "@/app/actions/requestsActions";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ChangeRequestStatusButton from "./_components/change-request-status-button";
import { useLocale } from "next-intl";
import { cn, getDirection } from "@/lib/utils";
import CancelRequestButton from "./_components/cancel-request-button";
import { buttonVariants } from "@/components/ui/button";

/**
 * RequestPage Component
 * Displays details of a specific request including its status, type, cost, and related media.
 * Provides functionality for status changes based on user type.
 *
 * @param {Object} params - Route parameters containing locale, userType, and requestId.
 * @returns {JSX.Element} The request details view.
 */
export default async function RequestPage({
  params,
}: {
  params: { locale: string; userType: string; requestId: string };
}) {
  // Fetch session and handle redirection based on user type
  const session = await getServerSession(authOptions);
  if (session?.user?.type === "user") {
    redirect(`/user`);
  }

  redirect(session?.user?.type!);

  // Fetch translations
  const t = await getTranslations("Index");

  // Construct search parameters for potential use
  const searchParams = new URLSearchParams({ request_id: params?.requestId });

  // Fetch request details based on requestId and userType
  const requestsResponse = await getRequestAction({
    id: params?.requestId,
    type: session?.user?.type!,
  });
  const request = requestsResponse.request;

  // Get locale and direction for styling
  const locale = useLocale();
  const direction = getDirection(locale);

  return (
    <main className="flex flex-col flex-1 items-center justify-center gap-6 w-full">
      <MaxWidthContainer>
        <Card className="bg-card/50 border-card-foreground/10 w-full min-h-[50dvh] lg:px-7 lg:py-3">
          <CardHeader>
            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <CardTitle className="capitalize">{request.name}</CardTitle>
                <CardDescription>
                  <span className="capitalize text-base text-card-foreground">
                    {request.company
                      ? request.company?.full_name
                      : request.podcaster?.full_name}{" "}
                  </span>
                  {request.company_tag}
                </CardDescription>
              </div>
              <div className="text-xs rounded bg-card-foreground text-card px-1.5 py-1 cursor-default font-semibold">
                {request.status}
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col gap-2 me-8 overflow-hidden">
              <ScrollArea className="w-full whitespace-nowrap" dir={direction}>
                <div className="flex w-max gap-2 pb-3">
                  {request.hashTags.map((hashTag) => (
                    <div
                      key={hashTag.id}
                      className="shrink-0 text-sm bg-greeny_lighter/30 text-greeny px-3 py-1 font-semibold rounded-lg cursor-default"
                    >
                      #{hashTag.name}
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="h-1.5" />
              </ScrollArea>
              <div className="flex gap-2 items-center text-sm">
                <span className="text-xs text-muted-foreground">
                  {t("type")}
                </span>
                {request.type}
              </div>
              <div className="flex gap-4 text-xs">
                <div className="flex gap-1 items-center text-sm">
                  <span className="text-xs text-muted-foreground me-3">
                    {t("ad")}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    <ReplaceAllIcon size={14} />
                  </span>
                  {request.ad_place === "first"
                    ? t("atTheBeginning")
                    : request.ad_place}
                </div>
                <div className="flex gap-1 items-center text-sm">
                  <span className="text-xs text-muted-foreground">
                    <CircleDollarSignIcon size={14} />
                  </span>
                  ${request.ad_cost}
                </div>
                <div className="flex gap-1 items-center text-sm">
                  <span className="text-xs text-muted-foreground">
                    <Clock4Icon size={14} />
                  </span>
                  {request.ad_period}
                </div>
              </div>
              <CardDescription className="text-lg">
                {request.summary}
              </CardDescription>
              <div className="justify-self-end mt-auto flex gap-1 items-center">
                <div className="flex items-center gap-2">
                  <p className="text-xs">{t("publishTimeAt")}</p>{" "}
                  <CalendarClockIcon
                    size={15}
                    className="text-muted-foreground"
                  />
                </div>
                <span className="text-muted-foreground text-sm">
                  {format(
                    new Date(
                      `${request.publishing_date} ${request.publishing_time}`
                    ),
                    "MMM do, yyyy HH:mm bbb OO"
                  )}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <ScrollArea className="w-full whitespace-nowrap" dir={direction}>
                <div className="flex md:justify-end gap-2 w-full pb-3">
                  {request.categories.map((category) => (
                    <Link
                      href={`/${session?.user?.type}/category/${category.id}`}
                      className="bg-background hover:bg-background/60 flex justify-start items-center border rounded-xl gap-2 px-2.5 py-2 w-fit"
                      key={category.id}
                    >
                      <div className="size-4 relative">
                        <Image
                          fill
                          className="rounded object-contain"
                          src={
                            category.image
                              ? category.image
                              : "/podcast-filler.webp"
                          }
                          alt={category.name}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold capitalize">
                          {category.name}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="h-1.5" />
              </ScrollArea>
              <div className="flex w-full gap-5 justify-between">
                <div className="flex-grow aspect-square w-1/2 relative">
                  <Image
                    fill
                    className="rounded object-cover"
                    src={
                      request.thumbnail
                        ? request.thumbnail
                        : "/podcast-filler.webp"
                    }
                    alt=""
                  />
                </div>
                <div className="flex-grow aspect-square w-1/2 relative">
                  <Image
                    fill
                    className="rounded object-cover"
                    src={
                      request.background
                        ? request.background
                        : "/podcast-filler.webp"
                    }
                    alt=""
                  />
                </div>
              </div>
              <div className="w-full flex flex-col gap-3 mt-5 self-end">
                {session?.user?.type === "podcaster" &&
                request.status.toLowerCase() === "accepted by admin" ? (
                  <div className="flex gap-2 justify-end">
                    <Link
                      href={`/&${session?.user?.type}/chats`}
                      className={cn(
                        buttonVariants({
                          variant: "secondary",
                          className: "gap-2 font-bold",
                        })
                      )}
                    >
                      <MessagesSquareIcon size={14} />
                      {t("chat")}
                    </Link>
                    <ChangeRequestStatusButton
                      requestId={params?.requestId}
                      userType={session?.user?.type!}
                      status="accept"
                    />
                    <ChangeRequestStatusButton
                      requestId={params?.requestId}
                      userType={session?.user?.type!}
                      status="reject"
                    />
                  </div>
                ) : session?.user?.type === "podcaster" &&
                  request.status.toLowerCase() === "accepted by podcaster" ? (
                  <div className="flex gap-2 justify-end">
                    <Link
                      href={`/&${session?.user?.type}/chats`}
                      className={cn(
                        buttonVariants({
                          variant: "secondary",
                          className: "gap-2 font-bold",
                        })
                      )}
                    >
                      <MessagesSquareIcon size={14} />
                      {t("chat")}
                    </Link>
                    <Link
                      href={`/podcaster/shows/1/publish?${searchParams.toString()}`}
                      className={cn(
                        buttonVariants({
                          variant: "default",
                          className: "gap-2 font-bold",
                        })
                      )}
                    >
                      <RouterIcon size={14} />
                      {t("create-podcast")}
                    </Link>
                  </div>
                ) : session?.user?.type === "company" &&
                  request.status.toLowerCase() === "pending" ? (
                  <div className="flex gap-2 justify-end">
                    <Link
                      href={`/&${session?.user?.type}/chats`}
                      className={cn(
                        buttonVariants({
                          variant: "secondary",
                          className: "gap-2 font-bold",
                        })
                      )}
                    >
                      <MessagesSquareIcon size={14} />
                      {t("chat")}
                    </Link>
                    <CancelRequestButton
                      requestId={params?.requestId}
                      userType={"company"}
                    />
                  </div>
                ) : (
                  <div className="flex gap-2 justify-end">
                    <Link
                      href={`/&${session?.user?.type}/chats`}
                      className={cn(
                        buttonVariants({
                          variant: "secondary",
                          className: "gap-2 font-bold",
                        })
                      )}
                    >
                      <MessagesSquareIcon size={14} />
                      {t("chat")}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </MaxWidthContainer>
    </main>
  );
}
