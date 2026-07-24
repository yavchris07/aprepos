import { ArrowUpDown } from "lucide-react";
import type { Transaction } from "../../../utlis/type";

type tansactionItemProps = {item : Transaction}

const TransactionItem = ({item}:tansactionItemProps) => {
  return (
    <div className="flex justify-between items-center px-1 py-2 bg-zinc-50">
      <div className="flex flex-row items-center gap-2">
        <ArrowUpDown size={17}/>
        <div className="flex flex-col gap-0">
          <h3 className="text-sm">{item.compte}</h3>
          <span className="text-[10px] text-orange-900">{item.reference}</span>
        </div>
      </div>

      <div className="flex flex-col">
        <strong className="text-sm">{ item.montant}</strong>
        <span className="text-xs text-gray-500">{item.type_transaction}</span>
      </div>
    </div>
  );
};

export default TransactionItem;
