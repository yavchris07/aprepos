import { Eye, Pencil, Trash2 } from "lucide-react";
import Loading from "../../../components/loading";
import type { Refund } from "./type";

interface listRefundProps {
  refunds: Refund[];
  loading: boolean;
  onDelete: (refund: Refund) => void;
  onEdit: (refund: Refund) => void;
  onView: (refund: Refund) => void;
}

const ListRefund = ({
  refunds,
  loading,
  onDelete,
  onEdit,
  onView,
}: listRefundProps) => {
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
              Montant
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
          {refunds.map((refund) => (
            <tr
              key={refund.id}
              className="hover:bg-gray-50 odd:bg-white even:bg-gray-50/50 transition-colors"
            >
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{refund.id}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{refund.emprumt}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium text-gray-900">
                <div className="flex items-center gap-2">
                  <span>{refund.montant}</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{refund.date}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium flex gap-2 justify-center">
                <button
                  onClick={() => onView(refund)}
                 className="flex h-8 w-8 cursor-pointer 
                  items-center justify-center rounded-lg 
                  text-gray-400 transition hover:bg-blue-100 
                  hover:text-blue-600"
                  title="Details"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={() => onEdit(refund)}
                  className="flex h-8 w-8 cursor-pointer 
                  items-center justify-center rounded-lg 
                  text-gray-400 transition hover:bg-green-100 
                  hover:text-green-600"
                  title="Modifier"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => onDelete(refund)}
                  className="flex h-8 w-8 cursor-pointer 
                  items-center justify-center rounded-lg 
                  text-gray-400 transition hover:bg-red-100 
                  hover:text-red-600"
                  title="Supprimer"
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

export default ListRefund;
