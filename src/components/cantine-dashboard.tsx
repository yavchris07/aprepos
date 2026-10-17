import { CreditCard, HandCoins, PiggyBank, ShoppingBasket, ShoppingCart } from "lucide-react";
import { SummaryCard } from "./summary-card";
import type { RefundCantine } from "../features/refund-cantine/type";
import RefundCantineItem from "../features/refund-cantine/components/refund-cantine-item";

export type Paginations = {
  count: number;
  next: string;
  previous: string;
};

type cantineDashboardProps = {
  products: number;
  credits: number;
  CreditLines: number;
  refunds: RefundCantine[];
};

const CantineDashboard = ({
  products,
  credits,
  CreditLines,
  refunds,
}: cantineDashboardProps) => {
  
  const operations = [
    {
      title: "Produits",
      description: "Produits dans le stock",
      value: products.toString() ?? 0,
      icon: ShoppingBasket,
    },
    {
      title: "crédits",
      description: "crédits pris ",
      value: credits.toString() ?? 0,
      icon: HandCoins,
    },
    {
      title: "Panier en cantine",
      description: "Le produits pris en cantine",
      value: CreditLines.toString() ?? "—",
      icon: ShoppingCart,
    },
    {
      title: "Remboursés",
      description: "Remboursement faits",
      value: refunds.length.toString() ?? "—",
      icon: PiggyBank,
    },
  ];

  return (
    <div>
    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {operations.map((item) => (
          <SummaryCard
            title={item.title}
            value={item.value}
            description={item.description}
            icon={item.icon}
          />
        ))}
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-4">
        <div className="space-y-4">
          {/* CREDIT CANTINE */}
          <section className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold text-gray-900 text-sm">
                  Remboursement récents
                </h2>

                <p className="text-xs text-gray-500 mt-1">
                  Les dernières opérations enregistrées
                </p>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {refunds.slice(0, 7).map((item, index) => (
                <RefundCantineItem key={index} item={item} />
              ))}

              {refunds.length === 0 && (
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
