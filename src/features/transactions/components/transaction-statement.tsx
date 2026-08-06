import Loading from "../../../components/loading";
import type { Transaction } from "../../../utlis/type";

interface transactionStatementProps {
  transactions: Transaction[];
  loading: boolean;
}

const TransactionStatement = ({
  loading,
  transactions,
}: transactionStatementProps) => {
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
              Compte
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Type operation
            </th>
            <th
              scope="col"
              className="px-6 py-4 max-w-xs text-left md:max-w-md"
            >
              Montant
            </th>
            <th
              scope="col"
              className="px-6 py-4 max-w-xs text-left md:max-w-md"
            >
              Reference
            </th>
            <th
              scope="col"
              className="px-6 py-4 max-w-xs text-left md:max-w-md"
            >
              Date
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
                <span className="font-medium">{adh.id}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{adh.compte}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium text-gray-900">
                <div className="flex items-center gap-2">
                  <span>{adh.type_transaction}</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{adh.montant}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{adh.reference}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{adh.created_at}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionStatement;
