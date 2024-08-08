importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js"
);

// Initialize Firebase app with the provided configuration
firebase.initializeApp({
  apiKey: "AIzaSyDSMK6qQ0jha771m4M_kK8HAvIu-lTZ1Us",
  authDomain: "podcasts-99839.firebaseapp.com",
  projectId: "podcasts-99839",
  storageBucket: "podcasts-99839.appspot.com",
  messagingSenderId: "1045424594",
  appId: "1:1045424594:web:40f8da902f5a6de311000b",
  measurementId: "G-L7B58YNL3P",
});

// Get a Firebase Cloud Messaging instance
const messaging = firebase.messaging();

/**
 * Event listener for handling background messages received through FCM.
 * This function is triggered when a message is received while the app is in the background.
 *
 * @param {object} payload - The message payload received from FCM.
 */
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  };

  // Show notification to the user
  self.registration.showNotification(notificationTitle, notificationOptions);
});
