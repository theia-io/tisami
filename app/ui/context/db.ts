"use client";
import { Firestore, getFirestore } from "firebase/firestore";
import { createContext } from "react";
import { firebaseApp } from "../services/firestore-app";

// Initialize Cloud Firestore and get a reference to the service
export let db: Firestore | null;

export const initDB = () => {
  if (db == null) {
    // Initialize Cloud Firestore and get a reference to the service
    db = getFirestore(firebaseApp);
    console.log('INIT DB:', db);
  }

  return db;
};

export const DBContext = createContext<Firestore>(initDB());
