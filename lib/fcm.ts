import { getMessaging, getToken, isSupported } from "firebase/messaging";
import { app } from "@/lib/firebase";

export async function requestNotificationPermission(): Promise<string | null> {
  if (!(await isSupported())) {
    alert("Push notifications are not supported in this browser.");
    return null;
  }
  try {
    const messaging = getMessaging(app);
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      alert("Notification permission denied.");
      return null;
    }
    const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
    if (!vapidKey) {
      alert("VAPID key not found. Please set NEXT_PUBLIC_FIREBASE_VAPID_KEY in your .env.local file.");
      return null;
    }
    const token = await getToken(messaging, {
      vapidKey,
      serviceWorkerRegistration: await navigator.serviceWorker.ready,
    });
    if (token) {
      console.log("Successfully got FCM token:", token);
      return token;
    } else {
      alert("Failed to get FCM token.");
      return null;
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
    alert("Error getting FCM token. See console for details.");
    return null;
  }
} 