"use client";
import { addList } from "@/app/lib/api";
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
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [currentTag, setCurrentTag] = useState<string>("");
  const [tags, setTags] = useState<Array<string>>([]);

  const addListHandler = async () => {
    const createdList = await addList(db, {
      name,
      pinnedVideoUrl,
      description,
      tags,
      parentId: listId,
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <TextField
        onChange={(event) => setPinnedVideoUrl(event.target.value)}
        label="Закріплене відео URL"
        variant="standard"
      />

      <TextField
        onChange={(event) => setName(event.target.value)}
        label="Ім'я"
        variant="standard"
      />

      <TextField
        onChange={(event) => setDescription(event.target.value)}
        label="Опис"
        minRows={3}
        multiline={true}
        variant="standard"
      />

      <TextField
        onKeyDown={(event) => {
          if (event.key === "Enter" && currentTag) {
            setTags((currTags) => [...currTags, currentTag]);
            setCurrentTag("");
          }
        }}
        value={currentTag}
        onChange={(event) => setCurrentTag(event.target.value)}
        label="Хештеги"
        variant="standard"
      />

      <div className="ml-auto">
        <Button
          disabled={!(pinnedVideoUrl != null && pinnedVideoUrl.length > 9)}
          onClick={addListHandler}
          variant="contained"
        >
          <FaPlusSquare className="mr-2" /> Створити
        </Button>
      </div>
    </div>
  );
}
