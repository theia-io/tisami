"use client";
import { Analytics, getAnalytics } from "firebase/analytics";
import { firebaseApp } from "../services/firestore-app";
import { createContext } from "react";

export let analytics: Analytics | null;

export const initAnalytics = () => {
  if (analytics == null) {
    analytics = getAnalytics(firebaseApp);
    console.log("INIT analytics:", analytics);
  }

  return analytics;
};
export const AnalyticsContext = createContext<Analytics>(initAnalytics());
