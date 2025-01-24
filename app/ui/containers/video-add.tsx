"use client";
import { addVideo } from "@/app/lib/api";
import { DBContext } from "@/app/lib/context";
import { Button, Chip, ListItem, TextField } from "@mui/material";
import { useContext, useState } from "react";

export type Props = {
  listId: string;
};

export function VideoAdd({ listId }: Props) {
  const db = useContext(DBContext);

  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [currentTag, setCurrentTag] = useState<string | null>(null);
  const [tags, setTags] = useState<Array<string>>([]);

  const addVideoHandler = async () => {
    const addedVideo = await addVideo(db, { url, listId });
  };

  return (
    <>
      <TextField
        onChange={(event) => setUrl(event.target.value)}
        label="Video URL"
        variant="standard"
      />

      <TextField
        onChange={(event) => setDescription(event.target.value)}
        label="Description"
        variant="standard"
        minRows="3"
      />

      <div>
        <TextField
          onKeyDown={(event) =>  {
            if(event.key === 'Enter' && currentTag) {
              setTags((currTags) => [...currTags, currentTag]);
              setCurrentTag(null);
            } 
          }
          }
          value={currentTag}
          onChange={event => setCurrentTag(event.target.value)}
          label="Tags"
          variant="standard"
        />

        {tags.map((tag) => (
          <ListItem key={tag}>
            <Chip
              label={tag}
              onDelete={() =>
                setTags((existingTags) =>
                  tags.filter((existingTag) => existingTag !== tag)
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
        Add video
      </Button>
    </>
  );
}
