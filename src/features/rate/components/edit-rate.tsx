import { useState } from "react";
// import { useCreateRate } from "../hooks/use-create-rate";
import { useToast } from "../../../components/toast-context";
import Modal from "../../../components/modal";
import {
  CalendarDays,
  Loader2,
  Pencil,
  Sigma,
  SquareDashedText,
  X,
} from "lucide-react";
import type { Rate } from "../type";
import { useEditeRate } from "../hooks/use-edit-rate";

interface EditRateProps {
  onClose: () => void;
  open: boolean;
  token: string;
  rate: Rate;
}

const EditRate = ({ onClose, open, rate, token }: EditRateProps) => {
  const { editRate, fail, pending } = useEditeRate(token ?? "");

  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    id: rate.id,
    taux_mensuel: rate.taux_mensuel,
    duree_min_mois: rate.duree_min_mois,
    duree_max_mois: rate.duree_max_mois,
    description: rate.description,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // // Supprimer l'erreur lorsque l'utilisateur corrige
    // setErrors((prev) => ({
    //   ...prev,
    //   [name]: "",
    // }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await editRate(formData);

      showToast("Taux d'interet modifié avec succès !", "success");

      onClose();

      // Réinitialiser le formulaire
      setFormData({
        id: 0,
        taux_mensuel: "",
        duree_min_mois: 0,
        duree_max_mois: 0,
        description: "",
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
                <Pencil size={18} className="text-green-700" />
              </div>

              <div>
                <h2 className="text-sm font-bold text-gray-900">
                  Modification
                </h2>

                <p className="mt-0.5 text-[11px] text-gray-400">
                  Modifier le taux d'interet.
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
            ></label>

            <div className="relative">
              <SquareDashedText
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="description"
                name="description"
                type="text"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                disabled={pending}
                className={`w-full rounded-lg border bg-white py-2.5 pl-9 pr-3 text-xs text-gray-800 outline-none transition placeholder:text-gray-400 `}
              />
            </div>
          </div>

          {/* ===================================================
              TELEPHONE
          =================================================== */}

          <div>
            <label
              htmlFor="phone"
              className="mb-1.5 block text-xs font-semibold text-gray-700"
            >
              Taux
            </label>

            <div className="relative">
              <Sigma
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="taux_mensuel"
                name="taux_mensuel"
                type="tel"
                value={formData.taux_mensuel}
                onChange={handleChange}
                placeholder="Taux"
                disabled={pending}
                className={`w-full rounded-lg border bg-white py-2.5 pl-9 pr-3 text-xs text-gray-800 outline-none transition placeholder:text-gray-400 $ `}
              />
            </div>
          </div>

          {/* ===================================================
              ADRESSE
          =================================================== */}

          <div>
            <label
              htmlFor="adresse"
              className="mb-1.5 block text-xs font-semibold text-gray-700"
            >
              Duree minimun
            </label>

            <div className="relative">
              <CalendarDays
                size={16}
                className="absolute left-3 top-3 text-gray-400"
              />

              <input
                id="duree_min_mois"
                name="duree_min_mois"
                type="text"
                value={formData.duree_min_mois}
                onChange={handleChange}
                placeholder="xxx"
                disabled={pending}
                className={`w-full rounded-lg border bg-white py-2.5 pl-9 pr-3 text-xs text-gray-800 outline-none transition placeholder:text-gray-400  `}
              />
            </div>
          </div>

          {/* ===================================================
              TYPE MEMBRE
          =================================================== */}
          <div>
            <label
              htmlFor="adresse"
              className="mb-1.5 block text-xs font-semibold text-gray-700"
            >
              Duree maximus
            </label>
            <div className="relative">
              <CalendarDays
                size={16}
                className="absolute left-3 top-3 text-gray-400"
              />

              <input
                id="duree_max_mois"
                name="duree_max_mois"
                type="text"
                value={formData.duree_max_mois}
                onChange={handleChange}
                placeholder="xxx"
                disabled={pending}
                className={`w-full rounded-lg border bg-white py-2.5 pl-9 pr-3 text-xs text-gray-800 outline-none transition placeholder:text-gray-400 `}
              />
            </div>
          </div>

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
                !formData.description ||
                !formData.taux_mensuel ||
                !formData.duree_max_mois ||
                !formData.duree_min_mois
              }
              className="flex min-w-25 cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-800 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-green-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Modification...
                </>
              ) : (
                "Modifier"
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditRate;
