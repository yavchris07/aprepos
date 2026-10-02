import { Pencil, Trash2 } from "lucide-react";
import type { Product } from "../../../utlis/type";
import Loading from "../../../components/loading";
// import StatusBadge from "./status-badge";

interface ProductProps {
  products: Product[];
  loading: boolean;
  onDelete: (product: Product) => void;
  onEdit: (product: Product) => void;
}

const ProductList = ({ products, loading, onDelete, onEdit }: ProductProps) => {
  if (loading) {
    return <Loading />;
  }

  if (!products.length) {
    return (
      <div className="my-3 flex min-h-50 items-center justify-center rounded-xl border border-gray-200 bg-white">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-600">
            Aucun produit trouvé
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Aucun résultat ne correspond à votre recherche.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="my-3 w-full overflow-hidden rounded-xl border border-gray-200 shadow-sm">
      {/* Table responsive */}

      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-245 text-left text-sm text-gray-600">
          {/* =====================================================
              HEADER
          ===================================================== */}

          <thead className="border-b border-gray-200 bg-gray-50">
            <tr className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              <th className="whitespace-nowrap px-3 py-2">#</th>

              <th className="whitespace-nowrap px-3 py-2">Nom</th>

              <th className="whitespace-nowrap px-3 py-2">Prix unitaire</th>

              <th className="whitespace-nowrap px-3 py-2">Devise</th>

              <th className="whitespace-nowrap px-3 py-2">En stock</th>

              <th className="whitespace-nowrap px-3 py-2 text-center">
                Actions
              </th>
            </tr>
          </thead>

          {/* =====================================================
              BODY
          ===================================================== */}

          <tbody className="divide-y divide-gray-100">
            {products.map((product, index) => (
              <tr
                key={product.id}
                className="group transition-colors hover:bg-green-50/40"
              >
                {/* Numéro */}

                <td className="whitespace-nowrap px-3 py-2">
                  <span className="text-xs font-medium text-gray-400">
                    {index + 1}
                  </span>
                </td>

                {/* Nom */}

                <td className="px-3 py-2">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold uppercase text-green-700">
                      {product.nom?.charAt(0)?.toUpperCase() ?? "P"}
                    </div>

                    {/* Informations */}

                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-gray-800">
                        {product.nom || "—"}
                      </p>

                      <p className="mt-0.5 text-[10px] text-gray-400">
                        ID : {product.id}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Téléphone */}

                <td className="whitespace-nowrap px-3 py-2">
                  <span className="text-xs text-gray-600">
                    {product.prix_unitaire || "—"}
                  </span>
                </td>

                {/* Adresse */}

                <td className="max-w-50 px-3 py-2">{product.devise || "—"}</td>

                {/* Type */}

                <td className="whitespace-nowrap px-3 py-2">
                  <span className="inline-flex rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-semibold text-orange-700">
                    {product.stock || "Non défini"}
                  </span>
                </td>


                {/* Actions */}

                <td className="whitespace-nowrap px-3 py-2">
                  <div className="flex items-center justify-center gap-1">
                    {/* Modifier */}

                    <button
                      type="button"
                      onClick={() => onEdit(product)}
                      title="Modifier"
                      aria-label={`Modifier ${product.nom}`}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition hover:bg-green-100 hover:text-green-700"
                    >
                      <Pencil size={15} />
                    </button>

                    {/* Supprimer */}

                    <button
                      type="button"
                      onClick={() => onDelete(product)}
                      title="Supprimer"
                      aria-label={`Supprimer ${product.nom}`}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
