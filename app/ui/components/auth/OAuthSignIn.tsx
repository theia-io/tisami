"use client";

import { Button } from "@mui/material";
import { signIn } from "next-auth/react";
import { useState } from "react";

const OAuthSignIn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={loginWithGoogle}
      aria-label="Sign in with google"
      className="w-full bg-background sm:w-auto"
    >
      Google
    </Button>
  );
};

export default OAuthSignIn;
