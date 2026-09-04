import { useState } from "react";
import { getToken } from "../../../utlis/get-token";
import type { Kind } from "../../../utlis/type";
import { useEditeKind } from "../hooks/use-edit-kind";
import { useToast } from "../../../components/toast-context";
import Modal from "../../../components/modal";
import { Loader2, Pencil, X } from "lucide-react";

type editKindMemeberProps = {
  open: boolean;
  onClose: () => void;
  kind: Kind;
};

const EditKind = ({ kind, onClose, open }: editKindMemeberProps) => {
  const token = getToken();
  const { updateKind, fail, pending } = useEditeKind(token ?? "");

  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    id: kind.id,
    nom: kind.nom,
    description: kind.description,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateKind(formData);
      showToast("Modification reussie !", "success");
      onClose();
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        showToast(fail, "error");
      } else {
        console.log("error");
        showToast(fail || "Impossible de modifier le type de membre.", "error");
      }
    }
  };

  if (!open) return null;
  
  return (
    <Modal>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100">
              <Pencil size={18} className="text-green-800" />
            </div>

            <div>
              <h2 className="text-gray-900 font-semibold">
                Modifier le type de membre
              </h2>

              <p className="text-gray-500 text-xs mt-1">
                Modifiez les informations du type de membre.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex items-center justify-center
              w-8 h-8 rounded-full
              text-gray-400
              hover:text-gray-700
              hover:bg-gray-100
              transition
              cursor-pointer
            "
            aria-label="Fermer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="py-4">
          {/* Nom */}
          <div className="mb-3">
            <label
              htmlFor="nom"
              className="block mb-1.5 text-xs font-semibold text-gray-700"
            >
              Nom du type de membre
            </label>

            <input
              id="nom"
              name="nom"
              type="text"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Nom du type de membre"
              required
              className="
                w-full
                rounded-lg
                border border-gray-300
                bg-white
                px-3 py-2.5
                text-sm text-gray-900
                outline-none
                transition
                placeholder:text-gray-400
                focus:border-green-700
                focus:ring-2
                focus:ring-green-100
              "
            />
          </div>

          {/* Téléphone */}
          <div className="mb-3">
            <label
              htmlFor="description"
              className="block mb-1.5 text-xs font-semibold text-gray-700"
            >
              Description du type de membre
            </label>

            <input
              id="description"
              name="description"
              type="text"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description du type de membre"
              required
              className="
                w-full
                rounded-lg
                border border-gray-300
                bg-white
                px-3 py-2.5
                text-sm text-gray-900
                outline-none
                transition
                placeholder:text-gray-400
                focus:border-green-700
                focus:ring-2
                focus:ring-green-100
              "
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={pending}
              className="
                px-4 py-2
                rounded-lg
                border border-gray-300
                bg-white
                text-gray-700
                text-xs font-semibold
                hover:bg-gray-50
                transition
                cursor-pointer
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
                flex items-center justify-center gap-2
                min-w-28
                px-4 py-2
                rounded-lg
                bg-green-800
                text-white
                text-xs font-semibold
                hover:bg-green-900
                transition
                cursor-pointer
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              {pending ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Modification...
                </>
              ) : (
                <>
                  <Pencil size={14} />
                  Modifier
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditKind;
