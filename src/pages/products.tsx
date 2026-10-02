import React, { useState } from "react";
import RootLayout from "../components/root-layout";
import { ArrowBigLeft, ArrowBigRight, Plus } from "lucide-react";
import CreateProduct from "../features/products/components/create-product";
import { getToken } from "../utlis/get-token";
import { useProducts } from "../features/products/hooks/use-products";
import Loading from "../components/loading";
import ProductList from "../features/products/components/product-list";
import type { Product } from "../utlis/type";
import DeleteProduct from "../features/products/components/delete-product";
import EditProduct from "../features/products/components/edit-product";

const Products = () => {
  const token = getToken();
  const [modal, setModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedItem, setSelectedItem] = useState<Product | null>(null);
  const {
    data: products,
    isLoading,
    isFetching,
  } = useProducts(token ?? "", currentPage);
  const pagination = products?.pagination;
  const pros: Product[] = products?.products ?? [];

  console.log("PAGE : ", pagination);

  console.log("Products : ", products);
  //   const pro = products: Product[];

  const handleDelete = (product: Product) => {
    // Handle delete logic here
    setSelectedItem(product);
    setDeleteModal(true);
    console.log("Delete product:", product);
  };

  const handleEdit = (product: Product) => {
    // Handle edit logic here
    setSelectedItem(product);
    setEditModal(true);
    console.log("Edit product:", product);
  };

  // Pagination
  const totalProducts = pagination?.count ?? pros.length;
  const totalPages = Math.ceil(totalProducts / 10);

  if (isLoading) {
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
                <span className="text-gray-600">Produits</span>
              </div>

              <div className="mt-1">
                <h1 className="text-xl font-bold text-gray-900">
                  Gestion des produits
                </h1>

                <p className="mt-1 text-xs text-gray-500">
                  Gérez les produits et leurs informations.
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

          {pros?.length === 0 ? (
            <div className="flex h-96 flex-col items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white shadow-sm">
              <p className="text-sm text-gray-500">
                Aucun produit n'a été trouvé.
              </p>
            </div>
          ) : (
            <ProductList
              products={pros ?? []}
              loading={isLoading}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          )}

          {/* ================= PAGINATION ================= */}
          {/* PAGINATION */}
          {(pagination?.next || pagination?.previous) && (
            <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-gray-500">
                Total :{" "}
                <span className="font-semibold text-gray-700">
                  {totalProducts}
                </span>{" "}
                Produits
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

        <CreateProduct open={modal} onClose={() => setModal(false)} />
        {selectedItem && deleteModal && (
          <DeleteProduct
            open={deleteModal}
            onClose={() => setDeleteModal(false)}
            product={selectedItem}
          />
        )}
        {selectedItem && editModal && (
          <EditProduct
            open={editModal}
            onClose={() => setEditModal(false)}
            product={selectedItem}
          />
        )}
      </div>
    </RootLayout>
  );
};

export default Products;
