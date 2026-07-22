import { Eye, Pencil, Trash2 } from "lucide-react";
import type { Refund } from "../../../utlis/type";
import Loading from "../../../components/loading";

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
                  className=" hover:bg-gray-100 cursor-pointer"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={() => onEdit(refund)}
                  className=" hover:bg-gray-100 cursor-pointer"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => onDelete(refund)}
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

export default ListRefund;
