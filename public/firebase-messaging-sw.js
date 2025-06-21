// This file should be in the public directory

importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

// Parse config from URL query string
const urlParams = new URLSearchParams(self.location.search);
const firebaseConfig = Object.fromEntries(urlParams.entries());

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image || "/placeholder-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
}); 