import { useMemo, useState } from "react";
import RootLayout from "../components/root-layout";
import type { Loan } from "../utlis/type";
import CreateLoan from "../features/loan/components/create-loan";
import ListLoans from "../features/loan/components/list-loan";
import EditLoan from "../features/loan/components/edit-loan";
import DeleteLoan from "../features/loan/components/delete-loan";
import { useLoans } from "../features/loan/hooks/use-loans";
import { getToken } from "../utlis/get-token";
import { useMembers } from "../features/members/hooks/use-members";
import {
  Plus,
  Landmark,
  Banknote,
  TrendingUp,
  Clock3,
  Search,
  X,
  CalendarDays,
  FileDown,
  ArrowBigLeft,
  ArrowBigRight,
} from "lucide-react";
import LoanItem from "../features/loan/components/loan-item";
// import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

// const LoanPage = () => {
//  const token = getToken();

//   const {data, isLoading} = useLoans(token ?? "")
//   const {data:members} = useMembers(token ?? "");

//   const loans: Loan[] = useMemo(() => data?.loans ?? [], [data?.loans]);

//   const [selectedItem, setSelectedItem] = useState<Loan | null>(null);
//   const [modal, setModal] = useState(false);
//   const [deleteModal, setDeleteModal] = useState(false);
//   const [editModal, setEditModal] = useState(false);
//   const [viewModal, setViewModal] = useState(false);

//   const handleDelete = (item: Loan) => {
//     setSelectedItem(item);
//     setDeleteModal(true);
//   };
//   const handleEdit = (item: Loan) => {
//     setSelectedItem(item);
//     setEditModal(true);
//   };
//   const handleView = (item: Loan) => {
//     setSelectedItem(item);
//     setViewModal(true);
//   };

//   console.log(viewModal);
//   console.log('LOANS :',loans);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   //Search
//   const filteredData = useMemo(() => {
//     return loans.filter((item:Loan) =>
//       String(item.membre).toLowerCase().includes(searchQuery.toLowerCase()),
//     );
//   }, [loans, searchQuery]);

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//     setCurrentPage(1);
//   };

//   // Pagination
//   const itemsPerPage = 18;

//   // Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentloans = filteredData.slice(indexOfFirstItem, indexOfLastItem);

//   const totalPages = Math.ceil(loans.length / itemsPerPage);

//   console.log(totalPages);

//   return (
//     <RootLayout>
//       <div className="flex justify-between items-center my-3">
//         <h1 className="text-gray-900 font-semibold text-sm">
//           Tableau de board /{" "}
//           <span className="text-gray-500">Emprunts</span>{" "}
//         </h1>

//         <span
//           className="bg-green-800 text-white px-3 py-1 rounded cursor-pointer"
//           onClick={() => setModal(true)}
//         >
//           Nouvelle
//         </span>
//       </div>

//       <div className="flex justify-between items-center my-6 rounded">
//         <div>
//           {" "}
//           <span className="bg-green-800 py-2 px-4 rounded text-xs text-white cursor-pointer">
//             Liste emprunts
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

//       <ListLoans
//         loading={isLoading}
//         onDelete={handleDelete}
//         onEdit={handleEdit}
//         onView={handleView}
//         loans={currentloans}
//       />

//       {modal && <CreateLoan onClose={() => setModal(false)} open={modal} />}

//       {editModal && selectedItem && (
//         <EditLoan
//           members={members?.members}
//           onClose={() => setEditModal(false)}
//           open={editModal}
//           loan={selectedItem}
//         />
//       )}
//       {deleteModal && selectedItem && (
//         <DeleteLoan
//           onClose={() => setDeleteModal(false)}
//           open={deleteModal}
//           loan={selectedItem}
//         />
//       )}
//     </RootLayout>
//   );
// };

