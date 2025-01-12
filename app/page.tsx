import { AddVideo } from "./ui/containers/video-add";
import { VideoList } from "./ui/containers/video-list";

export default async function Home() {
  return (
    <main className="flex gap-4">
      <div>
        <AddVideo />

        <div className="mt-2 w-full">
          <VideoList />
        </div>
      </div>
    </main>
  );
}
