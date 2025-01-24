import { Card } from "@mui/material";
import { FaBookmark } from "react-icons/fa";
import { ListPreview } from "./ui/containers/list-preview";

export default async function Home() {
  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-xl md:text-4xl text-center md:text-left">
        Ціль проекту зібрати меми що стали частиною 🇺🇦 життя та можуть по-праву
        вважатись - національним Українським надбанням.
      </h1>

      <div>
        <h2 className="md:text-2xl font-semibold flex items-center gap-2">
          <FaBookmark /> Закріплені
        </h2>
        <div className="mt-2 w-full">
          <Card className="p-2 md:p-4">
            <ListPreview id="hyjl5YuftuVkz5oGyvgM"></ListPreview>
          </Card>
        </div>
      </div>
    </main>
  );
}
