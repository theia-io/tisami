import { Meta } from "@/app/lib/models/video";
import { FaRegCalendar } from "react-icons/fa";

type Props = {timestamp: Meta["timestamp"]};

export function TimestampComponent({timestamp: {createdAt}}: Props) {
  return (
    <time className="flex items-center flex-nowrap overflow-auto text-sm text-gray-500" dateTime={new Date(createdAt).toISOString()}>
      <FaRegCalendar className="inline mr-2" />
      {new Date(createdAt).toLocaleString()}
    </time>
  );
}