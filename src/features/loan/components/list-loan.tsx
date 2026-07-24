import { Eye, Pencil, Trash2 } from "lucide-react";
import type { Loan } from "../../../utlis/type";
import Loading from "../../../components/loading";

interface loanProps {
  loans: Loan[];
  loading: boolean;
  onDelete: (loans: Loan) => void;
  onEdit: (loan: Loan) => void;
  onView: (loan: Loan) => void;
}

const ListLoans = ({ loans, loading, onDelete, onEdit, onView }: loanProps) => {
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
              Taux
            </th>
            <th
              scope="col"
              className="px-6 py-4 max-w-xs text-left md:max-w-md"
            >
              Total
            </th>
            <th
              scope="col"
              className="px-6 py-4 max-w-xs text-left md:max-w-md"
            >
              Reste
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
          {loans.map((loan) => (
            <tr
              key={loan.id}
              className="hover:bg-gray-50 odd:bg-white even:bg-gray-50/50 transition-colors"
            >
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{loan.id}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{loan.membre}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span>{loan.montant}</span>
              </td>

              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{loan.total_a_payer}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{loan.taux_interet}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium text-red-700">{loan.balance}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{loan.date}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium flex gap-2 justify-center">
                {/* onView={} onEdit={} onDelete={} */}
                <button
                  onClick={() => onView(loan)}
                  className=" hover:bg-gray-100 cursor-pointer"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={() => onEdit(loan)}
                  className=" hover:bg-gray-100 cursor-pointer"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => onDelete(loan)}
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

export default ListLoans;
