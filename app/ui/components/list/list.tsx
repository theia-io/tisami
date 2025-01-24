import { IList, IVideo, Meta } from "@/app/lib/models/video";
import { Youtube } from "../youtube/youtube";
import { Tag } from "../tag/tag";

type Props = { list: IList; videos?: Array<IVideo> };

export function ListComponent({
  videos,
  list: { pinnedVideoUrl, tags, name, description },
}: Props) {
  return (
    <>
      <div className="flex flex-col gap-4">
        {pinnedVideoUrl && <Youtube videoId={pinnedVideoUrl} />}
        <div>
          {name && <h2 className="text-6xl">{name}</h2>}
          <h3 className="text-3xl"> {description} </h3>
        </div>
      </div>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag text={tag} key={tag}></Tag>
          ))}
        </div>
      )}

      {videos && videos.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {videos.map((video) => (
            <Youtube key={video.id} videoId={video.url} />
          ))}
        </div>
      )}
    </>
  );
}
