"use client";

import { useEffect } from "react";
import { messaging, getToken, onMessage } from "@/lib/firebaseConfig";
import { toast } from "sonner";

/**
 * Custom hook that handles Firebase Cloud Messaging (FCM) notifications.
 *
 * @example
 * ```tsx
 * useNotification();
 * ```
 */
export const useNotification = () => {
  useEffect(() => {
    if (!messaging) {
      console.log("Firebase messaging is not initialized");
      return;
    }

    /**
     * Requests notification permission from the user and retrieves the FCM token.
     */
    const requestPermission = async () => {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        try {
          const token = await getToken(messaging!, {
            // add non-null assertion
            vapidKey:
              "BEiNGMt9FADp7mzukiPMsqDUvDmyz1KLkMHR38Od36OxlzPQ5GDpGSW9p8ESsAFKLFgNb-9X26O7ubjJ0SuPtLA",
          });
          // console.log("FCM Token:", token);
        } catch (error) {
          console.error("Failed to get FCM token:", error);
        }
      } else {
        console.log("Notification permission denied");
      }
    };

    // Request notification permission and get the FCM token
    requestPermission();

    /**
     * Handles incoming FCM messages.
     *
     * @param {object} payload - The message payload received from FCM.
     */
    const handleMessage = (payload: any) => {
      console.log("Message received. ", payload);
      toast(payload.notification.title, {
        description: payload.notification.body,
      });
    };

    // Listen for incoming FCM messages
    onMessage(messaging!, handleMessage); // add non-null assertion
  }, []);
};
