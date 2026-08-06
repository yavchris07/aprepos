import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "../../../components/toast-context";
import { getToken } from "../../../utlis/get-token";
import Modal from "../../../components/modal";
import { useCreateLoan } from "../hooks/use-create-loan";
import GetMember from "../../members/components/get-member";

type createLoanProps = {
  open: string;
  onClose: () => void;
};

const CreateLoan = ({ onClose, open }: createLoanProps) => {
  const token = getToken();
  const { create, fail, pending } = useCreateLoan(token ?? "");

  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    id: 0,
    membre: 0,
    montant: 0,
    taux_interet: 0,
    total_a_payer: 0,
    balance: 0,
    date: "",
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
        <h2 className="text-black font-semibold">Création emprunt</h2>
        <span onClick={onClose} className="text-gray-600 cursor-pointer">
          x
        </span>
      </div>
      <p className="text-gray-500 text-xs font-medium my-3">
        Ajouter un emprunt ou credit.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-0">
        <GetMember
          value={formData.membre}
          onChange={(member) =>
            setFormData((prev) => ({
              ...prev,
              membre: member.id,
            }))
          }
          token={token}
        />
        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">Montant</label>
          <input
            type="text"
            value={formData.montant}
            onChange={(e) =>
              setFormData({ ...formData, montant: Number(e.target.value) })
            }
            placeholder="Téléphone"
            className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
          />
        </div>

        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">Taux</label>
          <input
            type="text"
            value={formData.taux_interet}
            onChange={(e) =>
              setFormData({ ...formData, taux_interet: Number(e.target.value) })
            }
            placeholder="Taux"
            className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
          />
        </div>

        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">Total</label>
          <input
            type="text"
            value={formData.total_a_payer}
            onChange={(e) =>
              setFormData({
                ...formData,
                total_a_payer: Number(e.target.value),
              })
            }
            placeholder="Total"
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
              "Ajouter"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateLoan;
