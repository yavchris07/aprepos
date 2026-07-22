import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "../../../components/toast-context";
import { getToken } from "../../../utlis/get-token";
import type { Account } from "../../../utlis/type";
import { useCreateTransaction } from "../hooks/use-create-transaction";

type createAccountProps = {
  open: string;
  onClose: () => void;
  accounts: Account[];
};

const CreateTransaction = ({ accounts, onClose, open }: createAccountProps) => {
  const token = getToken();
  const { create, fail, pending } = useCreateTransaction(token ?? "");

  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    id: 0,
    compte: 0,
    type_transaction: "",
    montant: 0,
    date:'',
    reference:''
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

  const handleAccountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, compte: Number(event.target.value) });
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-zinc-50 p-4 rounded w-112.5 shadow-sm">
        <div className="flex justify-between items-center my-2">
          <h2 className="text-black font-semibold">Création compte épargne</h2>
          <span onClick={onClose} className="text-gray-600 cursor-pointer">
            x
          </span>
        </div>
        <p className="text-gray-500 text-xs font-medium my-3">
          Ajouter un compte épargne pour permettre aux membres d'épargner et de prendre de crédit.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-0">
          <div className="w-full my-1">
            <label className="text-gray-900 text-xs font-semibold">
              Compte
            </label>
            <select
              className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
              onChange={handleAccountChange}
              value={formData.compte}
            >
              <option value="">-- Membre --</option>
              {accounts.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.numero_compte}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full my-1">
            <label className="text-gray-900 text-xs font-semibold">
              Type transaction
            </label>
            <input
              type="text"
              value={formData.type_transaction}
              onChange={(e) =>
                setFormData({ ...formData, type_transaction: e.target.value })
              }
              placeholder="Matricule"
              className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
            />
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
              placeholder="Numéro ID"
              className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
            />
          </div>
           <div className="w-full my-1">
            <label className="text-gray-900 text-xs font-semibold">
              Reference
            </label>
            <input
              type="text"
              value={formData.reference}
              onChange={(e) =>
                setFormData({ ...formData, reference: e.target.value })
              }
              placeholder="Reference"
              className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
            />
          </div>
           <div className="w-full my-1">
            <label className="text-gray-900 text-xs font-semibold">
              Date
            </label>
            <input
              type="date"
              value={formData.montant}
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
                "Ajouter"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTransaction;
