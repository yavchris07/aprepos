import { useState } from "react";
import { useCreateRate } from "../hooks/use-create-rate";
import { useToast } from "../../../components/toast-context";
import Modal from "../../../components/modal";
import { CalendarDays, Loader2, Sigma, SquareDashedText, X } from "lucide-react";
// import { getToken } from "../../../utlis/get-token";

interface CreateRateProps {
  onClose: () => void;
  open: boolean;
  token: string;
}

const CreateRate = ({ onClose, open, token }: CreateRateProps) => {
  const { create, fail, pending } = useCreateRate(token ?? "");

  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    taux_mensuel: "",
    duree_min_mois: 0,
    duree_max_mois: 0,
    description: "",
  });

  //   {
  //   "": "743475.7",
  //   "": "cdf",
  //   "": 4294967295,
  //   "": "2026-10-21",
  //   "": true,
  //   "": 0,
  //   "": 0
  // }

  const [errors, setErrors] = useState({
    // taux_interet: "",
    // membre: "",
    // est_solde: "",
    // duree_mois: "",
    // devise: "",
    // montant_emprunt: "actif",
    // date: "",
    taux_mensuel: "",
    duree_min_mois: "",
    duree_max_mois: "",
    description: "",
  });

  //   const handleTypeMemberChange = (
  //     event: React.ChangeEvent<HTMLSelectElement>,
  //   ) => {
  //     setFormData({ ...formData, type_member: Number(event.target.value) });
  //   };

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
      taux_mensuel: "",
      duree_min_mois: "",
      duree_max_mois: "",
      description: "",
    };

    let valid = true;

    if (!formData.description.trim()) {
      newErrors.description = "Le nom complet est obligatoire.";
      valid = false;
    }

    if (!formData.duree_min_mois) {
      newErrors.duree_min_mois = "Le numéro de téléphone est obligatoire.";
      valid = false;
    }

    if (!formData.duree_max_mois) {
      newErrors.duree_max_mois = "L'adresse est obligatoire.";
      valid = false;
    }

    if (!formData.taux_mensuel.trim()) {
      newErrors.taux_mensuel = "Veuillez sélectionner un type de membre.";
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
      await create(formData);

      showToast("Taux d'interet créé avec succès !", "success");

      onClose();

      // Réinitialiser le formulaire
      setFormData({
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
                <Sigma size={18} className="text-green-700" />
              </div>

              <div>
                <h2 className="text-sm font-bold text-gray-900">
                  Nouveau taux
                </h2>

                <p className="mt-0.5 text-[11px] text-gray-400">
                  Ajouter un taux d'interet.
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
                className={`w-full rounded-lg border bg-white py-2.5 pl-9 pr-3 text-xs text-gray-800 outline-none transition placeholder:text-gray-400 ${
                  errors.description
                    ? "border-red-400 focus:ring-2 focus:ring-red-100"
                    : "border-gray-300 focus:border-green-700 focus:ring-2 focus:ring-green-100"
                }`}
              />
            </div>

            {errors.description && (
              <p className="mt-1 text-[10px] text-red-500">
                {errors.description}
              </p>
            )}
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
                className={`w-full rounded-lg border bg-white py-2.5 pl-9 pr-3 text-xs text-gray-800 outline-none transition placeholder:text-gray-400 ${
                  errors.taux_mensuel
                    ? "border-red-400 focus:ring-2 focus:ring-red-100"
                    : "border-gray-300 focus:border-green-700 focus:ring-2 focus:ring-green-100"
                }`}
              />
            </div>

            {errors.taux_mensuel && (
              <p className="mt-1 text-[10px] text-red-500">
                {errors.taux_mensuel}
              </p>
            )}
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
                className={`w-full rounded-lg border bg-white py-2.5 pl-9 pr-3 text-xs text-gray-800 outline-none transition placeholder:text-gray-400 ${
                  errors.duree_min_mois
                    ? "border-red-400 focus:ring-2 focus:ring-red-100"
                    : "border-gray-300 focus:border-green-700 focus:ring-2 focus:ring-green-100"
                }`}
              />
            </div>

            {errors.duree_min_mois && (
              <p className="mt-1 text-[10px] text-red-500">
                {errors.duree_min_mois}
              </p>
            )}
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
                className={`w-full rounded-lg border bg-white py-2.5 pl-9 pr-3 text-xs text-gray-800 outline-none transition placeholder:text-gray-400 ${
                  errors.duree_max_mois
                    ? "border-red-400 focus:ring-2 focus:ring-red-100"
                    : "border-gray-300 focus:border-green-700 focus:ring-2 focus:ring-green-100"
                }`}
              />
            </div>

            {errors.duree_max_mois && (
              <p className="mt-1 text-[10px] text-red-500">
                {errors.duree_min_mois}
              </p>
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
                  Création...
                </>
              ) : (
                "Ajouter"
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateRate;
