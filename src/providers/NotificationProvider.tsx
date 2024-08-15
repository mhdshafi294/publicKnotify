"use client";

import { ReactNode, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  requestNotificationPermission,
  onMessageListener,
} from "@/lib/firebaseConfig";
import { toast } from "sonner";
import { MessagePayload } from "firebase/messaging";
import { toggleNotificationsAction } from "@/app/actions/notificationActions";
import useNotificationStore from "@/store/use-notification-store";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

// Explicitly define the type for FingerprintJS Agent
type FingerprintJSAgent = import("@fingerprintjs/fingerprintjs").Agent;

// Lazy load FingerprintJS on the client side
const loadFingerprintJS = async (): Promise<FingerprintJSAgent | null> => {
  if (typeof window !== "undefined") {
    const FingerprintJS = await import("@fingerprintjs/fingerprintjs");
    return FingerprintJS.load();
  }
  return null;
};

/**
 * Props for the NotificationProvider component.
 */
interface NotificationProviderProps {
  /**
   * The child components to be rendered inside the provider.
   */
  children: ReactNode;
}

/**
 * NotificationProvider component that handles Firebase Cloud Messaging (FCM) notifications.
 *
 * @param {NotificationProviderProps} props - The properties passed to the component.
 * @returns {JSX.Element} The provider component that wraps its children with notification capabilities.
 *
 * @example
 * ```tsx
 * <NotificationProvider>
 *   <App />
 * </NotificationProvider>
 * ```
 */
const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const t = useTranslations("Index");

  const { data: session, update: updateSession } = useSession();
  const plusOneUnreadNotifications = useNotificationStore(
    (state) => state.plusOneUnread
  );
  const isEnabled = useNotificationStore((state) => state.isEnabled);
  const setIsEnabled = useNotificationStore((state) => state.setIsEnabled);

  const [fpPromise, setFpPromise] =
    useState<Promise<FingerprintJSAgent | null> | null>(null);

  // Mutation for updating user profile
  const { mutate: server_toggleNotificationsAction, isPending } = useMutation({
    mutationFn: toggleNotificationsAction,
    onSuccess: async () => {
      toast.success(t("notificationsUpdated"));
      await updateSession({
        ...session?.user,
        is_notification_enabled: true,
      });
      setIsEnabled(true);
    },
    onError: (error) => {
      console.log(error.message);
      toast.error(t("notificationsUpdateFailed"));
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Load FingerprintJS only on the client side
      const fp = loadFingerprintJS();
      setFpPromise(fp);
    }

    /**
     * Function to request notification permission and subscribe to FCM messages.
     */
    const getTokenAndSubscribe = async () => {
      const token = await requestNotificationPermission();
      if (token && session?.user?.type && fpPromise) {
        try {
          const fp = await fpPromise;
          if (fp && !session?.user?.is_notification_enabled) {
            const result = await fp.get();
            server_toggleNotificationsAction({
              device_token: token,
              agent: result.visitorId,
              type: session?.user?.type,
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    // Request permission and subscribe to FCM messages
    getTokenAndSubscribe();

    // Listen for incoming FCM messages
    onMessageListener()
      .then((payload: MessagePayload) => {
        if (payload?.notification) {
          toast(payload.notification.title, {
            description: payload.notification.body,
            action: {
              label: "View",
              onClick: () => console.log("View Notification"),
            },
          });
          plusOneUnreadNotifications();
        }
      })
      .catch((err) => console.log("Failed to receive message: ", err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.is_notification_enabled]);

  return <>{children}</>;
};

export default NotificationProvider;
