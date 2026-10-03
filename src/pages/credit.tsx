import { ArrowBigLeft, ArrowBigRight, Plus } from "lucide-react";
import RootLayout from "../components/root-layout";
import React, { useState } from "react";
import CreateCredit from "../features/credit/components/create-credit";
import CreditCantineList from "../features/credit/components/credit-list";
import type { CreditCantine } from "../utlis/type";
import { useCredits } from "../features/credit/hooks/use-credits";
import { getToken } from "../utlis/get-token";
import DeleteCredit from "../features/credit/components/delete-credit";
import CreditCantineDetailsModal from "../features/credit/components/credit-detail";
import EditCredit from "../features/credit/components/edit-credit";

const Credit = () => {
  const token = getToken();
  const [modal, setModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [detailModal, setDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CreditCantine | null>(null);

  const handleDelete = (credit: CreditCantine) => {
    console.log("Delete credit:", credit);
    setSelectedItem(credit);
    setDeleteModal(true);
  };

  const handleEdit = (credit: CreditCantine) => {
    console.log("Edit credit:", credit);
    setSelectedItem(credit);
    setEditModal(true);
  };

  const handleDetail = (credit: CreditCantine) => {
    console.log("Detail credit:", credit);
    setSelectedItem(credit);
    setDetailModal(true);
  };

  const {
    data: items,
    isLoading,
    isFetching,
  } = useCredits(token ?? "", currentPage); // Replace "token" with the actual token and 1 with the desired page number
  console.log("ITEMS : ", items);
  const pagination = items?.pagination;
  const credits = items?.credits ?? [];

  console.log(pagination);

  const totalAdhesions = pagination?.count ?? credits.length;
  const totalPages = Math.ceil(totalAdhesions / 10);

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
                <span className="text-gray-600">Crédits</span>
              </div>

              <div className="mt-1">
                <h1 className="text-xl font-bold text-gray-900">
                  Gestion des crédits de la cantine
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Gérez les crédits de la cantine et leurs informations.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setModal(true)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-green-800 active:scale-[0.98]"
            >
              <Plus size={17} />
              Nouveau crédit
            </button>
          </div>

          {/* ================= KPI ================= */}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {/* TOTAL */}

            {/* PAGE */}

            {/* PAGE COURANTE */}

            {/* ================= TOOLBAR ================= */}
          </div>

          {/* ================= LISTE ================= */}
          <CreditCantineList
            credits={credits}
            loading={isLoading || isFetching}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onViewDetails={handleDetail}
          />

          {/* ================= PAGINATION ================= */}
          {(pagination?.next || pagination?.previous) && (
            <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-gray-500">
                Total :{" "}
                <span className="font-semibold text-gray-700">
                  {totalAdhesions}
                </span>{" "}
                adhesions
              </p>

              <div className="flex items-center justify-between gap-2 sm:justify-end">
                <button
                  type="button"
                  disabled={!pagination?.previous || isLoading || isFetching}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
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
                  className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                >
                  <ArrowBigRight size={15} />
                </button>
              </div>
            </div>
          )}
        </div>

        {modal && <CreateCredit open={modal} onClose={() => setModal(false)} />}
        {deleteModal && selectedItem && (
          <DeleteCredit
            open={deleteModal}
            onClose={() => setDeleteModal(false)}
            credit={selectedItem}
          />
        )}

        {editModal && selectedItem && (
          <EditCredit
            open={editModal}
            onClose={() => setEditModal(false)}
            credits={selectedItem}
          />
        )}

        {detailModal && selectedItem && (
          <CreditCantineDetailsModal
            isOpen={detailModal}
            onClose={() => setDetailModal(false)}
            credit={selectedItem}
          />
        )}
      </div>
    </RootLayout>
  );
};

export default Credit;
