"use client";
import { addVideo } from "@/app/lib/api";
import { DBContext } from "@/app/lib/context";
import { IVideo } from "@/app/lib/models/video";
import { Button, Chip, ListItem, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { FaPlusSquare } from "react-icons/fa";

export type Props = {
  listId: string;
  addedVideoHandler: (video: IVideo) => void;
};

export function VideoAdd({ listId, addedVideoHandler }: Props) {
  const db = useContext(DBContext);

  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [currentTag, setCurrentTag] = useState<string | null>(null);
  const [tags, setTags] = useState<Array<string>>([]);

  const addVideoHandler = async () => {
    const addedVideo = await addVideo(db, { url, listId });

    addedVideoHandler(addedVideo);
    setUrl('');
    setDescription('');
    setCurrentTag('');
    setTags([]);
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <TextField
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          label="Відео URL"
          variant="standard"
        />

        <TextField
        value={description}
          onChange={(event) => setDescription(event.target.value)}
          label="Опис"
          variant="standard"
          multiline={true}
          minRows="3"
        />

        <div>
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

          {tags.map((tag) => (
            <ListItem key={tag}>
              <Chip
                label={tag}
                onDelete={() =>
                  setTags((existingTags) =>
                    existingTags.filter((existingTag) => existingTag !== tag)
                  )
                }
              />
            </ListItem>
          ))}
        </div>

        <Button
          className="mt-2"
          disabled={url.length < 9}
          onClick={addVideoHandler}
          variant="contained"
        >
          <FaPlusSquare className="mr-2" />
          Додати
        </Button>
      </div>
    </>
  );
}
