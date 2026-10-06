
import RootLayout from "../components/root-layout";
import CantinePos from "../components/credit-line-items";
import Loading from "../components/loading";
import { useProducts } from "../features/products/hooks/use-products";
import { getToken } from "../utlis/get-token";
import { useState } from "react";
import type { CantineLinePayload } from "../utlis/type";

const CreditLine = () => {
    const token = getToken();
    const newCreditId = 2;
    const [currentPage, setCurrentPage] = useState(1);
     const {
       data: prods,
       isLoading,
       isFetching,
     } = useProducts(token ?? "", currentPage);
    //  const pagination = prods?.pagination;
     const pros = prods?.products ?? [];

//   const loading = false;

  const handleSaveLignes = async (lignes: CantineLinePayload[]) => {
    console.log("Lignes à sauvegarder :", lignes);
    setCurrentPage(1); // Exemple de mise à jour de la page actuelle après l'envoi des lignes
    // Ici, vous pouvez ajouter la logique pour envoyer les lignes au backend
  };
  

  if (isLoading || isFetching) {
    return <Loading />;
  }
  
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
 
            {/* PAGE COURANTE */}
            <CantinePos
              creditCantineId={newCreditId}
              products={pros ?? []}
              loadingProducts={isLoading || isFetching}
              onSubmitLignes={handleSaveLignes}
            />

            {/* ================= TOOLBAR ================= */}
          {/* </div> */}

          {/* ================= LISTE ================= */}
        </div>
      </div>
    </RootLayout>
  );
};

export default CreditLine;
