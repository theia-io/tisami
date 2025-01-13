"use client";
import { addVideo } from "@/app/lib/api";
import { DBContext } from "@/app/lib/context";
import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";

export type Props = {
 listId: string
}

export function VideoAdd({ listId }: Props) {
  const db = useContext(DBContext);

  const [url, setUrl] = useState('');
  
  const addVideoHandler = async () => {
    const addedVideo = await addVideo(db, {url, listId});
  }

  return (
    <>
    <TextField onChange={(event) => setUrl(event.target.value)} label="Video URL" variant="standard" />
    <Button
      disabled={url.length < 9}
      onClick={addVideoHandler}
      variant="contained"
    >
      Add video
    </Button>
    </>
  );
}
