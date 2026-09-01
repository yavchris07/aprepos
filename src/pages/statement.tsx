import RootLayout from "../components/root-layout";
import { useMemo, useState } from "react";
import TransactionStatement from "../features/transactions/components/transaction-statement";
import { useTransactions } from "../features/transactions/hooks/use-transactions";
import { getToken } from "../utlis/get-token";
import type { Transaction } from "../utlis/type";
import { ArrowLeftRight, CalendarDays, Download, FileText, Search, TrendingDown, TrendingUp, WalletCards, X } from "lucide-react";
// import Pagination from "../components/pagination";

// const StatementPage = () => {
//   const token = getToken();
//   const { data } = useTransactions(token ?? "");
//   const transactions: Transaction[] = useMemo(
//     () => data?.transactions ?? [],
//     [data?.transactions],
//   );

//   const [searchQuery, setSearchQuery] = useState("");

//   //Search
//   const filteredData = useMemo(() => {
//     return transactions.filter((item) =>
//       String(item.compte).includes(searchQuery),
//     );
//   }, [searchQuery, transactions]);

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//     // setCurrentPage(1);
//   };

//   return (
//     <RootLayout>
//       <div className="flex justify-between items-center my-3">
//         <h1 className="text-gray-900 font-semibold text-sm">
//           Tableau de board /{" "}
//           <span className="text-gray-500"> Relevé de compte</span>{" "}
//         </h1>
//       </div>

//       <div className="flex justify-between items-center my-6 rounded">
//         <div>
//           {" "}
//           <span className="bg-green-800 py-2 px-4 rounded text-xs text-white cursor-pointer">
//             Relevé
//           </span>{" "}
//         </div>
//         <input
//           type="text"
//           placeholder="Recherche par nom !"
//           className="border border-gray-400 py-2 pl-2 rounded"
//           value={searchQuery}
//           onChange={handleSearchChange}
//         />
//       </div>

//       <TransactionStatement loading={false} transactions={filteredData} />

//       {/* <Pagination filtered={filteredData} items={tr} /> */}
//     </RootLayout>
//   );
// };






const StatementPage = () => {
  const token = getToken();

  const { data, isLoading } = useTransactions(token ?? "");

  const transactions: Transaction[] = useMemo(
    () => data?.transactions ?? [],
    [data?.transactions],
  );

  const [searchQuery, setSearchQuery] = useState("");

  // ============================
  // RECHERCHE
  // ============================

  const filteredData = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return transactions;
    }

    return transactions.filter((item) =>
      String(item.compte ?? "")
        .toLowerCase()
        .includes(query),
    );
  }, [searchQuery, transactions]);

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchQuery(e.target.value);
  };

  // ============================
  // STATISTIQUES
  // ============================

  const totalTransactions = transactions.length;

  const totalCredit = useMemo(() => {
    return transactions.reduce(
      (total, item) =>
        total + Number(item.credit ?? 0),
      0,
    );
  }, [transactions]);

  const totalDebit = useMemo(() => {
    return transactions.reduce(
      (total, item) =>
        total + Number(item.debit ?? 0),
      0,
    );
  }, [transactions]);

  const solde = totalCredit - totalDebit;

  return (
    <RootLayout>
      <div className="min-h-screen bg-gray-50/60">
        <div className="space-y-5">

          {/* ================= HEADER ================= */}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>Tableau de bord</span>
                <span>/</span>
                <span className="text-gray-600">
                  Relevé de compte
                </span>
              </div>

              <div className="mt-1">
                <h1 className="text-xl font-bold text-gray-900">
                  Relevé de compte
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Consultez l'historique des mouvements et des opérations.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-green-800 active:scale-[0.98]"
            >
              <FileText size={17} />
              Générer le relevé
            </button>

          </div>

          {/* ================= KPI ================= */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* Transactions */}

            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Transactions
                  </p>

                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {totalTransactions}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    opérations enregistrées
                  </p>
                </div>

                <div className="rounded-lg bg-green-50 p-3 text-green-700">
                  <ArrowLeftRight size={20} />
                </div>

              </div>
            </div>

            {/* Crédit */}

            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Total entrées
                  </p>

                  <p className="mt-2 text-2xl font-bold text-green-700">
                    {totalCredit.toLocaleString("fr-FR")}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    crédits
                  </p>
                </div>

                <div className="rounded-lg bg-green-50 p-3 text-green-700">
                  <TrendingUp size={20} />
                </div>

              </div>
            </div>

            {/* Débit */}

            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Total sorties
                  </p>

                  <p className="mt-2 text-2xl font-bold text-red-600">
                    {totalDebit.toLocaleString("fr-FR")}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    débits
                  </p>
                </div>

                <div className="rounded-lg bg-red-50 p-3 text-red-600">
                  <TrendingDown size={20} />
                </div>

              </div>
            </div>

            {/* Solde */}

            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Solde
                  </p>

                  <p
                    className={`mt-2 text-2xl font-bold ${
                      solde >= 0
                        ? "text-gray-900"
                        : "text-red-600"
                    }`}
                  >
                    {solde.toLocaleString("fr-FR")}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    solde net
                  </p>
                </div>

                <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                  <WalletCards size={20} />
                </div>

              </div>
            </div>

          </div>

          {/* ================= FILTRES ================= */}

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div className="relative w-full lg:w-auto">

                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Rechercher par compte..."
                  className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-10 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-100 lg:w-80"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={15} />
                  </button>
                )}

              </div>

              <div className="flex items-center gap-2">

                <button
                  type="button"
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-gray-200 px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  <CalendarDays size={16} />
                  Période
                </button>

                <button
                  type="button"
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-gray-200 px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  <Download size={16} />
                  Exporter
                </button>

              </div>

            </div>

            {/* Résultats */}

            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">

              <p className="text-xs text-gray-500">
                <span className="font-semibold text-gray-700">
                  {filteredData.length}
                </span>{" "}
                mouvement(s) affiché(s)
              </p>

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-xs font-medium text-green-700 hover:text-green-800"
                >
                  Effacer la recherche
                </button>
              )}

            </div>

          </div>

          {/* ================= RELEVÉ ================= */}

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

            <TransactionStatement
              loading={isLoading}
              transactions={filteredData}
            />

          </div>

        </div>
      </div>
    </RootLayout>
  );
};

export default StatementPage;
