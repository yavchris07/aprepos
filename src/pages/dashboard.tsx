// import ItemCardList from "../components/item-card-list";
import LoanItemList from "../components/loan-item-list";
import RootLayout from "../components/root-layout";
import TransactionItem from "../features/transactions/components/transaction-item";
import { getToken } from "../utlis/get-token";
import { useTransactions } from "../features/transactions/hooks/use-transactions";
import type { Loan, Transaction } from "../utlis/type";
import { useLoans } from "../features/loan/hooks/use-loans";

import {
  ArrowDownLeft,
  // ArrowUpRight,
  Banknote,
  CalendarCheck,
  ChevronRight,
  Coffee,
  // CircleDollarSign,
  CreditCard,
  HandCoins,
  HeartHandshake,
  PiggyBank,
  Users,
} from "lucide-react";
import { SummaryCard } from "../components/summary-card";
import { useMembers } from "../features/members/hooks/use-members";
import OperationItemList from "../components/operation-item-list";
import { useStats } from "../features/stats/hooks/use-statistics";
// import { useListMembers } from "../features/members/hooks/use-list-members";

const DashboardPage = () => {
  const token = getToken();

  const { data } = useTransactions(token ?? "");
  const { data: ln } = useLoans(token ?? "");
  const { data: mb } = useMembers(token ?? "", 1);
  const pagination = mb?.pagination;

  const { data: stats } = useStats(token ?? "");

  const transactions: Transaction[] = data?.transactions ?? [];
  // const members : Member[] =
  const loans: Loan[] = ln?.loans ?? [];

  // console.log('ZZZZZZZZZZZ',stats)

  const operations = [
    {
      title: "Compte épargne",
      description: "Solde disponible",
      value: stats?.somme_totale_compte_epargne?.toString() ?? "—",
      icon: PiggyBank,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "Emprunts",
      description: "Emprunts en cours",
      value: stats?.somme_totale_emprunt?.toString() ?? "—",
      icon: HandCoins,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Remboursements",
      description: "Remboursements effectués",
      value: stats?.somme_totale_remboursement?.toString() ?? "—",
      icon: ArrowDownLeft,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
    },
    {
      title: "Adhésions",
      description: "Cotisations & adhésions",
      value: stats?.somme_totale_adhesion?.toString() ?? "—",
      icon: Users,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      title: "Social",
      description: "Fonds social",
      value: stats?.somme_totale_social?.toString() ?? "—",
      icon: HeartHandshake,
      iconBg: "bg-rose-50",
      iconColor: "text-rose-600",
    },
    {
      title: "Cantine",
      description: "Emprunt cantine",
      value: "—",
      icon: Coffee,
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-600",
    },
  ];

  return (
    <RootLayout>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-gray-900 font-semibold text-base">
              Tableau de bord
            </h1>

            <span className="text-gray-400">/</span>

            <span className="text-gray-500 text-sm">partie principale</span>
          </div>

          <p className="text-gray-500 text-xs mt-1">
            Vue générale de votre activité au sein de CEPARCREA
          </p>
        </div>

        <div className="hidden md:flex items-center gap-2 text-xs text-gray-500">
          <CalendarCheck size={15} />
          <span>
            {new Date().getDate()} / {new Date().getMonth()} /{" "}
            {new Date().getFullYear()}
          </span>
        </div>
      </div>

      {/* TOP SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <SummaryCard
          title="Membres"
          value={pagination?.count ?? 0}
          description="Membres enregistrés"
          icon={Users}
        />

        <SummaryCard
          title="Épargne"
          value="—"
          description="Épargne totale"
          icon={PiggyBank}
        />

        <SummaryCard
          title="Emprunts"
          value={loans.length.toString()}
          description="Emprunts en cours"
          icon={HandCoins}
        />

        <SummaryCard
          title="Transactions"
          value={transactions.length.toString()}
          description="Transactions récentes"
          icon={CreditCard}
        />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-4">
        {/* LEFT / CENTER */}
        <div className="space-y-4">
          {/* OPERATIONS */}
          <section className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold text-gray-900 text-sm">
                  Mes opérations
                </h2>

                <p className="text-xs text-gray-500 mt-1">
                  Accédez rapidement aux différents services
                </p>
              </div>

              <button className="text-xs text-emerald-700 hover:text-emerald-800 font-medium flex items-center gap-1">
                Voir tout
                <ChevronRight size={14} />
              </button>
            </div>

            {/* 5 OPERATIONS */}
            <OperationItemList operations={operations} />
          </section>

          {/* TRANSACTIONS */}
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

              <button className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                Toutes les transactions
                <ChevronRight size={14} />
              </button>
            </div>

            <div className="divide-y divide-gray-100">
              {transactions.slice(0, 5).map((item, index) => (
                <TransactionItem key={index} item={item} />
              ))}

              {transactions.length === 0 && (
                <div className="py-10 text-center">
                  <CreditCard size={28} className="mx-auto text-gray-300" />

                  <p className="text-sm text-gray-500 mt-2">
                    Aucune transaction récente
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* RIGHT : LOANS */}
        <aside className="bg-white border border-gray-200 rounded-xl p-4 h-fit">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-gray-900 text-sm">
                Emprunts récents
              </h2>

              <p className="text-xs text-gray-500 mt-1">
                Derniers emprunts enregistrés
              </p>
            </div>

            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
              <HandCoins size={18} className="text-blue-600" />
            </div>
          </div>

          <LoanItemList items={loans} />

          {loans.length === 0 && (
            <div className="py-10 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-gray-50 flex items-center justify-center">
                <Banknote size={22} className="text-gray-300" />
              </div>

              <p className="text-sm font-medium text-gray-600 mt-3">
                Aucun emprunt
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Aucun emprunt récent à afficher
              </p>
            </div>
          )}

          <button className="w-full mt-4 py-2.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition">
            Voir tous les emprunts
          </button>
        </aside>
      </div>
    </RootLayout>
  );
};

export default DashboardPage;
