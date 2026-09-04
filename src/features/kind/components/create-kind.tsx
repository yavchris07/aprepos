import { useState } from "react";
import { useToast } from "../../../components/toast-context";
import { getToken } from "../../../utlis/get-token";
import { BookUp2, Loader2, UserRoundCog, X } from "lucide-react";
import Modal from "../../../components/modal";
import { useCreateKind } from "../hooks/use-create-kind";

type createKindMemeberProps = {
  open: boolean;
  onClose: () => void;
};

const CreateKind = ({ onClose, open }: createKindMemeberProps) => {
  const token = getToken();
  const { create, fail, pending } = useCreateKind(token ?? "");

  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    id: 0,
    nom: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    nom: "",
    description: "",
  });

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
      description: "",
    };

    let valid = true;

    if (!formData.nom.trim()) {
      newErrors.nom = "Le nom est obligatoire.";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await create(formData);
      showToast("Création reussie !", "success");

      onClose();
      setFormData({ id: 0, nom: "", description: "" });
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        showToast(fail, "error");
      } else {
        console.log("error");
        showToast(fail, "error");
      }
    }
  };

  if (!open) return null;

  return (
    <Modal>
      <div className="w-full max-w-lg">
        <div className="flex items-start justify-between border-b border-gray-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100">
                <UserRoundCog size={18} className="text-green-700" />
              </div>

              <div>
                <h2 className="text-sm font-bold text-gray-900">
                  Nouveau type de membre
                </h2>

                <p className="mt-0.5 text-[11px] text-gray-400">
                  Ajouter un type de membre à CEPARCREA
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
              Nom de type de membre <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <UserRoundCog
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="nom"
                name="nom"
                type="text"
                value={formData.nom}
                onChange={handleChange}
                placeholder="Type de membre"
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

          <div>
            <label
              htmlFor="phone"
              className="mb-1.5 block text-xs font-semibold text-gray-700"
            >
              Description
            </label>

            <div className="relative">
              <BookUp2
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="description"
                name="description"
                type="text"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description du type de membre"
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
              disabled={pending || !formData.nom || !formData.description}
              className="flex min-w-25 cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-800 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-green-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Création...
                </>
              ) : (
                "Ajouter le type de membre"
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateKind;
