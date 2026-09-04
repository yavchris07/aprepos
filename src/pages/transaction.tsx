import { useMemo, useState } from "react";
import RootLayout from "../components/root-layout";
import type { Account, Transaction } from "../utlis/type";
import ListTransaction from "../features/transactions/components/list-transactions";
import EditTransaction from "../features/transactions/components/edit-transaction";
import DeleteTransaction from "../features/transactions/components/delete-transaction";
import CreateTransaction from "../features/transactions/components/create-transaction";
import { useTransactions } from "../features/transactions/hooks/use-transactions";
import { getToken } from "../utlis/get-token";
import {
  Plus,
  ArrowLeftRight,
  TrendingUp,
  TrendingDown,
  WalletCards,
  Search,
  X,
  ArrowDownToLine,
  ArrowUpFromLine,
  CalendarDays,
  FileDown,
  ArrowBigLeft,
  ArrowBigRight,
} from "lucide-react";

const TransactionPage = () => {
  const token = getToken();

  const { data, isLoading, isFetching } = useTransactions(token ?? "");

  const accounts: Account[] = [];

  const transactions: Transaction[] = useMemo(
    () => data?.transactions ?? [],
    [data?.transactions],
  );

  const pagination = data?.pagination;
  console.log(pagination);

  const [selectedItem, setSelectedItem] = useState<Transaction | null>(null);

  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // ============================
  // ACTIONS
  // ============================

  const handleDelete = (item: Transaction) => {
    setSelectedItem(item);
    setDeleteModal(true);
  };

  const handleEdit = (item: Transaction) => {
    setSelectedItem(item);
    setEditModal(true);
  };

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // ============================
  // PAGINATION
  // ============================

  const itemsPerPage = 18;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;

  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentTransactions = filteredData.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  // ============================
  // STATISTIQUES
  // ============================

  const totalTransactions = transactions.length;

  const deposits = useMemo(() => {
    return transactions.filter((item) =>
      String(item.type_transaction ?? item.type_transaction ?? "")
        .toLowerCase()
        .includes("depot"),
    );
  }, [transactions]);

  const withdrawals = useMemo(() => {
    return transactions.filter((item) =>
      String(item.type_transaction ?? item.type_transaction ?? "")
        .toLowerCase()
        .includes("retrait"),
    );
  }, [transactions]);

  const totalDeposits = useMemo(() => {
    return deposits.reduce(
      (total, item) =>
        total +
        Number(
          (item.montant ?? item.montant ?? item.type_transaction === "depot")
            ? 0
            : 0,
        ),
      0,
    );
  }, [deposits]);

  const totalWithdrawals = useMemo(() => {
    return withdrawals.reduce(
      (total, item) =>
        total +
        Number(
          (item.montant ?? item.montant ?? item.type_transaction === "retrait")
            ? 0
            : 0,
        ),
      0,
    );
  }, [withdrawals]);

  const volume = totalDeposits + totalWithdrawals;

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
                <span className="text-gray-600">Transactions</span>
              </div>

              <div className="mt-1">
                <h1 className="text-xl font-bold text-gray-900">
                  Transactions
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Opérations de dépôt et de retrait des comptes épargne.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setModal(true)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-green-800 active:scale-[0.98]"
            >
              <Plus size={17} />
              Nouvelle transaction
            </button>
          </div>

          {/* ================= KPI ================= */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {/* Transactions */}

            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Transactions
                  </p>

                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {totalTransactions.toLocaleString("fr-FR")}
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

            {/* Dépôts */}

            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Dépôts
                  </p>

                  <p className="mt-2 text-2xl font-bold text-green-700">
                    {totalDeposits.toLocaleString("fr-FR")}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">argent entrant</p>
                </div>

                <div className="rounded-lg bg-green-50 p-3 text-green-700">
                  <TrendingUp size={20} />
                </div>
              </div>
            </div>

            {/* Retraits */}

            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Retraits
                  </p>

                  <p className="mt-2 text-2xl font-bold text-red-600">
                    {totalWithdrawals.toLocaleString("fr-FR")}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">argent sortant</p>
                </div>

                <div className="rounded-lg bg-red-50 p-3 text-red-600">
                  <TrendingDown size={20} />
                </div>
              </div>
            </div>

            {/* Volume */}

            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Volume total
                  </p>

                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {volume.toLocaleString("fr-FR")}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    dépôts + retraits
                  </p>
                </div>

                <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                  <WalletCards size={20} />
                </div>
              </div>
            </div>

            {/* ================= TOOLBAR ================= */}

            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="">
                {/* Recherche */}

                <div className="relative w-full lg:w-auto">
                  <Search
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    placeholder="Rechercher..."
                    className="h-10 rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-10 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-100 lg:w-53"
                    onChange={handleSearchChange}
                    value={searchQuery}
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
              </div>

              {/* Résultats */}

              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                <p className="text-xs text-gray-500">
                  <span className="font-semibold text-gray-700">
                    {filteredData.length}
                  </span>{" "}
                  transaction(s) affichée(s)
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

            {/* bottons */}

            <div className="rounded-xl border border-gray-200 bg-white p-2 shadow-sm">
              <div className="">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    className="inline-flex h-7 items-center gap-2 rounded-lg border border-gray-200 px-3 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    <ArrowDownToLine size={16} />
                    Dépôts
                  </button>

                  <button
                    type="button"
                    className="inline-flex h-7 items-center gap-2 rounded-lg border border-gray-200 px-3 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    <ArrowUpFromLine size={16} />
                    Retraits
                  </button>

                  <button
                    type="button"
                    className="inline-flex h-7 items-center gap-2 rounded-lg border border-gray-200 px-3 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    <CalendarDays size={16} />
                    Période
                  </button>

                  <button
                    type="button"
                    className="inline-flex h-7 items-center gap-2 rounded-lg border border-gray-200 px-3 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    <FileDown size={16} />
                    Exporter
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ================= LISTE ================= */}

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <ListTransaction
              loading={isLoading}
              onDelete={handleDelete}
              onEdit={handleEdit}
              transactions={currentTransactions}
            />
          </div>

          {/* ================= PAGINATION ================= */}

          {totalPages > 1 && (
            <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-gray-500">
                Total :{" "}
                <span className="font-semibold text-gray-700">
                  {filteredData.length}
                </span>{" "}
                transactions
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentPage === 1 || isLoading || isFetching}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowBigLeft size={15} />
                </button>

                <span className="min-w-22.5 rounded-lg bg-green-50 px-3 py-2 text-center text-xs font-semibold text-green-700">
                  Page {currentPage} / {totalPages}
                </span>

                <button
                  type="button"
                  disabled={
                    currentPage === totalPages || isLoading || isFetching
                  }
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowBigRight size={15} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= MODALES ================= */}

      {modal && (
        <CreateTransaction onClose={() => setModal(false)} open={modal} />
      )}

      {editModal && selectedItem && (
        <EditTransaction
          accounts={accounts}
          onClose={() => {
            setEditModal(false);
            setSelectedItem(null);
          }}
          transaction={selectedItem}
          open={editModal}
        />
      )}

      {deleteModal && selectedItem && (
        <DeleteTransaction
          transaction={selectedItem}
          onClose={() => {
            setDeleteModal(false);
            setSelectedItem(null);
          }}
          open={deleteModal}
        />
      )}
    </RootLayout>
  );
};

export default TransactionPage;
