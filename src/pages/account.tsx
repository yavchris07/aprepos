import { useMemo, useState } from "react";
import RootLayout from "../components/root-layout";
import ListAccount from "../features/account/components/list-account";
import type { Account } from "../utlis/type";
import CreateAccount from "../features/account/components/create-account";
import DeleteAccount from "../features/account/components/delete-account";
import { ArrowBigLeft, ArrowBigRight, Banknote, Plus, Search, Users, Wallet } from "lucide-react";
// import { useMembers } from "../features/members/hooks/use-members";
import { useAccounts } from "../features/account/hooks/use-accounts";
import { getToken } from "../utlis/get-token";
import AccountItem from "../features/account/components/account-item";
import AccountPDF from "../components/pdf/accounts";

// const AccountPage = () => {
//   const token = getToken();
//   // const { data: mb } = useMembers(token ?? "");
//   const { data, isLoading } = useAccounts(token ?? "");

//   // const members: Member[] = mb?.members ?? [];
//   const accounts: Account[] = data?.accounts ?? [];
//   const pagination = data?.pagination;

//   console.log(pagination);

//   const [selectedItem, setSelectedItem] = useState<Account | null>(null);
//   const [modal, setModal] = useState(false);
//   const [deleteModal, setDeleteModal] = useState(false);
//   const [editModal, setEditModal] = useState(false);

//   const handleDelete = (item: Account) => {
//     setSelectedItem(item);
//     setDeleteModal(true);
//   };
//   const handleView = (item: Account) => {
//     setSelectedItem(item);
//     setEditModal(true);
//   };

//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   //Search
//   const filteredData = useMemo(() => {
//     return accounts.filter((item) =>
//       item.membre_nom?.toLowerCase().includes(searchQuery.toLowerCase()),
//     );
//   }, [accounts, searchQuery]);

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//     setCurrentPage(1);
//   };

//   // Pagination
//   const itemsPerPage = 19;

//   // Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentAccounts = filteredData.slice(indexOfFirstItem, indexOfLastItem);

//   const totalPages = Math.ceil(accounts.length / itemsPerPage);

//   console.log();
//   return (
//     <RootLayout>
//       <div className="flex justify-between items-center my-3">
//         <h1 className="text-gray-900 font-semibold text-sm">
//           Tableau de board /{" "}
//           <span className="text-gray-500">Compte epargne</span>{" "}
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
//           <AccountPDF data={accounts} />
//         </div>
//         <input
//           type="text"
//           placeholder="Recherchez par nom !"
//           className="border border-gray-400 py-2 pl-2 rounded"
//           onChange={handleSearchChange}
//           value={searchQuery}
//         />
//       </div>

//       <ListAccount
//         accounts={currentAccounts}
//         loading={isLoading}
//         onDelete={handleDelete}
//         // onEdit={handleEdit}
//         onView={handleView}
//       />

//       {/* Pagination */}
//       {accounts.length > 18 && (
//         <div className="flex gap-2 text-gray-500 w-max px-4 py-2 rounded mt-2 ">
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

//       {modal && (
//         <CreateAccount
//           // members={members}
//           onClose={() => setModal(false)}
//           open={modal}
//         />
//       )}
//       {editModal && selectedItem && (
//         <AccountItem
//           account={selectedItem}
//           // members={members}
//           onClose={() => setEditModal(false)}
//           open={editModal}
//         />
//       )}

//       {deleteModal && selectedItem && (
//         <DeleteAccount
//           account={selectedItem}
//           onClose={() => setDeleteModal(false)}
//           open={deleteModal}
//         />
//       )}
//     </RootLayout>
//   );
// };



