"use client";
import {
  fetchChildrenListsById,
  fetchListBulkVideo,
  fetchListById,
  updateListMeta,
} from "@/app/lib/api";
import { DBContext } from "@/app/lib/context";
import { IList, IVideo } from "@/app/lib/models/video";
import { Card } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { FaHammer } from "react-icons/fa";
import { ListComponent } from "../components/list/list";
import { ListPreviewComponent } from "../components/list/list-preview";
import { Youtube } from "../components/youtube/youtube";
import { ListAdd } from "./list-add";
import { VideoAdd } from "./video-add";

type Props = { id: string };

export function List({ id }: Props) {
  const db = useContext(DBContext);

  const [editList, setEditList] = useState(false);

  const [list, setList] = useState<IList | null>(null);
  const [listChildren, setListChildren] = useState<Array<IList> | null>(null);
  const [videos, setVideos] = useState<{
    [index: string]: Array<IVideo>;
  } | null>(null);

  useEffect(() => {
    if (!list) {
      return;
    }
    (async () => {
      console.log(list);
      const updated = await updateListMeta(db, id, {
        viewed: (list.viewed ?? 0) + 1,
      });
      if (!updated) {
        return;
      }
      setList((list) => ({ ...list!, viewed: updated.viewed }));
    })();
  }, [list?.id]);

  useEffect(() => {
    (async () => {
      const list = await fetchListById(db)(id);
      setList(list);
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      const children = await fetchChildrenListsById(db)(id);
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
        console.log("listIds", listIds);
        const videoList = await fetchListBulkVideo(db)(listIds);
        console.log("RECEIVED videoList", videoList);

        if (!videoList) {
          console.error("No videos for this and child lists", listIds);
          return;
        }

        setVideos(
          videoList.reduce((acc, video) => {
            const idx = video.listId ?? "no_list";
            const videosInList = acc[idx] ?? [];
            return { ...acc, [idx]: [...videosInList, video] };
          }, {} as { [index: string]: Array<IVideo> })
        );
      })();
    }
  }, [list?.id, listChildren]);

  if (!list) {
    return (
      <div>
        Ми не змогли знайти такий список, перевірьте посилання та спробуйте ще
        раз.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <ListComponent
        list={list}
        videos={videos?.[list.id]}
        editHandler={() => setEditList((editList) => !editList)}
      >
        {editList && (
          <Card variant="outlined" className="p-4">
            <VideoAdd
              listId={list.id}
              addedVideoHandler={(video: IVideo) =>
                setVideos((currentVideos) => ({
                  ...currentVideos,
                  [list.id]: [video, ...(currentVideos?.[list.id] ?? [])],
                }))
              }
            />
          </Card>
        )}
      </ListComponent>

      <div className="flex flex-wrap justify-center gap-2">
        {videos?.[list.id]?.map((video) => (
          <Youtube key={video.id} videoId={video.url} />
        ))}
      </div>

      {listChildren && listChildren.length > 0 && (
        <>
          <hr className="my-2" />

          {listChildren?.map((subList) => (
            <div key={subList.id} className="mt-8">
              <ListPreviewComponent
                list={subList}
                videos={videos?.[subList.id]}
              >
                {editList && (
                  <Card variant="outlined" className="p-4 min-w-[215px]">
                    <VideoAdd
                      listId={subList.id}
                      addedVideoHandler={(video: IVideo) =>
                        setVideos((currentVideos) => ({
                          ...currentVideos,
                          [subList.id]: [
                            video,
                            ...(currentVideos?.[subList.id] ?? []),
                          ],
                        }))
                      }
                    />
                  </Card>
                )}
              </ListPreviewComponent>
            </div>
          ))}
        </>
      )}

      {editList && (
        <Card variant="outlined" className="p-4">
          <div className="flex items-center gap-4">
            <FaHammer className="text-4xl" />{" "}
            <span className="font-semibold text-2xl">Нова секція</span>
          </div>

          <ListAdd listId={list.id} />
        </Card>
      )}
    </div>
  );
}
