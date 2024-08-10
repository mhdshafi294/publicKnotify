"use client";

import { ReactNode, useEffect } from "react";
import {
  requestNotificationPermission,
  onMessageListener,
} from "@/lib/firebaseConfig";
import { toast } from "sonner";
import { MessagePayload } from "firebase/messaging";

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
  useEffect(() => {
    /**
     * Function to request notification permission and subscribe to FCM messages.
     */
    const getTokenAndSubscribe = async () => {
      const token = await requestNotificationPermission();
      if (token) {
        // console.log("FCM Token:", token);
      }
    };

    // Request permission and subscribe to FCM messages
    getTokenAndSubscribe();

    // Listen for incoming FCM messages
    onMessageListener()
      .then((payload: MessagePayload) => {
        if (payload && payload.notification) {
          toast(payload.notification.title, {
            description: payload.notification.body,
            action: {
              label: "View",
              onClick: () => console.log("View Notification"),
            },
          });
        }
      })
      .catch((err) => console.log("Failed to receive message: ", err));
  }, []);

  return <>{children}</>;
};

export default NotificationProvider;
