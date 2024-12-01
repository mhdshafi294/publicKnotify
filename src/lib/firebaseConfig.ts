// import { initializeApp } from "firebase/app";
// import {
//   getMessaging,
//   getToken as firebaseGetToken,
//   onMessage as firebaseOnMessage,
//   Messaging,
//   MessagePayload,
// } from "firebase/messaging";
// import Env from "./env";

// // Firebase configuration object
// const firebaseConfig = {
//   // apiKey: Env.FIREBASE_API_KEY,
//   apiKey: "AIzaSyDSMK6qQ0jha771m4M_kK8HAvIu-lTZ1Us",
//   // authDomain: Env.FIREBASE_AUTH_DOMAIN,
//   authDomain: "podcasts-99839.firebaseapp.com",
//   // projectId: Env.FIREBASE_PROJECT_ID,
//   projectId: "podcasts-99839",
//   // storageBucket: Env.FIREBASE_STORAGE_BUCKET,
//   storageBucket: "podcasts-99839.appspot.com",
//   // messagingSenderId: Env.FIREBASE_MESSAGING_SENDER_ID,
//   messagingSenderId: "1045424594",
//   // appId: Env.FIREBASE_APP_ID,
//   appId: "1:1045424594:web:40f8da902f5a6de311000b",
//   measurementId: "G-L7B58YNL3P",
// };

// // Initialize Firebase app
// const app = initializeApp(firebaseConfig);

// // Initialize Firebase Cloud Messaging
// let messaging: Messaging | null = null;
// if (typeof window !== "undefined") {
//   messaging = getMessaging(app);
// }

// /**
//  * Retrieves the Firebase Cloud Messaging (FCM) token.
//  *
//  * @param {Messaging} messaging - The messaging instance.
//  * @param {object} [options] - Optional options for retrieving the token.
//  * @returns {Promise<string>} The FCM token.
//  */
// const getToken = async (messaging: Messaging, options?: any) => {
//   return firebaseGetToken(messaging, options);
// };

// /**
//  * Sets up an onMessage listener for receiving FCM messages.
//  *
//  * @param {Messaging} messaging - The messaging instance.
//  * @param {function} nextOrObserver - The callback function to handle the message payload.
//  * @returns {function} The unsubscribe function to stop listening for messages.
//  */
// const onMessage = (
//   messaging: Messaging,
//   nextOrObserver: (payload: MessagePayload) => void
// ) => {
//   return firebaseOnMessage(messaging, nextOrObserver);
// };

// /**
//  * Requests notification permission from the user and retrieves the FCM token.
//  *
//  * @returns {Promise<string|null>} The FCM token or null if permission is denied or an error occurs.
//  */
// export const requestNotificationPermission = async () => {
//   if (typeof window === "undefined" || !messaging) {
//     return null;
//   }

//   try {
//     const registration = await navigator.serviceWorker.register(
//       "/firebase-messaging-sw.js"
//     );

//     const permission = await Notification.requestPermission();
//     if (permission === "granted") {
//       const token = await getToken(messaging, {
//         vapidKey:
//           "BEiNGMt9FADp7mzukiPMsqDUvDmyz1KLkMHR38Od36OxlzPQ5GDpGSW9p8ESsAFKLFgNb-9X26O7ubjJ0SuPtLA",
//         // vapidKey: Env.FIREBASE_VAPID_KEY,

//         serviceWorkerRegistration: registration,
//       });
//       // console.log("FCM Token:", token);
//       return token;
//     } else {
//       console.log("Notification permission denied");
//       return null;
//     }
//   } catch (error) {
//     console.error(
//       "Service Worker registration or notification permission request failed:",
//       error
//     );
//     return null;
//   }
// };

// /**
//  * Sets up a listener for receiving FCM messages.
//  *
//  * @returns {Promise<MessagePayload>} A promise that resolves with the message payload.
//  */
// export const onMessageListener = () =>
//   new Promise<MessagePayload>((resolve, reject) => {
//     if (!messaging) {
//       return reject("Firebase messaging is not initialized");
//     }
//     onMessage(messaging, (payload: MessagePayload) => {
//       console.log("Message received. ", payload);
//       resolve(payload);
//     });
//   });

// export { messaging, getToken, onMessage };
