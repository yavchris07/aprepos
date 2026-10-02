import {
  Loader2,
  X,
  ShoppingBasket,
  CirclePile,
  Landmark,
  Banknote,
} from "lucide-react";
import { useState } from "react";
import Modal from "../../../components/modal";
import { getToken } from "../../../utlis/get-token";
import { useToast } from "../../../components/toast-context";
import { useCreateProduct } from "../hooks/use-create-product";

interface CreateProductProps {
  onClose: () => void;
  open: boolean;
}

const CreateProduct = ({ onClose, open }: CreateProductProps) => {
  const token = getToken();

  const { create, fail, pending } = useCreateProduct(token ?? "");

  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    nom: "",
    prix_unitaire: "",
    devise: "",
    stock: "",
  });

  const currencies = [
    { id: "usd", name: "Dollars Americais" },
    { id: "cdf", name: "Francs congolais" },
  ];

  const [errors, setErrors] = useState({
    nom: "",
    prix_unitaire: "",
    devise: "",
    stock: "",
  });

  /* ============================================================
     HANDLE CHANGE
  ============================================================ */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Supprimer l'erreur lorsque l'utilisateur corrige
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  /* ============================================================
     VALIDATION
  ============================================================ */

  const validateForm = () => {
    const newErrors = {
      nom: "",
      prix_unitaire: "",
      devise: "",
      stock: "",
    };

    let valid = true;

    if (!formData.nom.trim()) {
      newErrors.nom = "Le nom est obligatoire.";
      valid = false;
    }

    if (!formData.prix_unitaire.trim()) {
      newErrors.prix_unitaire = "Le prix unitaire est obligatoire.";
      valid = false;
    }

    if (!formData.devise.trim()) {
      newErrors.devise = "LLa devise est obligatoire.";
      valid = false;
    }

    if (!formData.stock.trim()) {
      newErrors.stock = "Le stock est obligatoire.";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  /* ============================================================
     SUBMIT
  ============================================================ */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await create({
        ...formData,
        prix_unitaire: Number(formData.prix_unitaire),
        stock:Number(formData.stock)
      });

      showToast("Produit créé avec succès !", "success");

      onClose();

      setFormData({
        nom: "",
        prix_unitaire: "",
        devise: "",
        stock: "",
      });
    } catch (e) {
      console.error(e);

      showToast(fail || "Une erreur est survenue.", "error");
    }
  };

  if (!open) return null;

  return (
    <Modal>
      <div className="w-full max-w-lg">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="flex items-start justify-between border-b border-gray-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100">
                <ShoppingBasket size={18} className="text-green-700" />
              </div>

              <div>
                <h2 className="text-sm font-bold text-gray-900">
                  Nouveau produit
                </h2>

                <p className="mt-0.5 text-[11px] text-gray-400">
                  Ajouter un produit dansle stock de CEPARCREA
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            aria-label="Fermer"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed"
          >
            <X size={17} />
          </button>
        </div>

        {/* =====================================================
            FORM
        ===================================================== */}

        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
          {/* ===================================================
              NOM
          =================================================== */}

          <div>
            <label
              htmlFor="nom_complet"
              className="mb-1.5 block text-xs font-semibold text-gray-700"
            >
              Nom
            </label>

            <div className="relative">
              <ShoppingBasket
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="nom"
                name="nom"
                type="text"
                value={formData.nom}
                onChange={handleChange}
                placeholder="Ex. Jean Dupont"
                disabled={pending}
                className={`w-full rounded-lg border bg-white py-2.5 pl-9 pr-3 text-xs text-gray-800 outline-none transition placeholder:text-gray-400 ${
                  errors.nom
                    ? "border-red-400 focus:ring-2 focus:ring-red-100"
                    : "border-gray-300 focus:border-green-700 focus:ring-2 focus:ring-green-100"
                }`}
              />
            </div>

            {errors.nom && (
              <p className="mt-1 text-[10px] text-red-500">{errors.nom}</p>
            )}
          </div>

          {/* ===================================================
              TELEPHONE
          =================================================== */}

          <div>
            <label
              htmlFor="prix_unitaire"
              className="mb-1.5 block text-xs font-semibold text-gray-700"
            >
              Prix unitaire
            </label>

            <div className="relative">
              <Banknote
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="prix_unitaire"
                name="prix_unitaire"
                type="number"
                value={formData.prix_unitaire}
                onChange={handleChange}
                placeholder="Prix unitaire"
                disabled={pending}
                className={`w-full rounded-lg border bg-white py-2.5 pl-9 pr-3 text-xs text-gray-800 outline-none transition placeholder:text-gray-400 ${
                  errors.prix_unitaire
                    ? "border-red-400 focus:ring-2 focus:ring-red-100"
                    : "border-gray-300 focus:border-green-700 focus:ring-2 focus:ring-green-100"
                }`}
              />
            </div>

            {errors.prix_unitaire && (
              <p className="mt-1 text-[10px] text-red-500">
                {errors.prix_unitaire}
              </p>
            )}
          </div>

          {/* ===================================================
              ADRESSE
          =================================================== */}

          <div>
            <label
              htmlFor="devise"
              className="mb-1.5 block text-xs font-semibold text-gray-700"
            >
              Devise
            </label>

            <div className="relative">
              <Landmark
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <select
                id="devise"
                name="devise"
                value={formData.devise}
                onChange={handleChange}
                disabled={pending}
                className={`w-full appearance-none rounded-lg border bg-white py-2.5 pl-9 pr-3 text-xs text-gray-800 outline-none transition ${
                  errors.devise
                    ? "border-red-400 focus:ring-2 focus:ring-red-100"
                    : "border-gray-300 focus:border-green-700 focus:ring-2 focus:ring-green-100"
                }`}
              >
                <option value="">Devise</option>

                {currencies.map((currency) => (
                  <option key={currency.id} value={currency.id}>
                    {currency.name}
                  </option>
                ))}
              </select>
            </div>

            {errors.devise && (
              <p className="mt-1 text-[10px] text-red-500">{errors.devise}</p>
            )}
          </div>

          {/* ===================================================
              STOCK
          =================================================== */}

          <div>
            <label
              htmlFor="stock"
              className="mb-1.5 block text-xs font-semibold text-gray-700"
            >
              Stock
            </label>

            <div className="relative">
              <CirclePile
                size={16}
                className="absolute left-3 top-3 text-gray-400"
              />

              <input
                id="stock"
                name="stock"
                type="text"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Ex. Goma, Katindo"
                disabled={pending}
                className={`w-full rounded-lg border bg-white py-2.5 pl-9 pr-3 text-xs text-gray-800 outline-none transition placeholder:text-gray-400 ${
                  errors.stock
                    ? "border-red-400 focus:ring-2 focus:ring-red-100"
                    : "border-gray-300 focus:border-green-700 focus:ring-2 focus:ring-green-100"
                }`}
              />
            </div>

            {errors.stock && (
              <p className="mt-1 text-[10px] text-red-500">{errors.stock}</p>
            )}
          </div>

          {/* ===================================================
              ACTIONS
          =================================================== */}

          <div className="mt-2 flex items-center justify-end gap-2 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={pending}
              className="cursor-pointer rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-xs font-semibold text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={
                pending ||
                !formData.nom ||
                !formData.prix_unitaire ||
                !formData.stock ||
                !formData.devise
              }
              className="flex min-w-25 cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-800 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-green-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Création...
                </>
              ) : (
                "Ajouter produit"
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateProduct;
