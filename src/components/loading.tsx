import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="my-12 flex flex-col items-center">
      <Loader2 className="animate-spin text-green-700" />
      <p className="text-sm text-gray-500 italic">Chargement ...</p>
    </div>
  );
};

export default Loading;
