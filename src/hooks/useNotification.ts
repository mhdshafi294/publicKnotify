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
            vapidKey:
              "BEiNGMt9FADp7mzukiPMsqDUvDmyz1KLkMHR38Od36OxlzPQ5GDpGSW9p8ESsAFKLFgNb-9X26O7ubjJ0SuPtLA",
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
