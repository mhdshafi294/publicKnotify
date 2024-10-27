import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
// import { useReadLocalStorage } from "@/hooks/use-read-local-storge";
import { useState } from "react";

import useCurrentUser from "@/store/use-current-user";
import ButtonLoader from "@/components/ui/button-loader";
import { useLocale, useTranslations } from "next-intl";
import { getDirection } from "@/lib/utils";
import { requestNotificationPermission } from "@/lib/firebaseConfig";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toggleNotificationsAction } from "@/app/actions/notificationActions";

const ActiveGetDesktopNotificationModal = () => {
  const { data: user } = useSession();
  const locale = useLocale();
  const dir = getDirection(locale);
  const t = useTranslations("Index");
  const [openModal, setOpenModal] = useState(true);
  const setUserActiveNotification = useCurrentUser(
    (state) => state.setUserActiveNotification
  );
  const userActiveNotification = useCurrentUser(
    (state) => state.UserActiveNotification
  );
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (token: string) => {
      await toggleNotificationsAction({
        device_token: token,
        type: user?.user?.type!,
      });
    },
  });
  // const activeGetDesktopNotification = useReadLocalStorage(
  //   "showing-desktop-notification-modal"
  // );

  const closeModal = async () => {
    setOpenModal(false);
    // localStorage.setItem("showing-desktop-notification-modal", "true");
    // try {
    //   await toggleEnableNotifications(0);
    //   setUserActiveNotification(0);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  if (userActiveNotification !== null) return null;
  return (
    <Dialog
      open={openModal}
      onOpenChange={() => {
        setOpenModal(false);
      }}
    >
      <DialogContent
        dir={dir}
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{t("notifications.active-notifications")}</DialogTitle>
          <DialogDescription>
            {t("notifications.active-notifications-description")}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={closeModal} variant="outline">
              {t("global.close")}
            </Button>
          </DialogClose>
          <Button
            disabled={isPending}
            onClick={async () => {
              try {
                if (userActiveNotification === null) {
                  const token = await requestNotificationPermission();
                  if (token)
                    await mutateAsync(token, {
                      onSuccess: async () => {
                        setOpenModal(false);
                        setUserActiveNotification(1);
                      },
                    });
                }
              } catch (error) {
                console.log(error);
              }
            }}
            className="rounded-full"
            variant="default"
          >
            {isPending ? <ButtonLoader /> : t("global.active")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ActiveGetDesktopNotificationModal;
