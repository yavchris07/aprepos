import { ChevronRight } from "lucide-react";
import type { Operation } from "../utlis/type";

type operationProps = {
  operation: Operation;
};

const OperationItem = ({ operation }: operationProps) => {
  const Icon = operation.icon;
  return (
    <button
      key={operation.title}
      className="
        group
        text-left
        border border-gray-100
        rounded-xl
        p-4
        hover:border-gray-200
        hover:shadow-sm
        transition
      bg-white
        "
    >
      <div className="flex items-start justify-between">
        <div
          className={`
            w-10 h-10
            rounded-lg
            flex items-center justify-center
            ${operation.iconBg}
          `}
        >
          <Icon size={19} className={operation.iconColor} />
        </div>

        <ChevronRight
          size={16}
          className="
          text-gray-300
          group-hover:text-gray-500
            transition
          "
        />
      </div>

      <div className="mt-4">
        <p className="text-sm font-medium text-gray-800">{operation.title}</p>
        <p className="text-xs text-gray-500 mt-1">{operation.description}</p>
        <p className="text-xl font-semibold text-gray-900 mt-3">
          {operation.value}
        </p>
      </div>
    </button>
  );
};

export default OperationItem;