const LoanPage = () => {
  const token = getToken();

  const { data, isLoading } = useLoans(token ?? "");
  const { data: members } = useMembers(token ?? "", 1);

  const loans: Loan[] = useMemo(() => data?.loans ?? [], [data?.loans]);

  const [selectedItem, setSelectedItem] = useState<Loan | null>(null);

  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // ============================
  // ACTIONS
  // ============================

  const handleDelete = (item: Loan) => {
    setSelectedItem(item);
    setDeleteModal(true);
  };

  const handleEdit = (item: Loan) => {
    setSelectedItem(item);
    setEditModal(true);
  };

  const handleView = (item: Loan) => {
    setSelectedItem(item);
    setViewModal(true);
  };

  // ============================
  // RECHERCHE
  // ============================

  const filteredData = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return loans;
    }

    return loans.filter((item: Loan) =>
      String(item.membre ?? "")
        .toLowerCase()
        .includes(query),
    );
  }, [loans, searchQuery]);

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

  const currentLoans = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // ============================
  // STATISTIQUES
  // ============================

  const totalLoans = loans.length;

  const totalBorrowed = useMemo(() => {
    return loans.reduce(
      (total, item) =>
        total +
        Number(
          // item.montant ??
          // item.amount ??
          // item.montant_emprunt ??
          item.montant ?? item.balance ?? item.total_a_payer ?? 0,
        ),
      0,
    );
  }, [loans]);

  const totalRemaining = useMemo(() => {
    return loans.reduce(
      (total, item) =>
        total + Number(
          // item.reste ?? 
          // item.solde ?? 
          // item.montant_restant ?? 0),
          item.balance ?? 
          item.montant ?? 
          item.total_a_payer ?? 0),
      0, 
    );
  }, [loans]);

  const totalRepaid = useMemo(() => {
    return totalBorrowed - totalRemaining;
  }, [totalBorrowed, totalRemaining]);

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
                <span className="text-gray-600">Emprunts</span>
              </div>

              <div className="mt-1">
                <h1 className="text-xl font-bold text-gray-900">
                  Gestion des emprunts
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Suivez les emprunts, les remboursements et les soldes
                  restants.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setModal(true)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-green-800 active:scale-[0.98]"
            >
              <Plus size={17} />
              Nouvel emprunt
            </button>
          </div>

          {/* ================= KPI ================= */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Nombre emprunts */}

            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Emprunts
                  </p>

                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {totalLoans.toLocaleString("fr-FR")}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    dossiers enregistrés
                  </p>
                </div>

                <div className="rounded-lg bg-green-50 p-3 text-green-700">
                  <Landmark size={20} />
                </div>
              </div>
            </div>

            {/* Montant accordé */}

            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Montant accordé
                  </p>

                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {totalBorrowed.toLocaleString("fr-FR")}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    total des emprunts
                  </p>
                </div>

                <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                  <Banknote size={20} />
                </div>
              </div>
            </div>

            {/* Remboursé */}

            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Remboursé
                  </p>

                  <p className="mt-2 text-2xl font-bold text-green-700">
                    {totalRepaid.toLocaleString("fr-FR")}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    montant déjà payé
                  </p>
                </div>

                <div className="rounded-lg bg-green-50 p-3 text-green-700">
                  <TrendingUp size={20} />
                </div>
              </div>
            </div>

            {/* Restant */}

            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Reste à payer
                  </p>

                  <p className="mt-2 text-2xl font-bold text-orange-600">
                    {totalRemaining.toLocaleString("fr-FR")}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">solde restant</p>
                </div>

                <div className="rounded-lg bg-orange-50 p-3 text-orange-600">
                  <Clock3 size={20} />
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
                  placeholder="Rechercher par membre..."
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
                emprunt(s) affiché(s)
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
            <ListLoans
              loading={isLoading}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onView={handleView}
              loans={currentLoans}
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
                emprunts
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

                <span className="min-w-22.5 rounded-lg bg-green-50 px-3 py-2 text-center text-xs font-semibold text-green-700">
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

      {modal && <CreateLoan onClose={() => setModal(false)} open={modal} />}

      {editModal && selectedItem && (
        <EditLoan
          members={members?.members}
          onClose={() => {
            setEditModal(false);
            setSelectedItem(null);
          }}
          open={editModal}
          loan={selectedItem}
        />
      )}

      {deleteModal && selectedItem && (
        <DeleteLoan
          onClose={() => {
            setDeleteModal(false);
            setSelectedItem(null);
          }}
          open={deleteModal}
          loan={selectedItem}
        />
      )}

      {viewModal && selectedItem && (
        <LoanItem
           item={selectedItem}
        />


        // <LoanItem
        //   {...({
        //     loan: selectedItem,
        //     onClose: () => {
        //       setViewModal(false);
        //       setSelectedItem(null);
        //     },
        //     open: viewModal,
        //   } as any)}
        // />
      )}
    </RootLayout>
  );
};

export default LoanPage;
