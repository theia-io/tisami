import { IList, IVideo } from "@/app/lib/models/video";
import { Fab } from "@mui/material";
import Link from "next/link";
import { FaAngleDoubleRight } from "react-icons/fa";
import { Tag } from "../tag/tag";
import { Youtube } from "../youtube/youtube";

type Props = {
  withLink?: boolean;
  list: IList;
  videos?: Array<IVideo>;
  children?: React.ReactNode;
};

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

      {list.pinnedVideoUrl && <Youtube videoId={list.pinnedVideoUrl} />}

      <div className="relative flex flex-nowrap gap-2 overflow-auto">
        {children}

        {videos?.map((listVideo) => (
          <Youtube key={listVideo.id} videoId={listVideo.url} />
        ))}

        {videos && videos.length > 3 && (
          <Fab
            className="absolute right-2 top-1/2 translate-y-[-50%]"
            color="primary"
            aria-label="add"
          >
            <FaAngleDoubleRight />
          </Fab>
        )}
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
