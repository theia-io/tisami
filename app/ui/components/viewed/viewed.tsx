import { AssetMeta, Meta } from "@/app/lib/models/video";
import { FaRegCalendar, FaRegEye } from "react-icons/fa";

type Props = {viewed: AssetMeta["viewed"]};

export function ViewedComponent({viewed}: Props) {
  return (
    <p className="flex items-center flex-nowrap overflow-auto text-sm text-gray-500 m-0">
      <FaRegEye className="inline mr-2" />
      Переглянули {viewed}
    </p>
  );
}