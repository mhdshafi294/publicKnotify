// "use client";

// import { useEffect } from "react";
// import { Fragment } from "react/jsx-runtime";
// import { add, formatDistanceToNow } from "date-fns";

// import Loader from "@/components/ui/loader";
// import { Separator } from "@/components/ui/separator";
// import { cn, getTimeZoneOffsetInHours } from "@/lib/utils";
// import { PopoverClose } from "@radix-ui/react-popover";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { buttonVariants } from "@/components/ui/button";
// import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
// import useNotificationStore from "@/store/use-notification-store";

// const NotificationContent = () => {
//   const { isIntersecting, ref } = useIntersectionObserver({
//     threshold: 0,
//   });
//   const setIsNotificationOpen = useNotificationStore(
//     (state) => state.setIsOpen
//   );

//   // const {
//   //   data,
//   //   isPending,
//   //   isError,
//   //   fetchNextPage,
//   //   hasNextPage,
//   //   isFetchingNextPage,
//   // } = useGetNotifications();

//   return (
//     <ScrollArea className="h-full px-4 pe-5" dir={dir}>
//       {isPending
//         ? "loading"
//         : isError
//         ? "error"
//         : data.pages.map((page) =>
//             page.notifications.map((notification) => {
//               let action: () => void;
//               if (notification.related_type.includes("conversation")) {
//                 action = () => {
//                   navigate("/messages");
//                 };
//               } else if (notification.related_type.includes("event")) {
//                 action = () => {
//                   navigate("/events");
//                 };
//               } else if (notification.related_type.includes("file")) {
//                 action = async () => {
//                   const file_id = notification.related_id;
//                   try {
//                     const data = await showFileIDs(file_id);
//                     console.log(data);
//                     if (data.folder_id) {
//                       setIsNotificationOpen(false);
//                       navigate(
//                         `${data.user_id}/documents?display=grid&folder_id=${data.folder_id}`
//                       );
//                     } else if (data.project_id) {
//                       setIsNotificationOpen(false);
//                       navigate(
//                         `${data.user_id}/documents?project_id=${data.project_id}&display=grid`
//                       );
//                     } else {
//                       setIsNotificationOpen(false);
//                       navigate(`${data.user_id}/documents?display=grid`);
//                     }
//                   } catch (err) {
//                     const isOpen = err ? true : false;
//                     setIsNotificationOpen(false);
//                     setIsFileDeleted(isOpen);
//                   }
//                 };
//               } else {
//                 action = () => {};
//               }
//               return (
//                 <Fragment key={notification.id}>
//                   <PopoverClose asChild>
//                     <button
//                       onClick={() => action()}
//                       className={cn(
//                         buttonVariants({
//                           variant: "ghost",
//                           size: "sm",
//                         }),
//                         "flex flex-col justify-start items-start gap-0.5 py-1.5 px-0 rounded-none w-full"
//                       )}
//                     >
//                       <span className="line-clamp-1 capitalize font-bold text-sm whitespace-pre-line text-start">
//                         {notification.title}
//                       </span>
//                       <span className="line-clamp-3 text-xs whitespace-pre-line text-start">
//                         {notification.body}
//                       </span>
//                       <span className="flex text-[10px] text-primary/80 w-full text-start">
//                         {formatDistanceToNow(
//                           add(new Date(notification.created_at), {
//                             hours: getTimeZoneOffsetInHours(),
//                           }),
//                           {
//                             includeSeconds: true,
//                           }
//                         )}
//                       </span>
//                     </button>
//                   </PopoverClose>
//                   <Separator />
//                 </Fragment>
//               );
//             })
//           )}

//       <div className="w-full h-2" ref={ref} />
//       {isFetchingNextPage ? (
//         <div className="w-full flex justify-center items-center text-primary py-2">
//           <Loader />
//         </div>
//       ) : null}
//     </ScrollArea>
//   );
// };

// export default NotificationContent;
