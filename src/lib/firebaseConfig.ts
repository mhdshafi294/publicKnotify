import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken as firebaseGetToken,
  onMessage as firebaseOnMessage,
  Messaging,
  MessagePayload,
} from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSMK6qQ0jha771m4M_kK8HAvIu-lTZ1Us",
  authDomain: "podcasts-99839.firebaseapp.com",
  projectId: "podcasts-99839",
  storageBucket: "podcasts-99839.appspot.com",
  messagingSenderId: "1045424594",
  appId: "1:1045424594:web:40f8da902f5a6de311000b",
  measurementId: "G-L7B58YNL3P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging
let messaging: Messaging | null = null;
if (typeof window !== "undefined") {
  messaging = getMessaging(app);
}

const getToken = async (messaging: Messaging, options?: any) => {
  return firebaseGetToken(messaging, options);
};

const onMessage = (
  messaging: Messaging,
  nextOrObserver: (payload: MessagePayload) => void
) => {
  return firebaseOnMessage(messaging, nextOrObserver);
};

export const requestNotificationPermission = async () => {
  if (typeof window === "undefined" || !messaging) {
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BEiNGMt9FADp7mzukiPMsqDUvDmyz1KLkMHR38Od36OxlzPQ5GDpGSW9p8ESsAFKLFgNb-9X26O7ubjJ0SuPtLA",
        serviceWorkerRegistration: registration,
      });
      console.log("FCM Token:", token);
      return token;
    } else {
      console.log("Notification permission denied");
      return null;
    }
  } catch (error) {
    console.error(
      "Service Worker registration or notification permission request failed:",
      error
    );
    return null;
  }
};

export const onMessageListener = () =>
  new Promise<MessagePayload>((resolve, reject) => {
    if (!messaging) {
      return reject("Firebase messaging is not initialized");
    }
    onMessage(messaging, (payload: MessagePayload) => {
      console.log("Message received. ", payload);
      resolve(payload);
    });
  });

export { messaging, getToken, onMessage };
