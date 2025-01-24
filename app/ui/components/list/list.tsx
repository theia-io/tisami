import { IList, IVideo, Meta } from "@/app/lib/models/video";
import { Youtube } from "../youtube/youtube";
import { Tag } from "../tag/tag";

type Props = {
  list: IList;
  videos?: Array<IVideo>;
  children?: React.ReactNode;
};

export function ListComponent({
  videos,
  list: { pinnedVideoUrl, tags, name, description },
  children,
}: Props) {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
        {pinnedVideoUrl && <Youtube videoId={pinnedVideoUrl} />}

        <div>
          {name && <h2 className="text-xl md:text-4xl">{name}</h2>}
          <h3 className="md:text-2xl"> {description} </h3>
        </div>
      </div>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag text={tag} key={tag}></Tag>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {children}
        {videos &&
          videos.length > 0 &&
          videos.map((video) => <Youtube key={video.id} videoId={video.url} />)}
      </div>
    </>
  );
}
