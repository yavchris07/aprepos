// import { useMemo, useState } from "react";
import RootLayout from "../components/root-layout";
import ListAdhesion from "../features/adhesion/components/list-adhesion";
import type { Adhesion, Member } from "../utlis/type";
import EditAdhesion from "../features/adhesion/components/edit-adhesion";
import DeletAdhesion from "../features/adhesion/components/delete-adhesion";
import CreateAdhesion from "../features/adhesion/components/create-adhesion";
import { getToken } from "../utlis/get-token";
import { useMembers } from "../features/members/hooks/use-members";
import { useAdhesion } from "../features/adhesion/hooks/use-adhesions";
import AdhesionPDF from "../components/pdf/adhesion";

// const AdhesionPage = () => {
//   const token = getToken();
//   const { data: mbs } = useMembers(token ?? "",1);
//   const { data, isLoading } = useAdhesion(token ?? "", 1);
//   const members: Member[] = mbs?.members ?? [];
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const adhesions: Adhesion[] = data?.adhesions ?? [];
//   const pagination = data?.pagination;

//   console.log("VVVVVVVVVVVVV ", pagination);

//   const [selectedItem, setSelectedItem] = useState<Adhesion | null>(null);
//   const [modal, setModal] = useState(false);
//   const [deleteModal, setDeleteModal] = useState(false);
//   const [editModal, setEditModal] = useState(false);

//   const handleDelete = (item: Adhesion) => {
//     setSelectedItem(item);
//   setDeleteModal(true);
//   };
//   const handleEdit = (item: Adhesion) => {
//     setSelectedItem(item);
//     setEditModal(true);
//   };

//   console.log(selectedItem);

//   const [searchQuery, setSearchQuery] = useState("");
//   // const [currentPage, setCurrentPage] = useState(1);

//   //Search
//   const filteredData = useMemo(() => {
//     return adhesions.filter((item) =>
//       item?.membre_nom?.toLowerCase().includes(searchQuery.toLowerCase()),
//     );
//   }, [adhesions, searchQuery]);

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//     // setCurrentPage(1);
//   };

//   return (
//     <RootLayout>
//       <div className="flex justify-between items-center my-3">
//         <h1 className="text-gray-900 font-semibold text-sm">
//           Tableau de board /{" "}
//           <span className="text-gray-500">Adhesion</span>{" "}
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
//           <AdhesionPDF data={filteredData}/>
//         </div>
//         <div className="flex gap-3">
//           <input
//             type="text"
//             placeholder="Recherche par nom !"
//             className="border border-gray-400 py-2 pl-2 rounded focus:outline-none focus:ring-2 focus:ring-green-700"
//             value={searchQuery}
//             onChange={handleSearchChange}
//           />
//           <input
//             type="text"
//             placeholder="Annee !"
//             className="border border-gray-400 py-2 pl-2 rounded focus:outline-none focus:ring-2 focus:ring-green-700"
//             value={searchQuery}
//             onChange={handleSearchChange}
//           />
//         </div>
//       </div>

//       <ListAdhesion
//         adhesions={filteredData}
//         loading={isLoading}
//         onDelete={handleDelete}
//         onEdit={handleEdit}
//       />
      
//       {modal&& (
//         <CreateAdhesion
//           onClose={() => setModal(false)}
//           open={modal}
//         />
//       )}
//       {editModal && selectedItem && (
//         <EditAdhesion
//           adhesion={selectedItem}
//           onClose={() => setEditModal(false)}
//           members={members}
//           open={editModal}
//         />
//       )}
//       {deleteModal && selectedItem && (
//         <DeletAdhesion
//           adhesion={selectedItem}
//           onClose={() => setDeleteModal(false)}
//           open={deleteModal}
//         />
//       )}
     
//     </RootLayout>
//   );
// };






import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  CalendarDays,
  FileDown,
  Users,
  CreditCard,
  X,
} from "lucide-react";

