"use client";
import {
  fetchChildrenListsById,
  fetchListById,
  fetchVideoBulk,
} from "@/app/lib/api";
import { DBContext } from "@/app/lib/context";
import { IList, IVideo } from "@/app/lib/models/video";
import { ReactElement, useContext, useEffect, useState } from "react";
import { Youtube } from "../components/youtube/youtube";
import { ListAdd } from "./list-add";
import { VideoAdd } from "./video-add";

type Props = { id: string; children?: ReactElement };

export function List({ id, children }: Props) {
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
      {list.name && <h2 className="text-6xl">{list.name}</h2>}
      <h3 className="text-3xl"> {list.description} </h3>

      <div className="my-4">
        <p>Add new sub-list:</p>
        <ListAdd listId={list.id} />
      </div>

      {/* {children} */}

      {listChildren?.map((subList) => (
        <div className="mt-2 flex" key={subList.id}>
          <hr />

          <div className="flex gap-2">
            <div>
              {subList.pinnedVideoUrl ? (
                <Youtube videoId={subList.pinnedVideoUrl} />
              ) : (
                <p>List does not have pinned video</p>
              )}
            </div>

            <div className="flex gap-2">
              <VideoAdd listId={subList.id} />

              {videos?.[subList.id]?.map((listVideo) => (
                <Youtube key={listVideo.id} videoId={listVideo.url} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
