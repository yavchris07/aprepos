import React, { useState } from "react";
import type { Adhesion } from "../../../utlis/type";
import { getToken } from "../../../utlis/get-token";
import { useToast } from "../../../components/toast-context";
import Modal from "../../../components/modal";
import { Loader2 } from "lucide-react";

type modalProps = {
  open: string;
  onClose: () => void;
  addhesion: Adhesion;
  choice: { id: string; name: string }[];
};

const EditAdhesion = ({ open, onClose, addhesion, choice }: modalProps) => {
  const token = getToken();
  const { updateUser, fail, pending } = useUpdateUser(token ?? "");
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    id: addhesion.id,
    membre: addhesion.membre,
    montant: addhesion.montant,
    annee: addhesion.annee,
    date: addhesion.date,
  });

  console.log("rrr == : ", choice);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("XX==XX :", formData);
      await updateUser(formData);
      showToast("Mise a jour reussie !", "success");
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

  const handleMembreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, membre: event.target.value });
  };

  if (!open) return null;
  return (
    <Modal>
      <div className="flex justify-between items-center my-2">
        <h2 className="text-black font-semibold">Editer utilisateur</h2>
        <span onClick={onClose} className="text-gray-600 cursor-pointer">
          x
        </span>
      </div>
      <p className="text-gray-500 text-xs font-medium my-3">
        Editer adhesion , modifier comme bon vous semble.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-0">
        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">Membre</label>
          <select
            className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
            onChange={handleMembreChange}
          >
            <option value="">-- Choix role --</option>
            {roleItems.map((rol) => (
              <option key={rol.id} value={rol.id}>
                {rol.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">Montant</label>
          <input
            type="text"
            value={formData.montant}
            onChange={(e) =>
              setFormData({ ...formData, montant: Number(e.target.value) })
            }
            placeholder="Matricule"
            className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
          />
        </div>

        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">Année</label>
          <input
            type="text"
            value={formData.annee}
            onChange={(e) =>
              setFormData({ ...formData, annee: e.target.value })
            }
            placeholder="Numéro ID"
            className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
          />
        </div>

        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">Date</label>
          <input
            type="text"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            placeholder="Nom"
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
            className="bg-amber-500 text-black text-xs py-2 px-6 rounded cursor-pointer font-semibold flex justify-center"
            disabled={pending}
          >
            {pending ? <Loader2 className="animate-spin" size={14} /> : "Editer"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditAdhesion;
