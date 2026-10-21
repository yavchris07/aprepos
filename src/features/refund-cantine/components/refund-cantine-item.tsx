import { ArrowUpDown } from "lucide-react";
// import type { Transaction } from "../../../utlis/type";
import type { RefundCantine } from "../type";

type refundCantinItemProps = { item: RefundCantine };

const RefundCantineItem = ({ item }: refundCantinItemProps) => {
  return (
    <div className="flex justify-between items-center px-1 py-2 bg-zinc-50">
      <div className="flex flex-row items-center gap-2">
        <ArrowUpDown size={17} />
        <div className="flex flex-col gap-0">
          <h3 className="text-sm">Jeton {item.credit_cantine}</h3>
          <span className="text-[10px] text-orange-900">{item.date}</span>
        </div>
      </div>

      <div className="flex flex-col">
        <strong className="text-sm">{item.montant}</strong>
        <span className="text-xs text-gray-500">{item.devise}</span>
      </div>
    </div>
  );
};

export default RefundCantineItem;
