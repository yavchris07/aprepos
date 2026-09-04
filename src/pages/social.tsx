import { useMemo, useState } from "react";
import RootLayout from "../components/root-layout";
import CreateSocial from "../features/socials/components/create-social";
import ListSocial from "../features/socials/components/list-social";
import type { Member, Social } from "../utlis/type";
import EditSocial from "../features/socials/components/edit-social";
import DeleteSocial from "../features/socials/components/delete-social";
import { useSocials } from "../features/socials/hooks/use-socials";
import { useMembers } from "../features/members/hooks/use-members";
import { getToken } from "../utlis/get-token";
import {
  Plus,
  HeartHandshake,
  Banknote,
  Calculator,
  Search,
  X,
  CalendarDays,
  FileDown,
  ArrowBigLeft,
  ArrowBigRight,
} from "lucide-react";

const SocialPage = () => {
  const token = getToken();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: mb } = useMembers(token ?? "", 1);
  const { data, isLoading, isFetching } = useSocials(token ?? "");

  const members: Member[] = mb?.members ?? [];

  const socials: Social[] = useMemo(() => data?.socials ?? [], [data?.socials]);

  const pagination = data?.pagination;
  console.log(pagination);

  const [selectedItem, setSelectedItem] = useState<Social | null>(null);

  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  // ============================
  // ACTIONS
  // ============================

  const handleDelete = (item: Social) => {
    setSelectedItem(item);
    setDeleteModal(true);
  };

  const handleEdit = (item: Social) => {
    setSelectedItem(item);
    setEditModal(true);
  };

  // ============================
  // RECHERCHE
  // ============================

  const filteredData = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return socials;
    }

    return socials.filter((item) =>
      String(item?.membre_nom ?? "")
        .toLowerCase()
        .includes(query),
    );
  }, [searchQuery, socials]);

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

  const currentSocials = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // ============================
  // STATISTIQUES
  // ============================

  const totalSocials = socials.length;

  const totalAmount = useMemo(() => {
    return socials.reduce(
      (total, item) =>
        total + Number(item.montant ?? item.montant ?? item.montant ?? 0),
      0,
    );
  }, [socials]);

  const filteredAmount = useMemo(() => {
    return filteredData.reduce(
      (total, item) =>
        total + Number(item.montant ?? item.montant ?? item.montant ?? 0),
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
                <span className="text-gray-600">Social</span>
              </div>

              <div className="mt-1">
                <h1 className="text-xl font-bold text-gray-900">
                  Gestion sociale
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Suivez les cotisations et opérations sociales des membres.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setModal(true)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-green-800 active:scale-[0.98]"
            >
              <Plus size={17} />
              Nouvelle opération
            </button>
          </div>

          {/* ================= KPI ================= */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {/* Nombre */}

            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Opérations sociales
                  </p>

                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {totalSocials.toLocaleString("fr-FR")}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    opérations enregistrées
                  </p>
                </div>

                <div className="rounded-lg bg-green-50 p-3 text-green-700">
                  <HeartHandshake size={20} />
                </div>
              </div>
            </div>

            {/* Montant */}

            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Total social
                  </p>

                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {totalAmount.toLocaleString("fr-FR")}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">montant cumulé</p>
                </div>

                <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                  <Banknote size={20} />
                </div>
              </div>
            </div>

            {/* Résultat recherche */}

            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Résultat actuel
                  </p>

                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {filteredAmount.toLocaleString("fr-FR")}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">après filtrage</p>
                </div>

                <div className="rounded-lg bg-orange-50 p-3 text-orange-600">
                  <Calculator size={20} />
                </div>
              </div>
            </div>

            {/* ================= TOOLBAR ================= */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex flex-row gap-4 lg:flex-row lg:items-center lg:justify-between">
                {/* Search */}

                <div className="relative lg:w-auto">
                  <Search
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    placeholder="Rechercher..."
                    className="h-10 rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-10 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-100 lg:w-65"
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
              </div>
              {/* 
              <div className="flex items-center gap-2 my-1">
                <button
                  type="button"
                  className="inline-flex h-7 items-center gap-2 rounded-lg border border-gray-200 px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  <CalendarDays size={16} />
                  Période
                </button>

                <button
                  type="button"
                  className="inline-flex h-7 items-center gap-2 rounded-lg border border-gray-200 px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  <FileDown size={16} />
                  Relevé
                </button>
              </div> */}

              {/* Informations */}

              <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-3">
                <p className="text-xs text-gray-500">
                  <span className="font-semibold text-gray-700">
                    {filteredData.length}
                  </span>{" "}
                  opération(s) affichée(s)
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

            {/* ================= PDF ================= */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex flex-wrap gap-2 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  className="inline-flex w-full h-10 items-center gap-2 rounded-lg border border-gray-200 px-4 text-sm font-medium text-gray-700 transition hover:bg-green-700 hover:text-white"
                >
                  <CalendarDays size={16} />
                  Période
                </button>

                <button
                  type="button"
                  className="inline-flex w-full h-10 items-center gap-2 rounded-lg border border-gray-200 px-4 text-sm font-medium text-gray-700 transition hover:bg-green-700 hover:text-white cursor-pointer"
                >
                  <FileDown size={16} />
                  Relevé
                </button>
              </div>
            </div>
          </div>

          {/* ================= LIST ================= */}

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <ListSocial
              loading={isLoading}
              onDelete={handleDelete}
              onEdit={handleEdit}
              socials={currentSocials}
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
                opérations
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
        <CreateSocial
          members={members}
          onClose={() => setModal(false)}
          open={modal}
        />
      )}

      {editModal && selectedItem && (
        <EditSocial
          members={members}
          onClose={() => {
            setEditModal(false);
            setSelectedItem(null);
          }}
          open={editModal}
          social={selectedItem}
        />
      )}

      {deleteModal && selectedItem && (
        <DeleteSocial
          onClose={() => {
            setDeleteModal(false);
            setSelectedItem(null);
          }}
          open={deleteModal}
          social={selectedItem}
        />
      )}
    </RootLayout>
  );
};

export default SocialPage;
