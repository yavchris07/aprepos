import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "../../../components/toast-context";
import { getToken } from "../../../utlis/get-token";
import Modal from "../../../components/modal";
import type { Loan, Member } from "../../../utlis/type";
import { useEditLoan } from "../hooks/use-edit-loans";

type editLoanProps = {
  open: string;
  onClose: () => void;
  members : Member[]
  loan:Loan
};

const EditLoan = ({ onClose, open, members, loan }: editLoanProps) => {
  const token = getToken();
  const { editLoan, fail, pending } = useEditLoan(token ?? "");
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    id: loan.id,
    membre: loan.membre,
    montant: loan.montant,
    taux_interet: loan.taux_interet,
    total_a_payer: loan.total_a_payer,
    balance: loan.balance,
    date: loan.date,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await editLoan(formData);
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
    <Modal>
      <div className="flex justify-between items-center my-2">
        <h2 className="text-black font-semibold">Editer emprunt</h2>
        <span onClick={onClose} className="text-gray-600 cursor-pointer">
          x
        </span>
      </div>
      <p className="text-gray-500 text-xs font-medium my-3">
        Editer un emprunt ou credit en cas d'erreur.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-0">
        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">Membre</label>
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
              "Editer"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditLoan;
