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
  apiKey: "AIzaSyA0G-ufUrELmK2psEMIId6M2jWowXciiH8",
  authDomain: "knotify-20518.firebaseapp.com",
  projectId: "knotify-20518",
  storageBucket: "knotify-20518.appspot.com",
  messagingSenderId: "21990148156",
  appId: "1:21990148156:web:8262912bce2889da605b39",
  measurementId: "G-ZQWPVKECLV",
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
        vapidKey: "YOUR_VAPID_KEY_HERE", // replace with your VAPID key
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
