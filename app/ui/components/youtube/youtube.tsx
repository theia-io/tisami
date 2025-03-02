"use client";
import YouTube from "react-youtube";

export function Youtube({ videoId }: { videoId: string }) {
  const opts = {
    height: "270",
    width: "480",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      enablejsapi: 1,
    },
  };

  return <YouTube videoId={videoId} opts={opts} />;
}
