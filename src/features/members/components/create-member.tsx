import { Loader2, User, Phone, MapPin, Users, X } from "lucide-react";
import { useState } from "react";
import Modal from "../../../components/modal";
import { getToken } from "../../../utlis/get-token";
import type { Kind } from "../../../utlis/type";
import { useCreateMember } from "../hooks/use-create-member";
import { useToast } from "../../../components/toast-context";

interface CreateMemberProps {
  onClose: () => void;
  open: boolean;
  kinds: Kind[];
}

const CreateMember = ({ onClose, open, kinds }: CreateMemberProps) => {
  const token = getToken();

  const { create, fail, pending } = useCreateMember(token ?? "");

  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    id: 0,
    nom_complet: "",
    phone: "",
    adresse: "",
    type_member: "",
    status: "actif",
  });

  const [errors, setErrors] = useState({
    nom_complet: "",
    phone: "",
    adresse: "",
    type_member: "",
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
      nom_complet: "",
      phone: "",
      adresse: "",
      type_member: "",
    };

    let valid = true;

    if (!formData.nom_complet.trim()) {
      newErrors.nom_complet = "Le nom complet est obligatoire.";
      valid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Le numéro de téléphone est obligatoire.";
      valid = false;
    }

    if (!formData.adresse.trim()) {
      newErrors.adresse = "L'adresse est obligatoire.";
      valid = false;
    }

    if (!formData.type_member) {
      newErrors.type_member = "Veuillez sélectionner un type de membre.";
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
        type_member: Number(formData.type_member),
      });

      showToast("Membre créé avec succès !", "success");

      onClose();

      // Réinitialiser le formulaire
      setFormData({
        id: 0,
        nom_complet: "",
        phone: "",
        adresse: "",
        type_member: "",
        status: "actif",
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
                <User size={18} className="text-green-700" />
              </div>

              <div>
                <h2 className="text-sm font-bold text-gray-900">
                  Nouveau membre
                </h2>

                <p className="mt-0.5 text-[11px] text-gray-400">
                  Ajouter un membre à CEPARCREA
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
              Nom complet
            </label>

            <div className="relative">
              <User
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="nom_complet"
                name="nom_complet"
                type="text"
                value={formData.nom_complet}
                onChange={handleChange}
                placeholder="Ex. Jean Dupont"
                disabled={pending}
                className={`w-full rounded-lg border bg-white py-2.5 pl-9 pr-3 text-xs text-gray-800 outline-none transition placeholder:text-gray-400 ${
                  errors.nom_complet
                    ? "border-red-400 focus:ring-2 focus:ring-red-100"
                    : "border-gray-300 focus:border-green-700 focus:ring-2 focus:ring-green-100"
                }`}
              />
            </div>

            {errors.nom_complet && (
              <p className="mt-1 text-[10px] text-red-500">
                {errors.nom_complet}
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
              Téléphone
            </label>

            <div className="relative">
              <Phone
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Ex. +243 8XX XXX XXX"
                disabled={pending}
                className={`w-full rounded-lg border bg-white py-2.5 pl-9 pr-3 text-xs text-gray-800 outline-none transition placeholder:text-gray-400 ${
                  errors.phone
                    ? "border-red-400 focus:ring-2 focus:ring-red-100"
                    : "border-gray-300 focus:border-green-700 focus:ring-2 focus:ring-green-100"
                }`}
              />
            </div>

            {errors.phone && (
              <p className="mt-1 text-[10px] text-red-500">{errors.phone}</p>
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
              Adresse
            </label>

            <div className="relative">
              <MapPin
                size={16}
                className="absolute left-3 top-3 text-gray-400"
              />

              <input
                id="adresse"
                name="adresse"
                type="text"
                value={formData.adresse}
                onChange={handleChange}
                placeholder="Ex. Goma, Katindo"
                disabled={pending}
                className={`w-full rounded-lg border bg-white py-2.5 pl-9 pr-3 text-xs text-gray-800 outline-none transition placeholder:text-gray-400 ${
                  errors.adresse
                    ? "border-red-400 focus:ring-2 focus:ring-red-100"
                    : "border-gray-300 focus:border-green-700 focus:ring-2 focus:ring-green-100"
                }`}
              />
            </div>

            {errors.adresse && (
              <p className="mt-1 text-[10px] text-red-500">{errors.adresse}</p>
            )}
          </div>

          {/* ===================================================
              TYPE MEMBRE
          =================================================== */}

          <div>
            <label
              htmlFor="type_member"
              className="mb-1.5 block text-xs font-semibold text-gray-700"
            >
              Type de membre
            </label>

            <div className="relative">
              <Users
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <select
                id="type_member"
                name="type_member"
                value={formData.type_member}
                onChange={handleChange}
                disabled={pending}
                className={`w-full appearance-none rounded-lg border bg-white py-2.5 pl-9 pr-3 text-xs text-gray-800 outline-none transition ${
                  errors.type_member
                    ? "border-red-400 focus:ring-2 focus:ring-red-100"
                    : "border-gray-300 focus:border-green-700 focus:ring-2 focus:ring-green-100"
                }`}
              >
                <option value="">Sélectionner un type</option>

                {kinds.map((kind) => (
                  <option key={kind.id} value={kind.id}>
                    {kind.nom}
                  </option>
                ))}
              </select>
            </div>

            {errors.type_member && (
              <p className="mt-1 text-[10px] text-red-500">
                {errors.type_member}
              </p>
            )}
          </div>

          {/* ===================================================
              STATUS
          =================================================== */}

          <div className="rounded-lg border border-green-100 bg-green-50 px-3 py-2.5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-700">
                  État du membre
                </p>

                <p className="mt-0.5 text-[10px] text-gray-400">
                  Le membre sera enregistré comme actif.
                </p>
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-green-700 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                Actif
              </span>
            </div>
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
                !formData.nom_complet ||
                !formData.phone ||
                !formData.adresse ||
                !formData.type_member
              }
              className="flex min-w-25 cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-800 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-green-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Création...
                </>
              ) : (
                "Ajouter le membre"
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateMember;
