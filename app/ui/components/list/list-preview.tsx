import { IList, IVideo } from "@/app/lib/models/video";
import { Card } from "@mui/material";
import Link from "next/link";
import { Tag } from "../tag/tag";
import { Youtube } from "../youtube/youtube";

type Props = { withLink?: boolean; list: IList; videos?: Array<IVideo>;children?: React.ReactNode };

export function ListPreviewComponent({
  videos,
  list,
  children,
  withLink = false,
}: Props) {
  const listPreviewBody = (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="max-w-[350px]">
        <h2 className="text-2xl">{list.name}</h2>
        <h3 className="mt-2 text-xl">{list.description}</h3>
      </div>

      {list.pinnedVideoUrl && (
          <Youtube videoId={list.pinnedVideoUrl} />
      )}

      <div className="flex flex-nowrap gap-2">
        {children}
         
        {videos?.map((listVideo) => (
          <Youtube key={listVideo.id} videoId={listVideo.url} />
        ))}
      </div>
    </div>
  );

  return (
    <>
      {withLink ? (
        <Link href={`/list/${list.id}`}>{listPreviewBody}</Link>
      ) : (
        listPreviewBody
      )}

      {list.tags && list.tags.length > 0 && (
        <div className="mt-2 md:mt-4 flex flex-wrap gap-2">
          {list.tags.map((tag) => (
            <Tag text={tag} key={tag}></Tag>
          ))}
        </div>
      )}
    </>
  );
}