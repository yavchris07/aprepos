import {
  Loader2,
  X,
  ShoppingBasket,
  Landmark,
  Banknote,
  CalendarDays,
} from "lucide-react";
import { useState } from "react";
import Modal from "../../../components/modal";
import { getToken } from "../../../utlis/get-token";
import { useToast } from "../../../components/toast-context";
import { useCreateCredit } from "../hooks/use-create-credit";
import GetMember from "../../members/components/get-member";

interface CreateCreditProps {
  onClose: () => void;
  open: boolean;
}

const CreateCredit = ({ onClose, open }: CreateCreditProps) => {
  const token = getToken();

  const { create, fail, pending } = useCreateCredit(token ?? "");

  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    membre: 0,
    acompte_initial: "",
    devise: "",
    date: "",
  });

  const [errors, setErrors] = useState({
    membre: "",
    acompte_initial: "",
    devise: "",
    date: "",
  });

  const currencies = [
    { id: "usd", name: "Dollars Americais" },
    { id: "cdf", name: "Francs congolais" },
  ];

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
      membre: "",
      acompte_initial: "",
      devise: "",
      date: "",
    };

    let valid = true;

    // if (!formData.membre.trim()) {
    //   newErrors.membre = "Le membre est obligatoire.";
    //   valid = false;
    // }

    if (!formData.acompte_initial.trim()) {
      newErrors.acompte_initial = "L'acompte initial est obligatoire.";
      valid = false;
    }

    if (!formData.devise.trim()) {
      newErrors.devise = "La devise est obligatoire.";
      valid = false;
    }

    if (!formData.date.trim()) {
      newErrors.date = "La date est obligatoire.";
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
      await create({ ...formData, membre: Number(formData.membre) });

      showToast("Crédit créé avec succès !", "success");

      onClose();

      setFormData({
        membre: 0,
        acompte_initial: "",
        devise: "",
        date: "",
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
                  Nouveau credit
                </h2>

                <p className="mt-0.5 text-[11px] text-gray-400">
                  Ajouter un credit cantine de CEPARCREA
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
          {/* ===== NOM ==== */}
          <GetMember
            value={formData.membre}
            onChange={(member) =>
              setFormData((prev) => ({
                ...prev,
                membre: member.id,
              }))
            }
            token={token ?? ""}
          />
          <div>
            <label
              htmlFor="prix_unitaire"
              className="mb-1.5 block text-xs font-semibold text-gray-700"
            >
              Acompte initial
            </label>

            <div className="relative">
              <Banknote
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="acompte_initial"
                name="acompte_initial"
                type="number"
                value={formData.acompte_initial}
                onChange={handleChange}
                placeholder="Acompte initial"
                disabled={pending}
                className={`w-full rounded-lg border bg-white py-2.5 pl-9 pr-3 text-xs text-gray-800 outline-none transition placeholder:text-gray-400 ${
                  errors.acompte_initial
                    ? "border-red-400 focus:ring-2 focus:ring-red-100"
                    : "border-gray-300 focus:border-green-700 focus:ring-2 focus:ring-green-100"
                }`}
              />
            </div>

            {errors.acompte_initial && (
              <p className="mt-1 text-[10px] text-red-500">
                {errors.acompte_initial}
              </p>
            )}
          </div>

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

          {/* ===== Date ==== */}

          <div>
            <label
              htmlFor="stock"
              className="mb-1.5 block text-xs font-semibold text-gray-700"
            >
              Date
            </label>

            <div className="relative">
              <CalendarDays
                size={16}
                className="absolute left-3 top-3 text-gray-400"
              />

              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                placeholder="Ex. 12"
                disabled={pending}
                className={`w-full rounded-lg border bg-white py-2.5 pl-9 pr-3 text-xs text-gray-800 outline-none transition placeholder:text-gray-400 ${
                  errors.date
                    ? "border-red-400 focus:ring-2 focus:ring-red-100"
                    : "border-gray-300 focus:border-green-700 focus:ring-2 focus:ring-green-100"
                }`}
              />
            </div>

            {errors.date && (
              <p className="mt-1 text-[10px] text-red-500">{errors.date}</p>
            )}
          </div>

          {/* ===== ACTIONS ===== */}

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
                !formData.acompte_initial ||
                !formData.membre ||
                !formData.date ||
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
                "Ajouter credit"
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateCredit;
