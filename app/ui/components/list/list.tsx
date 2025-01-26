import { IList, IVideo, Meta } from "@/app/lib/models/video";
import { Youtube } from "../youtube/youtube";
import { Tag, Tags } from "../tag/tag";
import { Fab } from "@mui/material";
import { FaAngleDoubleRight, FaEdit } from "react-icons/fa";

type Props = {
  list: IList;
  videos?: Array<IVideo>;
  children?: React.ReactNode;
  editHandler: () => void;
};

export function ListComponent({
  videos,
  list: { pinnedVideoUrl, tags, name, description },
  children,
  editHandler,
}: Props) {
  return (
    <>
      <div className="relative flex flex-col md:flex-row gap-4">
        {pinnedVideoUrl && <Youtube videoId={pinnedVideoUrl} />}

        <div>
          {name && <h2 className="text-xl md:text-4xl">{name}</h2>}
          <h3 className="md:text-2xl"> {description} </h3>
        </div>

        <div
          onClick={() => {
            editHandler();
          }}
          className="absolute right-2 top-8"
        >
          <Fab color="primary" aria-label="edit">
            <FaEdit />
          </Fab>
        </div>
      </div>

      <Tags tags={tags} />

      <div className="flex flex-wrap gap-2">
        {children}
        {videos &&
          videos.length > 0 &&
          videos.map((video) => <Youtube key={video.id} videoId={video.url} />)}
      </div>
    </>
  );
}
