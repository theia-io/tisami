"use client";
import { addList, addVideo } from "@/app/lib/api";
import { DBContext } from "@/app/lib/context";
import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { FaPlusSquare } from "react-icons/fa";

export type Props = {
  listId: string;
};

export function ListAdd({ listId }: Props) {
  const db = useContext(DBContext);

  const [pinnedVideoUrl, setPinnedVideoUrl] = useState<string | undefined>(
    undefined
  );
  const [name, setName] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);

  const addListHandler = async () => {
    const createdList = await addList(db, {
      name,
      pinnedVideoUrl,
      parentId: listId,
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <TextField
        onChange={(event) => setPinnedVideoUrl(event.target.value)}
        label="Pinned video URL"
        variant="standard"
      />

      <TextField
        onChange={(event) => setName(event.target.value)}
        label="Name"
        variant="standard"
      />

      <TextField
        onChange={(event) => setDescription(event.target.value)}
        label="Description"
        minRows={3}
        multiline={true}
        variant="standard"
      />

      <div className="ml-auto">
        <Button
          disabled={!(pinnedVideoUrl != null && pinnedVideoUrl.length > 9)}
          onClick={addListHandler}
          variant="contained"
        >
          <FaPlusSquare className="mr-2" /> Add sub-list
        </Button>
      </div>
    </div>
  );
}
