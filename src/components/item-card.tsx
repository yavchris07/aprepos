import { UserRound } from "lucide-react";

const ItemCard = () => {
  return (
    <div className="bg-white flex flex-col gap-2 shadow rounded py-8 px-1">
      <div className="flex justify-between items-center">
        <span className="text-gray-600 text-sm">Membres</span>
        <UserRound size={13}/>
      </div>

      <div className="flex gap-1.5 items-center">
        <strong className="text-gray-500 text-2xl">340</strong>
      </div>
    </div>
  );
};

export default ItemCard;
