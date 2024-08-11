"use client";

import { ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";

import {
  requestNotificationPermission,
  onMessageListener,
} from "@/lib/firebaseConfig";
import { toast } from "sonner";
import { MessagePayload } from "firebase/messaging";
import { enableNotificationsAction } from "@/app/actions/notificationActions";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import useNotificationStore from "@/store/use-notification-store";

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
  const { data: session } = useSession();
  const plusOneUnreadNotifications = useNotificationStore(
    (state) => state.plusOneUnread
  );

  const fpPromise = FingerprintJS.load();

  useEffect(() => {
    /**
     * Function to request notification permission and subscribe to FCM messages.
     */
    const getTokenAndSubscribe = async () => {
      const token = await requestNotificationPermission();
      if (token && session?.user?.type) {
        // console.log("FCM Token:", token, "provider");
        const fp = await fpPromise;
        const result = await fp.get();
        try {
          await enableNotificationsAction({
            device_token: token,
            agent: result.visitorId,
            type: session?.user?.type,
          });
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
        console.log(payload);
        if (payload && payload.notification) {
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
  }, [session]);

  return <>{children}</>;
};

export default NotificationProvider;
