import { useMemo, useState } from "react";
import RootLayout from "../components/root-layout";
import CreateRefund from "../features/refund/components/create-refund";
import ListRefund from "../features/refund/components/list-refund";
import type { Member, Refund } from "../utlis/type";
import EditRefund from "../features/refund/components/edit-refund";
import DeleteRefund from "../features/refund/components/delete-refund";
import {
  ArrowBigLeft,
  ArrowBigRight,
  Banknote,
  Calculator,
  CalendarDays,
  FileDown,
  Plus,
  RefreshCcw,
  Search,
  X,
} from "lucide-react";
import { getToken } from "../utlis/get-token";
import { useRefunds } from "../features/refund/hooks/use-refunds";
import { useMembers } from "../features/members/hooks/use-members";
import RefundItem from "../features/refund/components/refund-item";

// const RefundPage = () => {
//   const token = getToken();
//   const { data } = useRefunds(token ?? "");
//   const { data: mb } = useMembers(token ?? "");
//   const refunds: Refund[] = useMemo(() => data?.refunds ?? [], [data?.refunds]);
//   const members: Member[] = mb?.members ?? [];

//   const [selectedItem, setSelectedItem] = useState<Refund | null>(null);
//   const [modal, setModal] = useState(false);
//   const [deleteModal, setDeleteModal] = useState(false);
//   const [editModal, setEditModal] = useState(false);
//   const [viewModal, setViewModal] = useState(false);

//   const handleDelete = (item: Refund) => {
//     setSelectedItem(item);
//     setDeleteModal(true);
//   };
//   const handleEdit = (item: Refund) => {
//     setSelectedItem(item);
//     setEditModal(true);
//   };
//   const handleView = (item: Refund) => {
//     setSelectedItem(item);
//     setViewModal(true);
//   };

//   console.log(viewModal);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   //Search
//   const filteredData = useMemo(() => {
//     return refunds.filter((item) =>
//       String(item.emprumt).toLowerCase().includes(searchQuery.toLowerCase()),
//     );
//   }, [refunds, searchQuery]);

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//     setCurrentPage(1);
//   };

//   // Pagination
//   const itemsPerPage = 18;

//   // Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentRefunds = filteredData.slice(indexOfFirstItem, indexOfLastItem);

//   const totalPages = Math.ceil(refunds.length / itemsPerPage);

//   return (
//     <RootLayout>
//       <div className="flex justify-between items-center my-3">
//         <h1 className="text-gray-900 font-semibold text-sm">
//           Tableau de board /{" "}
//           <span className="text-gray-500">Remboursement</span>{" "}
//         </h1>

//         <span
//           className="bg-green-800 text-white px-3 py-1 rounded cursor-pointer"
//           onClick={() => setModal(true)}
//         >
//           Nouveau
//         </span>
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
//           placeholder="Recherchez par nom !"
//           className="border border-gray-400 py-2 pl-2 rounded"
//           onChange={handleSearchChange}
//           value={searchQuery}
//         />
//       </div>

//       <ListRefund
//         loading={false}
//         onDelete={handleDelete}
//         onEdit={handleEdit}
//         onView={handleView}
//         refunds={currentRefunds}
//       />

//       {refunds.length > 18 && (
//         <div className="flex gap-2 text-gray-500 w-max px-4 py-2 rounded mt-6">
//           <button
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage((prev) => prev - 1)}
//             className="bg-green-700 text-white p-2 rounded-full cursor-pointer hover:bg-green-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
//           >
//             <ArrowBigLeft size={10} />
//           </button>
//           <span>
//             Page {currentPage} / {totalPages}
//           </span>
//           <button
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage((prev) => prev + 1)}
//             className="bg-green-700 text-white p-2 rounded-full cursor-pointer hover:bg-green-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
//           >
//             <ArrowBigRight size={10} />
//           </button>
//         </div>
//       )}

//       {modal && <CreateRefund onClose={() => setModal(false)} open={modal} />}

//       {editModal && selectedItem && (
//         <EditRefund
//           members={members}
//           onClose={() => setEditModal(false)}
//           open={editModal}
//           refund={selectedItem}
//         />
//       )}
//       {deleteModal && selectedItem && (
//         <DeleteRefund
//           onClose={() => setDeleteModal(false)}
//           open={deleteModal}
//           refund={selectedItem}
//         />
//       )}
//     </RootLayout>
//   );
// };

