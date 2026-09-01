type SummaryCardProps = {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
};

export const SummaryCard = ({
  title,
  value,
  description,
  icon: Icon,
}: SummaryCardProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-500">{title}</p>

          <p className="text-2xl font-semibold text-gray-900 mt-2">{value}</p>

          <p className="text-[11px] text-gray-400 mt-1">{description}</p>
        </div>

        <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center">
          <Icon size={17} className="text-gray-500" />
        </div>
      </div>
    </div>
  );
};


