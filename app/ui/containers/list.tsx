"use client";
import {
  fetchChildrenListsById,
  fetchListById,
  fetchVideoBulk,
} from "@/app/lib/api";
import { DBContext } from "@/app/lib/context";
import { IList, IVideo } from "@/app/lib/models/video";
import { useContext, useEffect, useState } from "react";
import { Youtube } from "../components/youtube/youtube";
import { ListAdd } from "./list-add";
import { VideoAdd } from "./video-add";
import { ListComponent } from "../components/list/list";
import { FaHammer } from "react-icons/fa";
import { Card } from "@mui/material";

type Props = { id: string };

export function List({ id }: Props) {
  const db = useContext(DBContext);

  const [list, setList] = useState<IList | null>(null);
  const [listChildren, setListChildren] = useState<Array<IList> | null>(null);
  const [videos, setVideos] = useState<{
    [index: string]: Array<IVideo>;
  } | null>(null);

  useEffect(() => {
    (async () => {
      const list = await fetchListById(db)(id);
      console.log("RECEIVED list", list);
      setList(list);
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      const children = await fetchChildrenListsById(db)(id);
      console.log("RECEIVED children", children);
      setListChildren(children);
    })();
  }, [id]);

  useEffect(() => {
    if (!(list?.id && listChildren)) {
      return;
    }

    const listIds = [list?.id]
      .concat(listChildren.map((listChild) => listChild.id))
      .filter((v): v is string => !!v);

    if (listIds) {
      (async () => {
        const videoList = await fetchVideoBulk(db)(listIds);
        console.log("RECEIVED videoList", videoList);

        if (!videoList) {
          console.error("No videos for this and child lists", listIds);
          return;
        }

        setVideos(
          videoList.reduce((acc, video) => {
            const idx = video.listId ?? "no_list";
            const videosInList = acc[idx];
            return { ...acc, [idx]: [...videosInList, video] };
          }, {} as { [index: string]: Array<IVideo> })
        );
      })();
    }
  }, [list?.id, listChildren]);

  if (!list) {
    return (
      <div className="container mx-auto flex flex-wrap gap-2">
        There is no such list.
      </div>
    );
  }

  return (
    <div className="container mx-auto flex flex-col gap-2">
      <ListComponent list={list} videos={videos?.[list.id]} />

      <Card variant="outlined" className="p-4">
        <div className="flex items-center gap-4">
          <FaHammer className="text-4xl" />{" "}
          <span className="font-semibold text-2xl">List info:</span>
        </div>
        <ListAdd listId={list.id} />
      </Card>

      {listChildren && listChildren.length > 0 && (
        <>
          <p className="text-2xl mb-0">Списки:</p>
          {listChildren?.map((subList) => (
            <div className="flex" key={subList.id}>
              <div className="flex gap-2">
                <div>
                  {subList.pinnedVideoUrl ? (
                    <Youtube videoId={subList.pinnedVideoUrl} />
                  ) : (
                    <p>List does not have pinned video</p>
                  )}
                </div>

                <div className="flex gap-2">
                  <div className="flex flex-col">
                    <VideoAdd listId={subList.id} />
                  </div>

                  {videos?.[subList.id]?.map((listVideo) => (
                    <Youtube key={listVideo.id} videoId={listVideo.url} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
