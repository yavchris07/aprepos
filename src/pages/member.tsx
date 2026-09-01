import { useMemo, useState } from "react";
import RootLayout from "../components/root-layout";
import ListMember from "../features/members/components/list-member";
import type { Kind, Member } from "../utlis/type";
import CreateMember from "../features/members/components/create-member";
import EditMember from "../features/members/components/edit-member";
import DeleteMember from "../features/members/components/delete-member";
import {
  ArrowBigLeft,
  ArrowBigRight,
  Layers,
  Plus,
  Search,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { getToken } from "../utlis/get-token";
import { useMembers } from "../features/members/hooks/use-members";
import { useKinds } from "../features/kind/hooks/use-kind";
import MemberPDF from "../components/pdf/members";

// const MemberPage = () => {
//   const [selectedItem, setSelectedItem] = useState<Member | null>(null);
//   const [modal, setModal] = useState(false);
//   const [deleteModal, setDeleteModal] = useState(false);
//   const [editModal, setEditModal] = useState(false);

//   const handleDelete = (item: Member) => {
//     setSelectedItem(item);
//     setDeleteModal(true);
//   };
//   const handleEdit = (item: Member) => {
//     setSelectedItem(item);
//     setEditModal(true);
//   };
//   // const handleView = (item: Member) => {
//   //   setSelectedItem(item);
//   //   setModal("view");
//   // };

//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   const token = getToken();
//   const { data, isLoading, isFetching } = useMembers(token ?? "", currentPage);
//   const { data: types } = useKinds(token ?? "");
//   const members: Member[] = useMemo(() => data?.members ?? [], [data?.members]);
//   const kinds: Kind[] = types?.kinds ?? [];
//   const pagination = data?.pagination;
//   // console.log("MMMMM : ", members);
//   console.log("YYYYYYY : ", pagination);

//   // const {
//   //   data,
//   //   isLoading,
//   //   isFetching,
//   // } = useMembers(token, currentPage);

//   // const members = data?.members ?? [];
//   // const pagination = data?.pagination;

//   //Search
//   const filteredData = useMemo(() => {
//     return members.filter((item) =>
//       String(item.nom_complet)
//         .toLowerCase()
//         .includes(searchQuery.toLowerCase()),
//     );
//   }, [members, searchQuery]);

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//     setCurrentPage(1);
//   };

//   // Pagination
//   const pageSize = 10;

//   const totalPages = Math.ceil((pagination?.count ?? 0) / pageSize);

//   console.log('MEMBERS : ',filteredData)

//   return (
//     <RootLayout>
//       <div className="flex justify-between items-center my-3">
//         <h1 className="text-gray-900 font-semibold text-sm">
//           Tableau de board / <span className="text-gray-500">Membres</span>{" "}
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
//           <MemberPDF data={filteredData} />
//         </div>
//         <input
//           type="text"
//           placeholder="Recherchez par nom !"
//           className="border border-gray-400 py-2 pl-2 rounded"
//           onChange={handleSearchChange}
//           value={searchQuery}
//         />
//       </div>

//       <ListMember
//         loading={isLoading}
//         members={members}
//         onDelete={handleDelete}
//         onEdit={handleEdit}
//         // onView={handleView}
//       />

//       <div className="flex gap-2 text-gray-500 w-max px-4 py-2 rounded mt-2">
//         <button
//           disabled={!pagination?.previous || isLoading || isFetching}
//           onClick={() => setCurrentPage((prev) => prev - 1)}
//           className="bg-green-700 text-white p-2 rounded-full hover:bg-green-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
//         >
//           <ArrowBigLeft size={10} />
//         </button>

//         <span className="flex items-center px-2">
//           Page {currentPage} / {totalPages}
//         </span>

//         <button
//           disabled={!pagination?.next || isLoading || isFetching}
//           onClick={() => setCurrentPage((prev) => prev + 1)}
//           className="bg-green-700 text-white p-2 rounded-full hover:bg-green-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
//         >
//           <ArrowBigRight size={10} />
//         </button>
//       </div>

//       {modal && (
//         <CreateMember
//           onClose={() => setModal(false)}
//           open={modal}
//           kinds={kinds}
//         />
//       )}

//       {editModal && selectedItem && (
//         <EditMember
//           member={selectedItem}
//           onClose={() => setEditModal(false)}
//           open={editModal}
//           kinds={kinds}
//         />
//       )}

//       {deleteModal && selectedItem && (
//         <DeleteMember
//           member={selectedItem}
//           onClose={() => setDeleteModal(false)}
//           open={deleteModal}
//         />
//       )}
//     </RootLayout>
//   );
// };

const MemberPage = () => {
  const [selectedItem, setSelectedItem] = useState<Member | null>(null);

  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const token = getToken();

  const { data, isLoading, isFetching } = useMembers(token ?? "", currentPage);

  const { data: types } = useKinds(token ?? "");

  const members: Member[] = data?.members ?? [];
  const kinds: Kind[] = types?.kinds ?? [];
  const pagination = data?.pagination;

  // --------------------------------
  // ACTIONS
  // --------------------------------

  const handleDelete = (item: Member) => {
    setSelectedItem(item);
    setDeleteModal(true);
  };

  const handleEdit = (item: Member) => {
    setSelectedItem(item);
    setEditModal(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // --------------------------------
  // SEARCH
  // --------------------------------

  const filteredData = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return members;
    }

    return members.filter((item) =>
      String(item.nom_complet ?? "")
        .toLowerCase()
        .includes(query),
    );
  }, [members, searchQuery]);

  // --------------------------------
  // STATISTICS
  // --------------------------------

  const totalMembers = pagination?.count ?? members.length;

  const totalPages = Math.ceil(totalMembers / 10);

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
                <span className="text-gray-600">Membres</span>
              </div>

              <div className="mt-1">
                <h1 className="text-xl font-bold text-gray-900">
                  Gestion des membres
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Gérez les membres et leurs informations.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setModal(true)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-green-800 active:scale-[0.98]"
            >
              <Plus size={17} />
              Nouveau membre
            </button>
          </div>

          {/* ================= KPI ================= */}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {/* TOTAL */}

            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Total membres
                  </p>

                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {totalMembers.toLocaleString("fr-FR")}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    membres enregistrés
                  </p>
                </div>

                <div className="rounded-lg bg-green-50 p-3 text-green-700">
                  <Users size={21} />
                </div>
              </div>
            </div>

            {/* PAGE */}

            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Membres affichés
                  </p>

                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {filteredData.length}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">sur cette page</p>
                </div>

                <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                  <UserRound size={21} />
                </div>
              </div>
            </div>

            {/* PAGE COURANTE */}

            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Page actuelle
                  </p>

                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {currentPage}
                    <span className="text-base font-normal text-gray-400">
                      {" "}
                      / {totalPages || 1}
                    </span>
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    10 membres par page
                  </p>
                </div>

                <div className="rounded-lg bg-orange-50 p-3 text-orange-600">
                  <Layers size={21} />
                </div>
              </div>
            </div>

            {/* ================= TOOLBAR ================= */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                {/* SEARCH */}

                <div className="relative lg:w-auto">
                  <Search
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    placeholder="Rechercher..."
                    className="h-10 w-auto rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-10 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-100 lg:w-70"
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

                {/* EXPORT */}

                <MemberPDF data={filteredData} />
              </div>

              {/* RESULTATS */}

              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                <p className="text-xs text-gray-500">
                  <span className="font-semibold text-gray-700">
                    {filteredData.length}
                  </span>{" "}
                  membre(s) affiché(s)
                </p>

                {searchQuery && (
                  <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                    Recherche : "{searchQuery}"
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* ================= LISTE ================= */}

          {/* <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"> */}
            <ListMember
              loading={isLoading}
              members={filteredData}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          {/* </div> */}

          {/* ================= PAGINATION ================= */}

          <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-gray-500">
              Total :{" "}
              <span className="font-semibold text-gray-700">
                {totalMembers}
              </span>{" "}
              membres
            </p>

            <div className="flex items-center justify-between gap-2 sm:justify-end">
              <button
                type="button"
                disabled={!pagination?.previous || isLoading || isFetching}
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowBigLeft size={15} />
              </button>

              <div className="min-w-22.5 rounded-lg bg-green-50 px-3 py-2 text-center text-xs font-semibold text-green-700">
                {isFetching
                  ? "Chargement..."
                  : `Page ${currentPage} / ${totalPages || 1}`}
              </div>

              <button
                type="button"
                disabled={!pagination?.next || isLoading || isFetching}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowBigRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODALES ================= */}

      {modal && (
        <CreateMember
          onClose={() => setModal(false)}
          open={modal}
          kinds={kinds}
        />
      )}

      {editModal && selectedItem && (
        <EditMember
          member={selectedItem}
          onClose={() => {
            setEditModal(false);
            setSelectedItem(null);
          }}
          open={editModal}
          kinds={kinds}
        />
      )}

      {deleteModal && selectedItem && (
        <DeleteMember
          member={selectedItem}
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

export default MemberPage;
