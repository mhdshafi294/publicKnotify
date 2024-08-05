// app/hooks/useNotification.ts
"use client";

import { useEffect } from "react";
import { messaging, getToken, onMessage } from "@/lib/firebaseConfig";
import { toast } from "sonner";

export const useNotification = () => {
  useEffect(() => {
    if (!messaging) {
      console.log("Firebase messaging is not initialized");
      return;
    }

    const requestPermission = async () => {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        try {
          const token = await getToken(messaging!, {
            // add non-null assertion
            vapidKey: "YOUR_VAPID_KEY_HERE", // replace with your VAPID key
          });
          console.log("FCM Token:", token);
        } catch (error) {
          console.error("Failed to get FCM token:", error);
        }
      } else {
        console.log("Notification permission denied");
      }
    };

    requestPermission();

    const handleMessage = (payload: any) => {
      console.log("Message received. ", payload);
      toast(payload.notification.title, {
        description: payload.notification.body,
      });
    };

    onMessage(messaging!, handleMessage); // add non-null assertion
  }, []);
};
