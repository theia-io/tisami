"use client";
import { fetchHomeVideo } from "@/app/lib/api";
import { DBContext } from "@/app/lib/context";
import { useContext, useEffect, useState } from "react";
import { Youtube } from "../components/youtube/youtube";

export function VideoList() {
  const db = useContext(DBContext);

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    (async () => {
      const homeVideos = await fetchHomeVideo(db);
      setVideos(homeVideos as any);
    })();
  }, []);

  return (
    <div className="container mx-auto flex flex-wrap gap-2">
      {videos.map(({ id, url }) => (
        <Youtube key={id} videoId={url} />
      ))}
    </div>
  );
}
