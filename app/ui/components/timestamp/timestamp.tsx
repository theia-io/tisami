import { Meta } from "@/app/lib/models/video";

type Props = Meta["timestamp"];

export function Timestamp(createdAt: Props) {
  return (
    <time dateTime={new Date(createdAt).toISOString()}>
      {new Date(createdAt).toLocaleString()}
    </time>
  );
}