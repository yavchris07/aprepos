import { useState } from "react";
import RootLayout from "../components/root-layout";
import { useCreditlines } from "../features/credit-line/hooks/use-credit-line";
import { getToken } from "../utlis/get-token";
import CantineCartList from "../features/credit-line/components/cantine-cart-list";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

const CreditLinePage = () => {
  const token = getToken();
  // const newCreditId = 2;
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: creditCantines,
    isLoading,
    isFetching,
  } = useCreditlines(token ?? "", currentPage);
  const items = creditCantines?.creditLines;
  const pagination = creditCantines?.pagination;
  // console.log('Credit cantine', creditCantines);

  const totalCantineCredit = pagination?.count ?? items.length;
  const totalPages = Math.ceil(totalCantineCredit / 10);

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
                <span className="text-gray-600">Crédit cantine / produits</span>
              </div>

              <div className="mt-1">
                <h1 className="text-xl font-bold text-gray-900">
                  Gestion des crédits de la cantine
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Gérez les crédits de la cantine, les produits.
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
        <CantineCartList cantineCarts={items ?? []} loading={isLoading} />

        <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-500">
            Total :{" "}
            <span className="font-semibold text-gray-700">
              {totalCantineCredit}
            </span>{" "}
            Credit cantine
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
      </div>
    </RootLayout>
  );
};

export default CreditLinePage;
