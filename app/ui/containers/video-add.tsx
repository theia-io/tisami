"use client";
import { addHomeVideo } from "@/app/lib/api";
import { DBContext } from "@/app/lib/context";
import { Button } from "@mui/material";
import { useContext } from "react";

export function AddVideo() {
  const db = useContext(DBContext);
  
  const addVideoHandler = async () => {
    const addedVideo = await addHomeVideo(db);
    console.log('video:',addedVideo);
  }

  return (
    <Button
      onClick={addVideoHandler}
      variant="contained"
    >
      Add video
    </Button>
  );
}
