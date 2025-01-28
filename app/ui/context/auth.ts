"use client";
import {
  getAdditionalUserInfo,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";
import { firebaseApp } from "../services/firestore-app";
import { createContext } from "react";

export const authWithGoogle = () => {
  const provider = new GoogleAuthProvider();

  const auth = getAuth(firebaseApp);
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      const data = getAdditionalUserInfo(result);
      console.log("User:", user, "Token:", token, "Data:", data);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);

      console.log(
        "Error Code:",
        errorCode,
        "Error Message:",
        errorMessage,
        "Email:",
        email,
        "Credential:",
        credential
      );
    });
};



export const UserContext = createContext<User | null>(null);
