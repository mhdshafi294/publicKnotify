importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDSMK6qQ0jha771m4M_kK8HAvIu-lTZ1Us",
  authDomain: "podcasts-99839.firebaseapp.com",
  projectId: "podcasts-99839",
  storageBucket: "podcasts-99839.appspot.com",
  messagingSenderId: "1045424594",
  appId: "1:1045424594:web:40f8da902f5a6de311000b",
  measurementId: "G-L7B58YNL3P",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
