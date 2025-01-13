"use client";
import { Analytics, getAnalytics, isSupported } from "firebase/analytics";
import { firebaseApp } from "../services/firestore-app";

export let analytics: Analytics | null;

const analyticsSupported = await isSupported();

export const initAnalytics = async () => {
  if (analytics == null) {
    if (analyticsSupported) {
      analytics = getAnalytics(firebaseApp);
      console.log("INIT analytics:", analytics);
    } else {
      console.error("Analytics are not supported");
    }
  }

  return analytics;
};

// export const AnalyticsContext = createContext<Analytics>(initAnalytics());
