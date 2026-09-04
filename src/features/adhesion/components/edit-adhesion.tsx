import React, { useState } from "react";
import type { Adhesion } from "../../../utlis/type";
import { getToken } from "../../../utlis/get-token";
import { useToast } from "../../../components/toast-context";
import Modal from "../../../components/modal";
import { CalendarDays, Loader2, Pencil, X } from "lucide-react";
import { useEditeAdhesion } from "../hooks/use-edit-adhesion";
import GetMember from "../../members/components/get-member";
import { getISOWeek, getISOWeekYear } from "date-fns";

type modalProps = {
  open: boolean;
  onClose: () => void;
  adhesion: Adhesion;
};

const EditAdhesion = ({ open, onClose, adhesion }: modalProps) => {
  const token = getToken();
  const { editAdhesion, fail, pending } = useEditeAdhesion(token ?? "");
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    id: adhesion.id,
    membre: adhesion.membre,
    montant: adhesion.montant,
    devise: adhesion.devise,
    annee: adhesion.annee,
    date: adhesion.date,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("XX==XX :", formData);
      await editAdhesion(formData);
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

  const currency = [
    { id: "usd", name: "USD" },
    { id: "cdf", name: "CDF" },
  ];

  // const handleDeviseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setFormData({ ...formData, devise: event.target.value });
  // };

  // const handleMembreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setFormData({ ...formData, membre: Number(event.target.value) });
  // };

  const handleDateChange = (date: string) => {
    if (!date) {
      setFormData((prev) => ({
        ...prev,
        date: "",
        semaine: 0,
        annee: "",
      }));
      return;
    }

    const d = new Date(`${date}T00:00:00`);

    setFormData((prev) => ({
      ...prev,
      date,
      semaine: getISOWeek(d),
      annee: getISOWeekYear(d).toString(),
    }));
  };

  if (!open) return null;
  return (
    <Modal>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100">
              <Pencil size={18} className="text-green-800" />
            </div>

            <div>
              <h2 className="text-gray-900 font-semibold">
                Modifier l'adhésion
              </h2>

              <p className="text-gray-500 text-xs mt-1">
                Modifiez les informations de l'adhésion.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex items-center justify-center
              w-8 h-8 rounded-full
              text-gray-400
              hover:text-gray-700
              hover:bg-gray-100
              transition
              cursor-pointer
            "
            aria-label="Fermer"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-0">
          <div className="space-y-4">
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

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Montant
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.montant || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, annee: e.target.value })
                  }
                  placeholder="0.00"
                  className="w-full border border-gray-300 text-gray-900
                             py-2.5 px-3 rounded-lg text-sm
                             outline-none transition
                             focus:border-green-700 focus:ring-2
                             focus:ring-green-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Devise
                </label>

                <select
                  value={formData.devise}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      devise: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 text-gray-900
                             py-2.5 px-3 rounded-lg text-sm bg-white
                             outline-none transition
                             focus:border-green-700 focus:ring-2
                             focus:ring-green-100"
                >
                  <option value="">Devise</option>

                  {currency.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Date du paiement
              </label>

              <div className="relative">
                <CalendarDays
                  size={17}
                  className="absolute left-3 top-1/2
                             -translate-y-1/2 text-gray-400"
                />

                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleDateChange(e.target.value)}
                  placeholder="YYYY-MM-DD"
                  className="w-full border border-gray-300 text-gray-900
                             py-2.5 pl-10 pr-3 rounded-lg text-sm
                             outline-none transition
                             focus:border-green-700 focus:ring-2
                             focus:ring-green-100"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={pending}
              className="
                px-4 py-2
                rounded-lg
                border border-gray-300
                bg-white
                text-gray-700
                text-xs font-semibold
                hover:bg-gray-50
                transition
                cursor-pointer
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={pending}
              className="
                flex items-center justify-center gap-2
                min-w-28
                px-4 py-2
                rounded-lg
                bg-green-800
                text-white
                text-xs font-semibold
                hover:bg-green-900
                transition
                cursor-pointer
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              {pending ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Modification...
                </>
              ) : (
                <>
                  <Pencil size={14} />
                  Modifier
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditAdhesion;
