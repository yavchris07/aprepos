import { Pencil, Trash2 } from "lucide-react";
// import type { Transaction } from "../../../utlis/type";
import Loading from "../../../components/loading";
import type { Transaction } from "../type";
import { formatAccountNumber } from "../../../utlis/fomatted-number";

interface listTransactionProps {
  transactions: Transaction[];
  loading: boolean;
  onDelete: (transaction: Transaction) => void;
  onEdit: (transaction: Transaction) => void;
  // onView: (transaction: Transaction) => void;
}

const ListTransaction = ({
  transactions,
  loading,
  onDelete,
  onEdit,
  // onView,
}: listTransactionProps) => {
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
              Compte
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Type opération
            </th>
            <th
              scope="col"
              className="px-6 py-4 max-w-xs text-left md:max-w-md"
            >
              Montant
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Balance
            </th>
            <th
              scope="col"
              className="px-6 py-4 max-w-xs text-left md:max-w-md"
            >
              Date
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-gray-600 text-xs">
          {transactions.map((adh) => (
            <tr
              key={adh.id}
              className="hover:bg-gray-50 odd:bg-white even:bg-gray-50/50 transition-colors"
            >
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{adh.reference}</span>
              </td>
               <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{adh.compte_details.membre_nom}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{formatAccountNumber(adh.compte_details.numero_compte)}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium">
                <div
                  className={`flex items-center gap-2 ${adh.type_transaction === "in" ? "text-green-600" : "text-red-600"}`}
                >
                  <span>
                    {adh.type_transaction === "in" ? "Entrée" : "Sortie"}
                  </span>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{adh.montant}</span>
              </td>
               <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{adh.compte_details.balance} {adh.compte_details.devise}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">
                  {adh.created_at.split("T")[0]}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium flex gap-2 justify-center">
                <button
                  onClick={() => onEdit(adh)}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition hover:bg-green-100 hover:text-green-700"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => onDelete(adh)}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-600"
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

export default ListTransaction;
