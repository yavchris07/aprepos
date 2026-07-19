import { CaptionsOff } from "lucide-react";

type EmptyListProps = {
  message?: string;
};

const EmptyList = ({ message }: EmptyListProps) => {
  return (
    <div className="flex flex-col items-center my-24 gap-2">
      <CaptionsOff size={30} color="red" />
      <p className="text-gray-500 text-sm italic text-center">
        {message || "La liste est vide !"}
      </p>
    </div>
  );
};

export default EmptyList;
