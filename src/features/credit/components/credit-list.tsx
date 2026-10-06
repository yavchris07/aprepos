import { Pencil, Trash2, Eye } from "lucide-react";
import type { CreditCantine } from "../../../utlis/type";
import Loading from "../../../components/loading";

interface CreditCantineProps {
  credits: CreditCantine[];
  loading: boolean;
  onDelete: (credit: CreditCantine) => void;
  onEdit: (credit: CreditCantine) => void;
  onViewDetails?: (credit: CreditCantine) => void;
}

const CreditCantineList = ({
  credits,
  loading,
  onDelete,
  onEdit,
  onViewDetails,
}: CreditCantineProps) => {
  if (loading) {
    return <Loading />;
  }

  if (!credits.length) {
    return (
      <div className="my-3 flex min-h-50 items-center justify-center rounded-xl border border-gray-200 bg-white">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-600">
            Aucun crédit cantine trouvé
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Aucun résultat ne correspond à votre recherche.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-3 w-full overflow-hidden rounded-xl border border-gray-200 shadow-sm">
      {/* Table responsive */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-245 text-left text-sm text-gray-600">
          {/* =====================================================
              HEADER
          ===================================================== */}
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              <th className="whitespace-nowrap px-3 py-2">#</th>
              <th className="whitespace-nowrap px-3 py-2">Membre</th>
              <th className="whitespace-nowrap px-3 py-2">Acompte Initial</th>
              <th className="whitespace-nowrap px-3 py-2">Total Panier</th>
              <th className="whitespace-nowrap px-3 py-2">Balance</th>
              <th className="whitespace-nowrap px-3 py-2">Lignes / Remb.</th>
              <th className="whitespace-nowrap px-3 py-2">Date</th>
              <th className="whitespace-nowrap px-3 py-2">Jeton</th>
              <th className="whitespace-nowrap px-3 py-2 text-center">
                Actions
              </th>
            </tr>
          </thead>

          {/* =====================================================
              BODY
          ===================================================== */}
          <tbody className="divide-y divide-gray-100">
            {credits.map((credit, index) => {
              const balanceNum = parseFloat(credit.balance || "0");
              const isBalanceNegative = balanceNum < 0;

              return (
                <tr
                  key={credit.id}
                  className="group transition-colors hover:bg-green-50/40"
                >
                  {/* Numéro */}
                  <td className="whitespace-nowrap px-3 py-2">
                    <span className="text-xs font-medium text-gray-400">
                      {index + 1}
                    </span>
                  </td>

                  {/* Membre */}
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold uppercase text-green-700">
                        {credit.nom_membre?.charAt(0)?.toUpperCase() ?? "M"}
                      </div>

                      {/* Informations */}
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold text-gray-800">
                          {credit.nom_membre || `Membre #${credit.membre}`}
                        </p>

                        <p className="mt-0.5 text-[10px] text-gray-400">
                          Crédit ID : #{credit.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Acompte initial */}
                  <td className="whitespace-nowrap px-3 py-2">
                    <span className="text-xs font-medium text-gray-700">
                      {credit.acompte_initial || "0"}{" "}
                      <span className="uppercase text-gray-400">
                        {credit.devise}
                      </span>
                    </span>
                  </td>

                  {/* Total Panier */}
                  <td className="whitespace-nowrap px-3 py-2">
                    <span className="text-xs text-gray-700">
                      {credit.montant_total_panier || "0"}{" "}
                      <span className="uppercase text-gray-400">
                        {credit.devise}
                      </span>
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
                      {credit.balance || "0"} {credit.devise?.toUpperCase()}
                    </span>
                  </td>

                  {/* Lignes & Remboursements */}
                  <td className="whitespace-nowrap px-3 py-2">
                    <div className="flex items-center gap-1.5 text-[11px]">
                      <span className="rounded bg-gray-100 px-1.5 py-0.5 text-gray-600">
                        {credit.lignes?.length || 0} prod.
                      </span>
                      <span className="rounded bg-blue-50 px-1.5 py-0.5 text-blue-600">
                        {credit.remboursements_cantine?.length || 0} remb.
                      </span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="whitespace-nowrap px-3 py-2 text-xs text-gray-500">
                    {credit.date || "—"}
                  </td>
                     <td className="whitespace-nowrap px-3 py-2 text-xs text-gray-500">
                    {credit.id || "#"}
                  </td>

                  {/* Actions */}
                  <td className="whitespace-nowrap px-3 py-2">
                    <div className="flex items-center justify-center gap-1">
                      {/* Voir Détails (Optionnel) */}
                      {onViewDetails && (
                        <button
                          type="button"
                          onClick={() => onViewDetails(credit)}
                          title="Détails"
                          aria-label={`Voir détails du crédit ${credit.id}`}
                          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Eye size={15} />
                        </button>
                      )}

                      {/* Modifier */}
                      <button
                        type="button"
                        onClick={() => onEdit(credit)}
                        title="Modifier"
                        aria-label={`Modifier le crédit ${credit.id}`}
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition hover:bg-green-100 hover:text-green-700"
                      >
                        <Pencil size={15} />
                      </button>

                      {/* Supprimer */}
                      <button
                        type="button"
                        onClick={() => onDelete(credit)}
                        title="Supprimer"
                        aria-label={`Supprimer le crédit ${credit.id}`}
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={15} />
                      </button>
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

export default CreditCantineList;
