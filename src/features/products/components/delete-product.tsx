import { AlertTriangle, Loader2, Trash2, X } from "lucide-react";
import { getToken } from "../../../utlis/get-token";
import type { Product } from "../../../utlis/type";
import { useToast } from "../../../components/toast-context";
import Modal from "../../../components/modal";
import { useDeleteProduct } from "../hooks/use-delete-product";

type deleteProductProps = {
  open: boolean;
  onClose: () => void;
  product: Product;
};

const DeleteProduct = ({ open, onClose, product }: deleteProductProps) => {
  const token = getToken();
  const { deleteProduct, fail, pending } = useDeleteProduct(token ?? "");
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await deleteProduct(product.id);

      showToast("Produit supprimé avec succès !", "success");
      onClose();
    } catch (e) {
      if (e instanceof Error) {
        console.error("Error :", e.message);
      } else {
        console.error("Erreur inconnue");
      }

      showToast(fail, "error");
    }
  };

  if (!open) return null;
  return (
    <Modal>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <Trash2 size={19} className="text-red-600" />
            </div>

            <div>
              <h2 className="text-gray-900 font-semibold text-base">
                Supprimer le produit
              </h2>

              <p className="text-gray-400 text-xs mt-0.5">
                Confirmation requise
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            className="
              w-8 h-8
              rounded-full
              flex items-center justify-center
              text-gray-400
              hover:text-gray-700
              hover:bg-gray-100
              transition
              disabled:opacity-50
            "
          >
            <X size={17} />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit}>
          <div className="py-5">
            {/* Warning */}
            <div className="flex gap-3 p-3 rounded-lg bg-red-50 border border-red-100">
              <AlertTriangle
                size={18}
                className="text-red-600 shrink-0 mt-0.5"
              />

              <div>
                <p className="text-sm font-medium text-red-800">Attention</p>

                <p className="text-xs text-red-700 mt-1 leading-5">
                  Cette action peut être irréversible. Vérifiez les informations
                  avant de continuer.
                </p>
              </div>
            </div>

            {/* Member */}
            <div className="mt-4 p-4 rounded-lg bg-gray-50 border border-gray-200">
              <p className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">
                Produit sélectionné
              </p>

              <div className="flex items-center gap-3 mt-2">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-800 font-semibold text-sm">
                    {product.nom.charAt(0).toUpperCase()}
                  </span>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {product.nom}
                  </p>

                  {/* {product.description && (
                    <p className="text-xs text-gray-500 mt-0.5">
                      {product.description}
                    </p>
                  )} */}
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-600 text-center mt-5">
              Voulez-vous vraiment supprimer{" "}
              <strong className="text-gray-900">{product.nom}</strong> ?
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              disabled={pending}
              className="
                px-5 py-2.5
                rounded-lg
                border border-gray-300
                text-gray-700
                text-xs
                font-semibold
                cursor-pointer
                hover:bg-gray-50
                transition
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={pending}
              className="
                min-w-28
                px-5 py-2.5
                rounded-lg
                bg-red-700
                text-white
                text-xs
                font-semibold
                cursor-pointer
                flex items-center justify-center gap-2
                hover:bg-red-800
                active:bg-red-900
                transition
                disabled:bg-red-300
                disabled:cursor-not-allowed
              "
            >
              {pending ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Suppression...
                </>
              ) : (
                <>
                  <Trash2 size={14} />
                  Supprimer
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default DeleteProduct;
