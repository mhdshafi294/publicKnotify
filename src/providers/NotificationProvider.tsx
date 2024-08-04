"use client";

import { ReactNode, useEffect } from "react";
import {
  requestNotificationPermission,
  onMessageListener,
} from "@/lib/firebaseConfig";
import { toast } from "sonner";
import { MessagePayload } from "firebase/messaging";

interface NotificationProviderProps {
  children: ReactNode;
}

const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  useEffect(() => {
    const getTokenAndSubscribe = async () => {
      const token = await requestNotificationPermission();
      if (token) {
        console.log("FCM Token:", token);
      }
    };

    getTokenAndSubscribe();

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
