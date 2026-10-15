import { useState } from "react";
import RootLayout from "../components/root-layout";
import { useRefundCantine } from "../features/refund-cantine/hooks/use-refund-cantine";
import { getToken } from "../utlis/get-token";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import RefundCantineList from "../features/refund-cantine/components/refund-cantine-list";

const RefundCantineCredit = () => {
  const token = getToken();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFetching } = useRefundCantine(token ?? "", currentPage);
  const items = data?.refundCantine ?? [];
  const pagination = data?.pagination;

  

  const totalFundCantine = pagination?.count ?? items.length;
  const totalPages = Math.ceil(totalFundCantine / 10);

  console.log("Refunds", items);

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
                  Crédit cantine / remboursement
                </span>
              </div>

              <div className="mt-1">
                <h1 className="text-xl font-bold text-gray-900">
                  Gestion de remboursement.
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Liste de remboursement crédits de la cantine.
                </p>
              </div>
            </div>

            {/* <button
              type="button"
              onClick={() => setModal(true)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-green-800 active:scale-[0.98]"
            >
              <Plus size={17} />
              Nouveau crédit
            </button> */}
          </div>
        </div>

        <RefundCantineList refundCantines={items ?? []} loading={isLoading} />

        {pagination?.count >= 10 && (
          <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-gray-500">
              Total :{" "}
              <span className="font-semibold text-gray-700">
                {totalFundCantine}
              </span>{" "}
              remboursement credit cantine
            </p>

            <div className="flex items-center justify-between gap-2 sm:justify-end">
              <button
                type="button"
                disabled={!pagination?.previous || isLoading || isFetching}
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
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
    </RootLayout>
  );
};

export default RefundCantineCredit;
