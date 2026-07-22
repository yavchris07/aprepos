{
//   /* <PiggyBank /> */
}
import { Eye, Pencil, Trash2 } from "lucide-react";
import type { Account } from "../../../utlis/type";
import Loading from "../../../components/loading";

interface accountProps {
  accounts: Account[];
  loading: boolean;
  onDelete: (account: Account) => void;
  onEdit: (account: Account) => void;
  onView: (account: Account) => void;
}

const ListAccount = ({
  accounts,
  loading,
  onDelete,
  onEdit,
  onView,
}: accountProps) => {
  if (loading) return <Loading />;
  return (
    <div className="w-full bg-gray-100 my-2">
      <table className="text-black w-full">
        <thead className="bg-gray-50 text-xs font-bold tracking-wider text-gray-700 text-start">
          <tr>
            <th scope="col" className="px-6 py-4 text-left">
              ID
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Membre
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Numero compte
            </th>
            <th
              scope="col"
              className="px-6 py-4 max-w-xs text-left md:max-w-md"
            >
              Balance
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-gray-600 text-xs">
          {accounts.map((adh) => (
            <tr
              key={adh.id}
              className="hover:bg-gray-50 odd:bg-white even:bg-gray-50/50 transition-colors"
            >
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{adh.id}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{adh.membre}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium text-gray-900">
                <div className="flex items-center gap-2">
                  <span>{adh.numero_compte}</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{adh.balance}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium flex gap-2 justify-center">
                <button
                  onClick={() => onView(adh)}
                  className=" hover:bg-gray-100 cursor-pointer"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={() => onEdit(adh)}
                  className=" hover:bg-gray-100 cursor-pointer"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => onDelete(adh)}
                  className=" text-red-600 hover:bg-red-50 cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListAccount;
