import React, { useState } from "react";
import { CalendarDays, Loader2, Pencil, X } from "lucide-react";
import { useToast } from "../../../components/toast-context";
import { getToken } from "../../../utlis/get-token";
import type { Member, Social } from "../../../utlis/type";
import { useEditeSocial } from "../hooks/use-edit-social";
import Modal from "../../../components/modal";
import { getISOWeek, getISOWeekYear } from "date-fns";

type createSocialProps = {
  open: boolean;
  onClose: () => void;
  members: Member[];
  social: Social;
};

const EditSocial = ({ members, onClose, open, social }: createSocialProps) => {
  const token = getToken();
  const { editSocial, fail, pending } = useEditeSocial(token ?? "");
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    id: social.id,
    membre: social.membre,
    semaine: social.semaine,
    annee: social.annee,
    montant: social.montant,
    date: social.date,
    // devise: social.,
  });

  const currency = [
    { id: "usd", name: "USD" },
    { id: "cdf", name: "CDF" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await editSocial(formData);
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "type_member" ? Number(value) : value,
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
                Modifier le social
              </h2>

              <p className="text-gray-500 text-xs mt-1">
                Modifiez les informations de la contribution sociale.
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="py-4">
          {/* Type membre */}
          <div className="mb-3">
            <label
              htmlFor="type_member"
              className="block mb-1.5 text-xs font-semibold text-gray-700"
            >
              Type de membre
            </label>

            <select
              id="type_member"
              name="type_member"
              value={formData.membre}
              onChange={handleChange}
              required
              className="
                w-full
                rounded-lg
                border border-gray-300
                bg-white
                px-3 py-2.5
                text-xs text-gray-900
                outline-none
                transition
                focus:border-green-700
                focus:ring-2
                focus:ring-green-100
              "
            >
              <option value="">-- Membre --</option>
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nom_complet}
                </option>
              ))}
            </select>
          </div>

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
                  setFormData((prev) => ({
                    ...prev,
                    montant: Number(e.target.value),
                  }))
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
                value={formData.annee}
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
                className="w-full border border-gray-300 text-gray-900
                             py-2.5 pl-10 pr-3 rounded-lg text-sm
                             outline-none transition
                             focus:border-green-700 focus:ring-2
                             focus:ring-green-100"
              />
            </div>

            <div className="mt-2 rounded-lg bg-amber-50 border border-amber-100 p-3">
              <p className="text-[11px] text-amber-700 leading-relaxed">
                Le paiement social est généralement effectué le samedi.
                Sélectionnez la date correspondant au jour réel du paiement.
              </p>
            </div>
          </div>

          {/* Actions */}
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

export default EditSocial;
