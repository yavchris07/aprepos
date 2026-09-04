import { Eye, Trash2 } from "lucide-react";
import type { Account } from "../../../utlis/type";
import Loading from "../../../components/loading";
import { formatAccountNumber } from "../../../utlis/fomatted-number";

interface AccountProps {
  accounts: Account[];
  loading: boolean;
  onDelete: (account: Account) => void;
  onView: (account: Account) => void;
}

const ListAccount = ({ accounts, loading, onDelete, onView }: AccountProps) => {
  if (loading) {
    return <Loading />;
  }

  if (!accounts.length) {
    return (
      <div className="my-3 flex min-h-50 items-center justify-center rounded-xl border border-gray-200 bg-white">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-600">
            Aucun compte trouvé
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Aucun compte d'épargne ne correspond à votre recherche.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-3 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Table responsive */}

      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-215 text-left text-sm text-gray-600">
          {/* Header */}

          <thead className="border-b border-gray-200 bg-gray-50">
            <tr className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
              <th className="whitespace-nowrap px-3 py-2">#</th>

              <th className="whitespace-nowrap px-3 py-2">Membre</th>

              <th className="whitespace-nowrap px-3 py-2">Numéro de compte</th>

              <th className="whitespace-nowrap px-3 py-2 text-right">Solde</th>

              <th className="whitespace-nowrap px-3 py-2 text-center">
                Actions
              </th>
            </tr>
          </thead>

          {/* Body */}

          <tbody className="divide-y divide-gray-100">
            {accounts.map((account, index) => (
              <tr
                key={account.id}
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
                      {account.membre_nom?.charAt(0)?.toUpperCase() ?? "M"}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-gray-800">
                        {account.membre_nom || "Membre inconnu"}
                      </p>

                      <p className="mt-0.5 text-[10px] text-gray-400">
                        Compte d'épargne
                      </p>
                    </div>
                  </div>
                </td>

                {/* Numéro compte */}

                <td className="whitespace-nowrap px-3 py-2">
                  <span className="inline-flex items-center rounded-lg bg-gray-100 px-3 py-1.5 font-mono text-xs font-semibold tracking-wide text-gray-700">
                    {formatAccountNumber(account.numero_compte)}
                  </span>
                </td>

                {/* Balance */}

                <td className="whitespace-nowrap px-3 py-2 text-right">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-bold text-gray-800">
                      {account.balance}
                    </span>

                    <span className="text-[10px] text-gray-400">
                      Solde disponible
                    </span>
                  </div>
                </td>

                {/* Actions */}

                <td className="whitespace-nowrap px-3 py-2">
                  <div className="flex items-center justify-center gap-1">
                    {/* Voir */}

                    <button
                      type="button"
                      onClick={() => onView(account)}
                      title="Voir le compte"
                      aria-label={`Voir le compte de ${account.membre_nom}`}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition hover:bg-green-100 hover:text-green-700"
                    >
                      <Eye size={15} />
                    </button>

                    {/* Supprimer */}

                    <button
                      type="button"
                      onClick={() => onDelete(account)}
                      title="Supprimer"
                      aria-label={`Supprimer le compte de ${account.membre_nom}`}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}

      <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/50 px-5 py-3">
        <p className="text-[11px] text-gray-400">
          {accounts.length} compte{accounts.length > 1 ? "s" : ""}
          affiché{accounts.length > 1 ? "s" : ""}
        </p>

        <p className="text-[11px] text-gray-400">Comptes d'épargne</p>
      </div>
    </div>
  );
};

export default ListAccount;
