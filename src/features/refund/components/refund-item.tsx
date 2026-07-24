import { ArrowUpDown } from "lucide-react";
import type { Refund } from "../../../utlis/type";

type refundItemProps = { item: Refund };

const RefundItem = ({ item }: refundItemProps) => {
  return (
    <div className="flex justify-between items-center p-1">
      <div className="flex flex-row items-center gap-2">
        <ArrowUpDown size={17} />
        <div className="flex flex-col gap-0">
          <h3 className="text-sm">{item.emprumt}</h3>
          <span className="text-xs text-gray-500">{item.id}</span>
        </div>
      </div>

      <div className="flex flex-col">
        <strong className="text-sm">{item.montant}</strong>
        <span className="text-xs text-gray-500">{item.montant}</span>
      </div>
    </div>
  );
};

export default RefundItem;
