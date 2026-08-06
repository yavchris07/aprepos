import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "../../../components/toast-context";
import { getToken } from "../../../utlis/get-token";
import type { Member } from "../../../utlis/type";
import { useCreateSocial } from "../hooks/use-create-social";
import { getISOWeek, getISOWeekYear } from "date-fns";
import GetMember from "../../members/components/get-member";

type createSocialProps = {
  open: boolean;
  onClose: () => void;
  members: Member[];
};

const CreateSocial = ({ onClose, open }: createSocialProps) => {
  const token = getToken();
  const { create, fail, pending } = useCreateSocial(token ?? "");
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    id: 0,
    membre: 0,
    semaine: 0,
    annee: "",
    montant: 0,
    devise: "",
    date: "",
  });

  const handleDateChange = (date: string) => {
    const d = new Date(date);

    setFormData((prev) => ({
      ...prev,
      date,
      semaine: getISOWeek(d),
      annee: getISOWeekYear(d).toString(),
    }));
  };

  const currency = [
    { id: "usd", name: "USD" },
    { id: "cdf", name: "CDF" },
  ];

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

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-zinc-50 p-4 rounded w-112.5 shadow-sm">
        <div className="flex justify-between items-center my-2">
          <h2 className="text-black font-semibold">Création social</h2>
          <span onClick={onClose} className="text-gray-600 cursor-pointer">
            x
          </span>
        </div>
        <p className="text-gray-500 text-xs font-medium my-3">
          Ajouter un paiement de social, dans la ceparcrea.
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
          <div className="w-full my-1">
            <label className="text-gray-900 text-xs font-semibold">
              Devise
            </label>
            <select
              className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
              onChange={handleDeviseChange}
              value={formData.devise}
            >
              <option value="">-- Devise --</option>
              {currency.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full my-1">
            <label className="text-gray-900 text-xs font-semibold">Date</label>
            <p className="text-xs text-red-500 italic my-1">
              Mettez uniquement la date de samedi ou du jour choisit pour payer
              le cas social
            </p>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleDateChange(e.target.value)}
              className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
            />
          </div>

          <div className="text-sm text-gray-600">
            <p>Semaine : {formData.semaine}</p>
            <p>Année : {formData.annee}</p>
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

export default CreateSocial;
