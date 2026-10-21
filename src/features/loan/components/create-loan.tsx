import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "../../../components/toast-context";
import { getToken } from "../../../utlis/get-token";
import Modal from "../../../components/modal";
import { useCreateLoan } from "../hooks/use-create-loan";
import GetMember from "../../members/components/get-member";
import { currency } from "../../../utlis/currency";
import type { Rate } from "../../rate/type";

type createLoanProps = {
  open: boolean;
  onClose: () => void;
  rates:Rate[]
};

const CreateLoan = ({ onClose, open, rates }: createLoanProps) => {
  const token = getToken();
  const { create, fail, pending } = useCreateLoan(token ?? "");

  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    montant_emprunt: 0,
    devise: "",
    taux_interet: 4,
    membre: 0,
    date: new Date().toLocaleDateString("en-CA"),
    est_solde: true,
    duree_mois: 0,
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

  const handleDeviseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, devise: event.target.value });
  };

  const handleRateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, taux_interet: Number(event.target.value) });
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
          token={token ?? ""}
        />
        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">Montant</label>
          <input
            type="text"
            value={formData.montant_emprunt}
            onChange={(e) =>
              setFormData({
                ...formData,
                montant_emprunt: Number(e.target.value),
              })
            }
            placeholder="Téléphone"
            className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
          />
        </div>

        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">Devise</label>
          <select
            className="border border-gray-400 text-black py-2 pl-2 rounded text-xs w-full cursor-pointer"
            onChange={handleDeviseChange}
            value={formData.devise}
          >
            <option value="">-- Devise --</option>
            {currency.map((m) => (
              <option key={m.id} value={m.id} className="cursor-pointer">
                {m.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">Taux</label>
          <select
            className="border border-gray-400 text-black py-2 pl-2 rounded text-xs w-full cursor-pointer"
            onChange={handleRateChange}
            value={formData.taux_interet}
          >
            <option value="">-- Taux d'interet --</option>
            {rates.map((rate) => (
              <option key={rate.id} value={rate.id} className="cursor-pointer">
                {rate.description}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">Durée</label>
          <input
            type="text"
            value={formData.duree_mois}
            onChange={(e) =>
              setFormData({
                ...formData,
                duree_mois: Number(e.target.value),
              })
            }
            placeholder="Total"
            className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
          />
        </div>

        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            placeholder="Taux"
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
