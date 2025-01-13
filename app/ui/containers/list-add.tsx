"use client";
import { addList, addVideo } from "@/app/lib/api";
import { DBContext } from "@/app/lib/context";
import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";

export type Props = {
  listId: string;
};

export function ListAdd({ listId }: Props) {
  const db = useContext(DBContext);

  const [pinnedVideoUrl, setPinnedVideoUrl] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  const addListHandler = async () => {
    const createdList = await addList(db, {
      name,
      pinnedVideoUrl,
      parentId: listId,
    });

    console.log("createdList", createdList);
  };

  return (
    <div className="m-2">
      <TextField
        onChange={(event) => setPinnedVideoUrl(event.target.value)}
        label="Pinned video URL"
        variant="standard"
      />
      {/* <TextField
        onChange={(event) => setName(event.target.value)}
        label="List name"
        variant="standard"
      /> */}

      <Button
        disabled={!(pinnedVideoUrl != null && pinnedVideoUrl.length > 9)}
        onClick={addListHandler}
        variant="contained"
      >
        Add sub-list
      </Button>
    </div>
  );
}