const AccountPage = () => {
  const token = getToken();

  const { data, isLoading } = useAccounts(token ?? "");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const accounts: Account[] = data?.accounts ?? [];
  const pagination = data?.pagination;

  const [selectedItem, setSelectedItem] = useState<Account | null>(null);

  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = (item: Account) => {
    setSelectedItem(item);
    setDeleteModal(true);
  };

  const handleView = (item: Account) => {
    setSelectedItem(item);
    setEditModal(true);
  };

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchQuery(e.target.value);
  };

  // Recherche
  const filteredData = useMemo(() => {
    return accounts.filter((item) =>
      item.membre_nom
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()),
    );
  }, [accounts, searchQuery]);

  // Somme des soldes de la page actuelle
  const totalBalance = useMemo(() => {
    return accounts.reduce(
      (total, account) =>
        total + Number(account.balance ?? account.balance ?? 0),
      0,
    );
  }, [accounts]);

  const totalAccounts = pagination?.count ?? accounts.length;

  return (
    <RootLayout>
      <div className="min-h-screen bg-gray-50/60">
        <div className="space-y-5">

          {/* HEADER */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>Tableau de bord</span>
                <span>/</span>
                <span className="text-gray-600">
                  Comptes épargne
                </span>
              </div>

              <div className="mt-1">
                <h1 className="text-xl font-bold text-gray-900">
                  Comptes épargne
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Consultez et gérez les comptes d'épargne des membres.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setModal(true)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-green-800 active:scale-[0.98]"
            >
              <Plus size={17} />
              Nouveau compte
            </button>
          </div>

          {/* STATISTIQUES */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {/* Total comptes */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Total comptes
                  </p>

                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {totalAccounts}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    comptes enregistrés
                  </p>
                </div>

                <div className="rounded-lg bg-green-50 p-3 text-green-700">
                  <Wallet size={20} />
                </div>
              </div>
            </div>

            {/* Solde */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Solde affiché
                  </p>

                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {totalBalance.toLocaleString("fr-FR")}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    sur les comptes affichés
                  </p>
                </div>

                <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                  <Banknote size={20} />
                </div>
              </div>
            </div>

            {/* Membres */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Comptes actifs
                  </p>

                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {accounts.length}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    comptes disponibles
                  </p>
                </div>

                <div className="rounded-lg bg-orange-50 p-3 text-orange-600">
                  <Users size={20} />
                </div>
              </div>
            </div>
          </div>

          {/* OUTILS */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              {/* Recherche */}
              <div className="relative">

                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Rechercher un membre..."
                  className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-100 sm:w-72"
                  onChange={handleSearchChange}
                  value={searchQuery}
                />
              </div>

              {/* Export */}
              <div>
                <AccountPDF data={filteredData} />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">

              <p className="text-xs text-gray-500">
                <span className="font-semibold text-gray-700">
                  {filteredData.length}
                </span>{" "}
                compte(s) affiché(s)
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

          {/* LISTE */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

            <ListAccount
              accounts={filteredData}
              loading={isLoading}
              onDelete={handleDelete}
              onView={handleView}
            />

          </div>

          {/* PAGINATION */}
          {(pagination?.next || pagination?.previous) && (
            <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">

              <p className="text-xs text-gray-500">
                Total :{" "}
                <span className="font-semibold text-gray-700">
                  {pagination?.count ?? 0}
                </span>{" "}
                comptes
              </p>

              <div className="flex items-center gap-2">

                <button
                  disabled={!pagination?.previous || isLoading}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowBigLeft size={15} />
                </button>

                <span className="rounded-lg bg-green-50 px-3 py-2 text-xs font-semibold text-green-700">
                  Page 1
                </span>

                <button
                  disabled={!pagination?.next || isLoading}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowBigRight size={15} />
                </button>

              </div>
            </div>
          )}
        </div>
      </div>

      {/* CRÉATION */}
      {modal && (
        <CreateAccount
          onClose={() => setModal(false)}
          open={modal}
        />
      )}

      {/* DÉTAILS */}
      {editModal && selectedItem && (
        <AccountItem
          account={selectedItem}
          onClose={() => {
            setEditModal(false);
            setSelectedItem(null);
          }}
          open={editModal}
        />
      )}

      {/* SUPPRESSION */}
      {deleteModal && selectedItem && (
        <DeleteAccount
          account={selectedItem}
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

export default AccountPage;
