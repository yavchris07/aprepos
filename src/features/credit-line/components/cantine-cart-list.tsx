import type { CantineCart } from "../../../utlis/type";
import Loading from "../../../components/loading";

interface cantineCartListProps {
  cantineCarts: CantineCart[];
  loading: boolean;
  //   onDelete: (credit: CreditCantine) => void;
  //   onEdit: (credit: CreditCantine) => void;
  //   onViewDetails?: (credit: CreditCantine) => void;
  //   onCart: (credit: CreditCantine) => void;
}

const CantineCartList = ({ cantineCarts, loading }: cantineCartListProps) => {
  if (loading) {
    return <Loading />;
  }

  if (!cantineCarts.length) {
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
          {/* ==================================================
              HEADER
             ==================================================== */}
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              <th className="whitespace-nowrap px-3 py-2">#</th>
              <th className="whitespace-nowrap px-3 py-2">Nom produit</th>
              <th className="whitespace-nowrap px-3 py-2">Prix unitaire </th>
              <th className="whitespace-nowrap px-3 py-2">Quantite Panier</th>
              <th className="whitespace-nowrap px-3 py-2">Sous total</th>
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
            {cantineCarts.map((cantineCart, index) => {
              const balanceNum = parseFloat(cantineCart.sous_total || "0");
              const isBalanceNegative = balanceNum < 0;

              return (
                <tr
                  key={cantineCart.id}
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
                      {/* Informations */}
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold text-gray-800">
                          {cantineCart.nom_produit || "-"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Acompte initial */}
                  <td className="whitespace-nowrap px-3 py-2">
                    <span className="text-xs font-medium text-gray-700">
                      {cantineCart.prix_unitaire_applique || "0"}{" "}
                      {/* <span className="uppercase text-gray-400">
                        {credit.devise}
                      </span> */}
                    </span>
                  </td>

                  {/* Total Panier */}
                  <td className="whitespace-nowrap px-3 py-2">
                    <span className="text-xs text-gray-700 text-center">
                      {cantineCart.quantite || "0"}{" "}
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
                      {cantineCart.sous_total || "0"}
                    </span>
                  </td>

                  {/* Lignes & Remboursements */}
                  <td className="whitespace-nowrap px-3 py-2">
                    <span className="rounded bg-gray-100 px-1.5 py-0.5 text-gray-600">
                      {cantineCart.credit_cantine || "-"}
                    </span>
                  </td>

                  {/* Date */}
                  {/* <td className="whitespace-nowrap px-3 py-2 text-xs text-gray-500">
                    {credit.date || "—"}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 text-xs text-gray-500">
                    {credit.id || "#"}
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CantineCartList;