const RefundPage = () => {
  const token = getToken();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useRefunds(token ?? "");
  const { data: mb } = useMembers(token ?? "", currentPage);

  const refunds: Refund[] = useMemo(() => data?.refunds ?? [], [data?.refunds]);

  const members: Member[] = mb?.members ?? [];

  const [selectedItem, setSelectedItem] = useState<Refund | null>(null);

  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);

  // ============================
  // ACTIONS
  // ============================

  const handleDelete = (item: Refund) => {
    setSelectedItem(item);
    setDeleteModal(true);
  };

  const handleEdit = (item: Refund) => {
    setSelectedItem(item);
    setEditModal(true);
  };

  const handleView = (item: Refund) => {
    setSelectedItem(item);
    setViewModal(true);
  };

  // ============================
  // RECHERCHE
  // ============================

  const filteredData = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return refunds;
    }

    return refunds.filter((item) =>
      String(item.emprumt ?? "")
        .toLowerCase()
        .includes(query),
    );
  }, [refunds, searchQuery]);

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

  const currentRefunds = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // ============================
  // STATISTIQUES
  // ============================

  const totalRefunds = refunds.length;

  const totalAmount = useMemo(() => {
    return refunds.reduce(
      (total, item) =>
        total +
        Number(
          // item.montant ??
          // item.amount ??
          // item.montant_remboursement ??
          item.montant ?? item.emprumt ?? item.montant ?? 0,
        ),
      0,
    );
  }, [refunds]);

  const displayedAmount = useMemo(() => {
    return filteredData.reduce(
      (total, item) =>
        total +
        Number(item.montant ?? item.emprumt ?? item.emprumt ?? 0),
      0,
    );
  }, [filteredData]);

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
                <span className="text-gray-600">Remboursements</span>
              </div>

              <div className="mt-1">
                <h1 className="text-xl font-bold text-gray-900">
                  Gestion des remboursements
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Suivez les remboursements effectués sur les emprunts.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setModal(true)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-green-800 active:scale-[0.98]"
            >
              <Plus size={17} />
              Nouveau remboursement
            </button>
          </div>

          {/* ================= KPI ================= */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Nombre */}

            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Total remboursements
                  </p>

                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {totalRefunds.toLocaleString("fr-FR")}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    opérations enregistrées
                  </p>
                </div>

                <div className="rounded-lg bg-green-50 p-3 text-green-700">
                  <RefreshCcw size={20} />
                </div>
              </div>
            </div>

            {/* Montant */}

            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Montant remboursé
                  </p>

                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {totalAmount.toLocaleString("fr-FR")}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">montant total</p>
                </div>

                <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                  <Banknote size={20} />
                </div>
              </div>
            </div>

            {/* Filtre */}

            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Résultat actuel
                  </p>

                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {displayedAmount.toLocaleString("fr-FR")}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">après filtrage</p>
                </div>

                <div className="rounded-lg bg-orange-50 p-3 text-orange-600">
                  <Calculator size={20} />
                </div>
              </div>
            </div>
          </div>

          {/* ================= TOOLBAR ================= */}

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* Recherche */}

              <div className="relative w-full lg:w-auto">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Rechercher par emprunt..."
                  className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-10 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-100 lg:w-80"
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

              {/* Actions */}

              <div className="flex flex-wrap items-center gap-2">
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
                  <FileDown size={16} />
                  Relevé
                </button>
              </div>
            </div>

            {/* Résultats */}

            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
              <p className="text-xs text-gray-500">
                <span className="font-semibold text-gray-700">
                  {filteredData.length}
                </span>{" "}
                remboursement(s) affiché(s)
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

          {/* ================= LISTE ================= */}

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <ListRefund
              loading={isLoading}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onView={handleView}
              refunds={currentRefunds}
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
                remboursements
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowBigLeft size={15} />
                </button>

                <span className="min-w-[90px] rounded-lg bg-green-50 px-3 py-2 text-center text-xs font-semibold text-green-700">
                  Page {currentPage} / {totalPages}
                </span>

                <button
                  type="button"
                  disabled={currentPage === totalPages}
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

      {modal && <CreateRefund onClose={() => setModal(false)} open={modal} />}

      {editModal && selectedItem && (
        <EditRefund
          members={members}
          onClose={() => {
            setEditModal(false);
            setSelectedItem(null);
          }}
          open={editModal}
          refund={selectedItem}
        />
      )}

      {deleteModal && selectedItem && (
        <DeleteRefund
          onClose={() => {
            setDeleteModal(false);
            setSelectedItem(null);
          }}
          open={deleteModal}
          refund={selectedItem}
        />
      )}

      {viewModal && selectedItem && (
        <RefundItem
          // refund={selectedItem}
          // onClose={() => {
          //   setViewModal(false);
          //   setSelectedItem(null);
          // }}
          // open={viewModal}
          item={selectedItem}
        />
      )}
    </RootLayout>
  );
};

export default RefundPage;
