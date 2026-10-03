import {
  X,
  ShoppingBag,
  Receipt,
  User,
  Calendar,
  CreditCard,
} from "lucide-react";
import type { CreditCantine } from "../../../utlis/type";

interface CreditCantineDetailsModalProps {
  credit: CreditCantine | null;
  isOpen: boolean;
  onClose: () => void;
}

const CreditCantineDetailsModal = ({
  credit,
  isOpen,
  onClose,
}: CreditCantineDetailsModalProps) => {
  if (!isOpen || !credit) return null;

  const balanceNum = parseFloat(credit.balance || "0");
  const isBalanceNegative = balanceNum < 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
      <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col rounded-2xl bg-white shadow-xl">
        {/* =====================================================
            HEADER
        ===================================================== */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
              <Receipt size={20} />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-800">
                Détails du Crédit Cantine #{credit.id}
              </h2>
              <p className="flex items-center gap-1.5 text-xs text-gray-400">
                <Calendar size={13} />
                {credit.date || "Date non spécifiée"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>

        {/* =====================================================
            BODY (Scrollable)
        ===================================================== */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* CARTE INFOS MEMBRE ET RÉSUMÉ FINANCIER */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Membre */}
            <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
              <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                <User size={14} />
                <span>Membre</span>
              </div>
              <p className="mt-2 text-sm font-semibold text-gray-800">
                {credit.nom_membre || `Membre #${credit.membre}`}
              </p>
              <p className="text-[11px] text-gray-400">
                ID Membre : #{credit.membre}
              </p>
            </div>

            {/* Acompte & Panier */}
            <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
              <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                <CreditCard size={14} />
                <span>Acompte & Panier</span>
              </div>
              <div className="mt-2 flex justify-between text-xs">
                <span className="text-gray-500">Acompte initial :</span>
                <span className="font-semibold text-gray-700">
                  {credit.acompte_initial} {credit.devise?.toUpperCase()}
                </span>
              </div>
              <div className="mt-1 flex justify-between text-xs">
                <span className="text-gray-500">Total panier :</span>
                <span className="font-semibold text-gray-700">
                  {credit.montant_total_panier} {credit.devise?.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Balance */}
            <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
              <span className="text-xs font-medium text-gray-500">
                Solde / Balance
              </span>
              <p className="mt-2">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                    isBalanceNegative
                      ? "bg-red-100 text-red-700"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {credit.balance} {credit.devise?.toUpperCase()}
                </span>
              </p>
            </div>
          </div>

          {/* TABLEAU : LIGNES DU CRÉDIT (PRODUITS) */}
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <ShoppingBag size={14} />
              Produits commandés ({credit.lignes?.length || 0})
            </h3>

            <div className="overflow-hidden rounded-xl border border-gray-100">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
                  <tr>
                    <th className="px-3 py-2.5 font-medium">Produit</th>
                    <th className="px-3 py-2.5 font-medium text-right">
                      Quantité
                    </th>
                    <th className="px-3 py-2.5 font-medium text-right">
                      Prix Unitaire
                    </th>
                    <th className="px-3 py-2.5 font-medium text-right">
                      Sous-total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {credit.lignes?.length > 0 ? (
                    credit.lignes.map((ligne) => (
                      <tr key={ligne.id} className="hover:bg-gray-50/50">
                        <td className="px-3 py-2.5">
                          <p className="font-semibold text-gray-800">
                            {ligne.nom_produit || `Produit #${ligne.produit}`}
                          </p>
                        </td>
                        <td className="px-3 py-2.5 text-right font-medium">
                          {ligne.quantite}
                        </td>
                        <td className="px-3 py-2.5 text-right">
                          {ligne.prix_unitaire_applique}{" "}
                          {credit.devise?.toUpperCase()}
                        </td>
                        <td className="px-3 py-2.5 text-right font-semibold text-gray-800">
                          {ligne.sous_total} {credit.devise?.toUpperCase()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="py-4 text-center text-gray-400"
                      >
                        Aucune ligne trouvée.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* TABLEAU : HISTORIQUE DES REMBOURSEMENTS */}
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <Receipt size={14} />
              Remboursements reçus ({credit.remboursements_cantine?.length || 0}
              )
            </h3>

            <div className="overflow-hidden rounded-xl border border-gray-100">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
                  <tr>
                    <th className="px-3 py-2.5 font-medium"># ID</th>
                    <th className="px-3 py-2.5 font-medium">Date</th>
                    <th className="px-3 py-2.5 font-medium text-right">
                      Montant
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {credit.remboursements_cantine?.length > 0 ? (
                    credit.remboursements_cantine.map((remb) => (
                      <tr key={remb.id} className="hover:bg-gray-50/50">
                        <td className="px-3 py-2.5 font-medium text-gray-500">
                          #{remb.id}
                        </td>
                        <td className="px-3 py-2.5 text-gray-600">
                          {remb.date}
                        </td>
                        <td className="px-3 py-2.5 text-right font-semibold text-emerald-600">
                          +{remb.montant} {remb.devise?.toUpperCase()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={3}
                        className="py-4 text-center text-gray-400"
                      >
                        Aucun remboursement enregistré.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* =====================================================
            FOOTER
        ===================================================== */}
        <div className="flex justify-end border-t border-gray-100 px-6 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-gray-100 px-4 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-200"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreditCantineDetailsModal;
