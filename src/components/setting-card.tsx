import { ChevronRight } from "lucide-react";

type SettingCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  value?: string;
};

export const SettingCard = ({
  icon,
  title,
  description,
  value,
}: SettingCardProps) => {
  return (
    <button
      type="button"
      className="group flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:border-gray-300 hover:shadow-md"
    >

      <div className="flex items-center gap-3">

        <div className="rounded-lg bg-gray-100 p-2.5 text-gray-600 transition group-hover:bg-green-50 group-hover:text-green-700">
          {icon}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            {title}
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            {description}
          </p>

          {value && (
            <p className="mt-2 text-xs font-medium text-green-700">
              {value}
            </p>
          )}
        </div>

      </div>

      <ChevronRight
        size={18}
        className="shrink-0 text-gray-300 transition group-hover:text-gray-600"
      />

    </button>
  );
};