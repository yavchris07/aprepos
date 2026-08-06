import { useState } from "react";
import { getToken } from "../../../utlis/get-token";
import type { Kind } from "../../../utlis/type";
import { useEditeKind } from "../hooks/use-edit-kind";
import { useToast } from "../../../components/toast-context";
import Modal from "../../../components/modal";
import { Loader2 } from "lucide-react";

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
        showToast(fail, "error");
      }
    }
  };

  if (!open) return null;
  return (
    <Modal>
      <div className="flex justify-between items-center my-2">
        <h2 className="text-black font-semibold">Editer type membre</h2>
        <span onClick={onClose} className="text-gray-600 cursor-pointer">
          x
        </span>
      </div>
      <p className="text-gray-500 text-xs font-medium my-3">
        Editer ce type de membre en cas d'erreur.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-0">
        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">Nom</label>
          <input
            type="text"
            value={formData.nom}
            onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
            placeholder="Nom"
            className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
          />
        </div>

        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">
            Descriptions
          </label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Description"
            className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
          />
        </div>

        <div className="flex justify-end gap-2 my-2">
          <span
            className="hover:bg-gray-100 border border-gray-300 text-gray-900 text-xs py-2 px-6 rounded font-semibold cursor-pointer"
            onClick={onClose}
          >
            Annuler
          </span>
          <button
            type="submit"
            className="bg-orange-800 text-white text-xs py-2 px-6 rounded cursor-pointer font-semibold flex justify-center"
            disabled={pending}
          >
            {pending ? (
              <Loader2 className="animate-spin" size={14} />
            ) : (
              "Modifier"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditKind;
