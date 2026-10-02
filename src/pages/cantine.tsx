import { Plus } from "lucide-react";
import RootLayout from "../components/root-layout";
import React from "react";

const Cantine = () => {
  const [modal, setModal] = React.useState(false);
  console.log(modal);
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
                <span className="text-gray-600">Cantine</span>
              </div>

              <div className="mt-1">
                <h1 className="text-xl font-bold text-gray-900">
                  Gestion des produits de la cantine
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Gérez les produits de la cantine et leurs informations.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setModal(true)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-green-800 active:scale-[0.98]"
            >
              <Plus size={17} />
              Nouveau produit
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

          {/* <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"> */}

          {/* ================= PAGINATION ================= */}
        </div>
      </div>
    </RootLayout>
  );
};

export default Cantine;
