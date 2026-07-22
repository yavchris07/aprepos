import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "../../../components/toast-context";
import { getToken } from "../../../utlis/get-token";
import { useCreateMember } from "../hooks/use-create-member";
import Modal from "../../../components/modal";

type createMemberProps = {
  open: string;
  onClose: () => void;
};

const CreateMember = ({ onClose, open }: createMemberProps) => {
  const token = getToken();
  const { create, fail, pending } = useCreateMember(token ?? "");

  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    id: 0,
    nom_complet: "",
    phone: "",
    adresse: "",
    status: "",
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

  if (!open) return null;

  return (
    <Modal>
      <div className="flex justify-between items-center my-2">
        <h2 className="text-black font-semibold">Création Membre</h2>
        <span onClick={onClose} className="text-gray-600 cursor-pointer">
          x
        </span>
      </div>
      <p className="text-gray-500 text-xs font-medium my-3">
        Ajoute un membre dans la base de donnees de Ceparcrea.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-0">
        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">
            Nom complet
          </label>
          <input
            type="text"
            value={formData.nom_complet}
            onChange={(e) =>
              setFormData({ ...formData, nom_complet: e.target.value })
            }
            placeholder="Nom complet"
            className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
          />
        </div>
        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">
            Téléphone
          </label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="Téléphone"
            className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
          />
        </div>

        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">
            Adressse
          </label>
          <input
            type="text"
            value={formData.adresse}
            onChange={(e) =>
              setFormData({ ...formData, adresse: e.target.value })
            }
            placeholder="Adresse"
            className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
          />
        </div>

        {/* <div className="w-full my-1">
            <label className="text-gray-900 text-xs font-semibold">
              Status
            </label>
            <input
              type="text"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              placeholder="Status"
              className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
            />
          </div> */}

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
              "Ajouter"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateMember;
