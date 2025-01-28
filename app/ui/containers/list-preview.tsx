"use client";
import { fetchListById, fetchListVideo } from "@/app/lib/api";
import { DBContext } from "@/app/ui/context";
import { IList, IVideo } from "@/app/lib/models/video";
import { useContext, useEffect, useState } from "react";
import { ListPreviewComponent } from "../components/list/list-preview";

type Props = { id: string };

export function ListPreviewContainer({ id }: Props) {
  const db = useContext(DBContext);

  const [list, setList] = useState<IList | null>(null);
  const [videos, setVideos] = useState<Array<IVideo> | null>(null);

  useEffect(() => {
    (async () => {
      const list = await fetchListById(db)(id);
      setList(list);
    })();
  }, [id]);

  useEffect(() => {
    if (!list?.id) {
      return;
    }

    (async () => {
      const videos = await fetchListVideo(db)(list?.id);

      if (!videos) {
        return;
      }

      setVideos(videos);
    })();
  }, [list?.id]);

  if (!list) {
    return <div>Такого списку не існує</div>;
  }

  return (
    <ListPreviewComponent list={list} videos={videos ?? []} withLink={true} />
  );
}
