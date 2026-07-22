import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "../../../components/toast-context";
import { getToken } from "../../../utlis/get-token";
import type { Member, Social } from "../../../utlis/type";
import { useCreateSocial } from "../hooks/use-create-social";

type createSocialProps = {
  open: string;
  onClose: () => void;
  members: Member[];
  social: Social;
};

const EditSocial = ({ members, onClose, open, social }: createSocialProps) => {
  const token = getToken();
  const { create, fail, pending } = useCreateSocial(token ?? "");
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    id: social.id,
    membre: social.membre,
    semaine: social.semaine,
    annee: social.annee,
    montant: social.montant,
    date: social.date,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await create(formData);
      showToast("Création reussie !", "success");
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
    setFormData({ ...formData, membre: Number(event.target.value) });
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-zinc-50 p-4 rounded w-112.5 shadow-sm">
        <div className="flex justify-between items-center my-2">
          <h2 className="text-black font-semibold">Editer social</h2>
          <span onClick={onClose} className="text-gray-600 cursor-pointer">
            x
          </span>
        </div>
        <p className="text-gray-500 text-xs font-medium my-3">
          Editer le paiement de social en cas d'erreur.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-0">
          <div className="w-full my-1">
            <label className="text-gray-900 text-xs font-semibold">
              Membre
            </label>
            <select
              className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
              onChange={handleMembreChange}
              value={formData.membre}
            >
              <option value="">-- Membre --</option>
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nom_complet}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full my-1">
            <label className="text-gray-900 text-xs font-semibold">
              Montant
            </label>
            <input
              type="text"
              value={formData.montant}
              onChange={(e) =>
                setFormData({ ...formData, montant: Number(e.target.value) })
              }
              placeholder="Numéro compte"
              className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
            />
          </div>

          <div className="w-full my-1">
            <label className="text-gray-900 text-xs font-semibold">
              Semaine
            </label>
            <input
              type="text"
              value={formData.semaine}
              onChange={(e) =>
                setFormData({ ...formData, semaine: Number(e.target.value) })
              }
              placeholder="Numéro ID"
              className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
            />
          </div>
          <div className="w-full my-1">
            <label className="text-gray-900 text-xs font-semibold">Annee</label>
            <input
              type="text"
              value={formData.annee}
              onChange={(e) =>
                setFormData({ ...formData, annee:  e.target.value })
              }
              placeholder="Numéro ID"
              className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
            />
          </div>
          <div className="w-full my-1">
            <label className="text-gray-900 text-xs font-semibold">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              placeholder="Numéro ID"
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
              className="bg-green-800 text-white text-xs py-2 px-6 rounded cursor-pointer font-semibold flex justify-center"
              disabled={pending}
            >
              {pending ? (
                <Loader2 className="animate-spin" size={14} />
              ) : (
                "Editer"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSocial;
