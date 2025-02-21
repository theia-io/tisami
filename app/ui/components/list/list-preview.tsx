import { IList, IVideo } from "@/app/lib/models/video";
import { Fab, Link } from "@mui/material";

import { FaAngleDoubleRight, FaLink } from "react-icons/fa";
import { getRandomCallsign } from "../../models/callsigns";
import { Tag, Tags } from "../tag/tag";
import { Youtube } from "../youtube/youtube";
import { useRef } from "react";
import { useWindowDimensions } from "../../shared/viewport";

type Props = {
  /** determines if preview component is clickable */
  withLink?: boolean;
  /** determines if there is link to open this list */
  withButtonLink?: boolean;
  hiddenPinnedVideo?: boolean;
  list: IList;
  videos?: Array<IVideo>;
  children?: React.ReactNode;
};

export function ListPreviewComponent({
  videos,
  list: { id, pinnedVideoUrl, tags, name, description, timestamp },
  children,
  withLink = false,
  withButtonLink = false,
  hiddenPinnedVideo = true,
}: Props) {
  const { width } = useWindowDimensions();
  const scrollableRef = useRef(null);

  const pinnedVideoBody = pinnedVideoUrl ? (
    hiddenPinnedVideo ? (
      <Link
        underline="hover"
        className="text-xl md:text-2xl"
        target="_blank"
        rel="noreferrer"
        href={`https://www.youtube.com/watch?v=${pinnedVideoUrl}`}
      >
        {" "}
        <FaLink className="inline" /> Випуск на YouTube
      </Link>
    ) : (
      <Youtube videoId={pinnedVideoUrl} />
    )
  ) : null;

  const listPreviewBody = (
    <div className="flex flex-col gap-4">
      <div className="flex flex-nowrap overflow-auto items-center gap-4">
        {pinnedVideoBody}

        <div>|</div>

        <h2 className="text-xl md:text-2xl inline-block">
          {name ?? getRandomCallsign()}
        </h2>

        <div>|</div>

        <h2 className="text-xl md:text-2xl inline-block">{description}</h2>

        {withButtonLink && (
          <div className="ml-auto">
            <Link href={`/list/${id}`}>Відкрити...</Link>
          </div>
        )}
      </div>

      <Tags tags={tags} />

      <div
        ref={scrollableRef}
        className="relative flex flex-nowrap items-center gap-2 overflow-auto"
      >
        {children}

        {videos?.map((listVideo) => (
          <Youtube key={listVideo.id} videoId={listVideo.url} />
        ))}

        {videos && videos.length > 3 && (
          <div
            onClick={() => {
              console.log("scrollableRef", scrollableRef, width);
              (scrollableRef?.current as any).scrollLeft += width / 2;
            }}
            className="sticky right-2 top-1/2 translate-y-[-50%]"
          >
            <Fab color="primary" aria-label="scroll">
              <FaAngleDoubleRight />
            </Fab>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {withLink ? (
        <Link className="text-stone-900 hover:cursor-pointer" href={`/list/${id}`}>
          {listPreviewBody}
        </Link>
      ) : (
        listPreviewBody
      )}
    </>
  );
}
