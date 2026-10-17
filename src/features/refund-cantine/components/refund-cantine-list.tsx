import Loading from "../../../components/loading";
import NoResult from "../../../components/no-result";
import type { RefundCantine } from "../type";

interface cantineCartListProps {
  refundCantines: RefundCantine[];
  loading: boolean;
  onDelete?: () => void;
  onEdit?: () => void;
}

const RefundCantineList = ({
  refundCantines,
  loading,
}: cantineCartListProps) => {
  if (loading) {
    return <Loading />;
  }

  if (!refundCantines.length) {
    return (
      <NoResult
        subject="Aucun remboursement de crédit cantine trouvé"
        subSubject=" Aucun résultat pour le moment."
      />
    );
  }

  return (
    <div className="my-3 w-full overflow-hidden rounded-xl border border-gray-200 shadow-sm">
      {/* Table responsive */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-245 text-left text-sm text-gray-600">
          {/* ==================================================
              HEADER
             ==================================================== */}
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              <th className="whitespace-nowrap px-3 py-2">#</th>
              <th className="whitespace-nowrap px-3 py-2">Montant</th>
              <th className="whitespace-nowrap px-3 py-2">Devise </th>
              <th className="whitespace-nowrap px-3 py-2">Date</th>
              <th className="whitespace-nowrap px-3 py-2">Jeton</th>
              {/* <th className="whitespace-nowrap px-3 py-2 text-center">
                Actions
              </th> */}
            </tr>
          </thead>

          {/* =====================================================
              BODY
          ===================================================== */}
          <tbody className="divide-y divide-gray-100">
            {refundCantines.map((refundCantine, index) => {
              const balanceNum = parseFloat(refundCantine.montant || "0");
              const isBalanceNegative = balanceNum < 0;

              return (
                <tr
                  key={refundCantine.id}
                  className="group transition-colors hover:bg-green-50/40"
                >
                  {/* Numéro */}
                  <td className="whitespace-nowrap px-3 py-2">
                    <span className="text-xs font-medium text-gray-400">
                      {index + 1}
                    </span>
                  </td>

                  {/* Balance */}
                  <td className="whitespace-nowrap px-3 py-2">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                        isBalanceNegative
                          ? "bg-red-50 text-red-700"
                          : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      {refundCantine.montant || "0"}
                    </span>
                  </td>

                  {/* Acompte initial */}
                  <td className="whitespace-nowrap px-3 py-2">
                    <span className="text-xs font-medium text-gray-700">
                      {refundCantine.devise || "0"}{" "}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-3 py-2 ">
                    <span className="text-xs text-gray-700">
                      {refundCantine.date || "0"}{" "}
                    </span>
                  </td>

                  <td className="px-3 py-2">
                    <div className="flex items-center gap-3">
                      {/* Informations */}
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold text-gray-800">
                          {refundCantine.credit_cantine || "-"}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RefundCantineList;