const AdhesionPage = () => {
  const token = getToken();

  const { data: mbs } = useMembers(token ?? "", 1);
  const { data, isLoading } = useAdhesion(token ?? "", 1);

  const members: Member[] = mbs?.members ?? [];
  const adhesions: Adhesion[] = data?.adhesions ?? [];
  const pagination = data?.pagination;

  const [selectedItem, setSelectedItem] = useState<Adhesion | null>(null);

  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [year, setYear] = useState("");

  const handleDelete = (item: Adhesion) => {
    setSelectedItem(item);
    setDeleteModal(true);
  };

  const handleEdit = (item: Adhesion) => {
    setSelectedItem(item);
    setEditModal(true);
  };

  const filteredData = useMemo(() => {
    return adhesions.filter((item) => {
      const matchesName = item?.membre_nom
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());

      // Adapte cette propriété au vrai champ de ton API
      const matchesYear = year
        ? String(item?.annee ?? "").includes(year)
        : true;

      return matchesName && matchesYear;
    });
  }, [adhesions, searchQuery, year]);

  const clearFilters = () => {
    setSearchQuery("");
    setYear("");
  };

  const hasFilters = searchQuery || year;

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
                <span className="text-gray-600">Adhésions</span>
              </div>

              <div className="mt-1">
                <h1 className="text-xl font-bold text-gray-900">
                  Gestion des adhésions
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Consultez et gérez les adhésions des membres.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setModal(true)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-green-800 active:scale-[0.98]"
            >
              <Plus size={17} />
              Nouvelle adhésion
            </button>
          </div>

          {/* STATISTIQUES */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Total adhésions
                  </p>

                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {pagination?.count ?? adhesions.length}
                  </p>
                </div>

                <div className="rounded-lg bg-green-50 p-3 text-green-700">
                  <Users size={20} />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Membres
                  </p>

                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {members.length}
                  </p>
                </div>

                <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                  <Users size={20} />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Cette année
                  </p>

                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {adhesions.filter(
                      (item) =>
                        String(item?.annee ?? "") ===
                        String(new Date().getFullYear()),
                    ).length}
                  </p>
                </div>

                <div className="rounded-lg bg-orange-50 p-3 text-orange-600">
                  <CreditCard size={20} />
                </div>
              </div>
            </div>
          </div>

          {/* FILTRES + ACTIONS */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              {/* Filtres */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                {/* Recherche */}
                <div className="relative">
                  <Search
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    placeholder="Rechercher un membre..."
                    className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-100 sm:w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Année */}
                <div className="relative">
                  <CalendarDays
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="number"
                    placeholder="Année"
                    min="2000"
                    max="2100"
                    className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-100 sm:w-36"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </div>

                {/* Reset */}
                {hasFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 text-sm text-gray-500 transition hover:bg-gray-50 hover:text-gray-700"
                  >
                    <X size={15} />
                    Réinitialiser
                  </button>
                )}
              </div>

              {/* Export */}
              <div>
                <button
                  type="button"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  onClick={() => {}}
                >
                  <FileDown size={16} />
                  <AdhesionPDF data={filteredData} />
                </button>
              </div>
            </div>

            {/* Résultat des filtres */}
            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
              <p className="text-xs text-gray-500">
                <span className="font-semibold text-gray-700">
                  {filteredData.length}
                </span>{" "}
                adhésion(s) affichée(s)
              </p>

              {hasFilters && (
                <p className="text-xs text-green-700">
                  Filtres actifs
                </p>
              )}
            </div>
          </div>

          {/* TABLEAU */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <ListAdhesion
              adhesions={filteredData}
              loading={isLoading}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </div>

          {/* PAGINATION */}
          {(pagination?.next || pagination?.previous) && (
            <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-xs text-gray-500">
                Total :{" "}
                <span className="font-semibold text-gray-700">
                  {pagination?.count ?? 0}
                </span>
              </p>

              <div className="flex items-center gap-2">
                <button
                  disabled={!pagination?.previous || isLoading}
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ←
                </button>

                <span className="rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-700">
                  Page 1
                </span>

                <button
                  disabled={!pagination?.next || isLoading}
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODALES */}

      {modal && (
        <CreateAdhesion
          onClose={() => setModal(false)}
          open={modal}
        />
      )}

      {editModal && selectedItem && (
        <EditAdhesion
          adhesion={selectedItem}
          onClose={() => {
            setEditModal(false);
            setSelectedItem(null);
          }}
          members={members}
          open={editModal}
        />
      )}

      {deleteModal && selectedItem && (
        <DeletAdhesion
          adhesion={selectedItem}
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

export default AdhesionPage;
