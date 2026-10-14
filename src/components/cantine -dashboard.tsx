import { CreditCard, HandCoins, PiggyBank, ShoppingBasket } from "lucide-react";
import { SummaryCard } from "./summary-card";
import type { CreditCantine, LigneCreditCantine, Product } from "../utlis/type";
import TransactionItem from "../features/transactions/components/transaction-item";

type cantineDashboardProps = {
  products: Product[];
  credits: CreditCantine[];
  CreditLines: LigneCreditCantine[];
  refunds: any[];
};

const CantineDashboard = ({
  products,
  credits,
  CreditLines,
  refunds,
}: cantineDashboardProps) => {
  return (
    <div>
      {/* TOP SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <SummaryCard
          title="Produits"
          value={products.length.toString() ?? 0}
          description="Produits dans le stock"
          icon={ShoppingBasket}
        />

        <SummaryCard
          title="crédits"
          value={credits.length.toString() ?? 0}
          description="crédits pris"
          icon={PiggyBank}
        />

        <SummaryCard
          title="Line crédits"
          value={CreditLines.length.toString()}
          description="le produits cantine pris"
          icon={HandCoins}
        />

        <SummaryCard
          title="Remboursés"
          value={refunds.length.toString()}
          description="Remboursement faits"
          icon={PiggyBank}
        />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-4">
        <div className="space-y-4">
          {/* CREDIT CANTINE */}
          <section className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold text-gray-900 text-sm">
                  Transactions récentes
                </h2>

                <p className="text-xs text-gray-500 mt-1">
                  Les dernières opérations enregistrées
                </p>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {credits.slice(0, 7).map((item, index) => (
                <TransactionItem key={index} item={item} />
              ))}

              {credits.length === 0 && (
                <div className="py-10 text-center">
                  <CreditCard size={28} className="mx-auto text-gray-300" />

                  <p className="text-sm text-gray-500 mt-2">
                    Aucune opération récente
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CantineDashboard;
