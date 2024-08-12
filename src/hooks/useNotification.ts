"use client";

import { useEffect } from "react";
import { messaging, getToken, onMessage } from "@/lib/firebaseConfig";
import { toast } from "sonner";
import Env from "@/lib/env";

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
            vapidKey: Env.FIREBASE_VAPID_KEY,
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
