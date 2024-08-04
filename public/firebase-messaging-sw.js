importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyA0G-ufUrELmK2psEMIId6M2jWowXciiH8",
  authDomain: "knotify-20518.firebaseapp.com",
  projectId: "knotify-20518",
  storageBucket: "knotify-20518.appspot.com",
  messagingSenderId: "21990148156",
  appId: "1:21990148156:web:8262912bce2889da605b39",
  measurementId: "G-ZQWPVKECLV",
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
