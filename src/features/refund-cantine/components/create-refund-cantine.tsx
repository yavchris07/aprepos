import React, { useState } from "react";
import { BanknoteArrowDown, Landmark, Loader2, X } from "lucide-react";
import { useToast } from "../../../components/toast-context";
// import { getToken } from "../../../utlis/get-token";
import { useCreateRefundCantine } from "../hooks/use-create-refund-cantine";
import { currency } from "../../../utlis/currency";
import type { CreditCantine } from "../../../utlis/type";
// import GetMember from "../../members/components/get-member";

type createRefundCantineProps = {
  open: boolean;
  onClose: () => void;
  credit: CreditCantine;
  token: string;
};

const CreateRefundCantine = ({
  onClose,
  open,
  credit,
  token,
}: createRefundCantineProps) => {
  const { create, fail, pending } = useCreateRefundCantine(token ?? "");
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    credit_cantine: credit.id,
    montant: 0,
    devise: "",
    date: new Date().toLocaleDateString("en-CA"),
  });

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await create(formData);
      showToast("Création remboursement cantine reussie !", "success");
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

  // const devies = [
  //   { id: "usd", name: "Dollars Americains" },
  //   { id: "cdf", name: "Francs congolais" },
  // ];

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-zinc-50 p-4 rounded w-112.5 shadow-sm">
        {/* <div className="flex justify-between items-center my-2">
          <h2 className="text-black font-semibold">
            Création remboursement cantine
          </h2>
          <span onClick={onClose} className="text-gray-600 cursor-pointer">
            x
          </span>
        </div>
        <p className="text-gray-500 text-xs font-medium my-3">
          Remboursement cantine.
        </p> */}

        <div className="flex items-start justify-between border-b border-gray-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100">
                <BanknoteArrowDown size={18} className="text-green-700" />
              </div>

              <div>
                <h2 className="text-sm font-bold text-gray-900">
                  Création remboursement cantine
                </h2>

                <p className="mt-0.5 text-[11px] text-gray-400">
                  Remboursement cantine.
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-0">
         <div className="rounded-lg border border-green-100 bg-green-50 px-3 py-2.5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xs font-semibold text-gray-700">
                  {credit.nom_membre}
                </h2>

                <p className="mt-0.5 text-[10px] text-gray-400">
                  {credit.balance}
                </p>
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-green-700 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                {credit.devise}
              </span>
            </div>
          </div>
          <div className="w-full my-2">
            <label className="text-gray-900 text-xs font-semibold">
              Montant
            </label>
            <input
              type="text"
              value={formData.montant}
              onChange={(e) =>
                setFormData({ ...formData, montant: Number(e.target.value) })
              }
              placeholder="Montant"
              className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
            />
          </div>

          <div className="relative">
            <Landmark
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
              id="type_member"
              name="type_member"
              value={formData.devise}
              onChange={(e) =>
                setFormData({ ...formData, devise: e.target.value })
              }
              disabled={pending}
              className={`w-full appearance-none rounded-lg border bg-white py-2.5 pl-9 pr-3 text-xs text-gray-800 outline-none transition`}
            >
              <option value="">Sélectionner un type</option>

              {currency.map((kind) => (
                <option key={kind.id} value={kind.id}>
                  {kind.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full my-2">
            <label className="text-gray-900 text-xs font-semibold">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
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
                "Rembourser"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRefundCantine;
