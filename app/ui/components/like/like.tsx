'use client'
import { Button } from "@mui/material";
import { useState } from "react";

export function Like() {
  const [likes, setLikes] = useState(0);

  return (
    <Button onClick={() => setLikes((likes) => likes + 1)} variant="contained">
      Hello world {likes}
    </Button>
  );
}
