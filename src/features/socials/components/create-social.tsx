import { CalendarDays, HeartHandshake, Loader2, X } from "lucide-react";
import { useState } from "react";
import { getISOWeek, getISOWeekYear } from "date-fns";
import Modal from "../../../components/modal";
import { useToast } from "../../../components/toast-context";
import { getToken } from "../../../utlis/get-token";
import type { Member } from "../../../utlis/type";
import GetMember from "../../members/components/get-member";
import { useCreateSocial } from "../hooks/use-create-social";



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

  const currency = [
    { id: "usd", name: "USD" },
    { id: "cdf", name: "CDF" },
  ];

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.membre) {
      showToast("Veuillez sélectionner un membre.", "error");
      return;
    }

    if (!formData.montant || formData.montant <= 0) {
      showToast("Veuillez saisir un montant valide.", "error");
      return;
    }

    if (!formData.devise) {
      showToast("Veuillez sélectionner une devise.", "error");
      return;
    }

    if (!formData.date) {
      showToast("Veuillez sélectionner une date.", "error");
      return;
    }

    try {
      await create(formData);

      showToast("Paiement social enregistré avec succès !", "success");

      setFormData({
        id: 0,
        membre: 0,
        semaine: 0,
        annee: "",
        montant: 0,
        devise: "",
        date: "",
      });

      onClose();
    } catch (e) {
      console.error(e);
      showToast(fail || "Une erreur est survenue.", "error");
    }
  };

  if (!open) return null;

  return (
    <Modal>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <HeartHandshake
                size={20}
                className="text-green-800"
              />
            </div>

            <div>
              <h2 className="text-gray-900 font-semibold text-base">
                Nouveau paiement social
              </h2>

              <p className="text-gray-500 text-xs mt-0.5">
                Enregistrer une contribution sociale d'un membre.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            className="w-8 h-8 rounded-full flex items-center justify-center
                       text-gray-500 hover:bg-gray-100 hover:text-gray-800
                       transition cursor-pointer disabled:opacity-50"
            aria-label="Fermer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="pt-5">
          <div className="space-y-4">
            {/* Membre */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Membre
              </label>

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

              <p className="text-[11px] text-gray-400 mt-1.5">
                Sélectionnez le membre qui effectue le paiement.
              </p>
            </div>

            {/* Montant + devise */}
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

            {/* Date */}
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

            {/* Période calculée */}
            {formData.date && (
              <div className="rounded-lg border border-green-100 bg-green-50 p-3">
                <p className="text-[11px] text-green-700 font-semibold mb-2">
                  Période du paiement
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="block text-[10px] text-green-600">
                      Semaine
                    </span>

                    <span className="text-sm font-semibold text-green-900">
                      Semaine {formData.semaine}
                    </span>
                  </div>

                  <div>
                    <span className="block text-[10px] text-green-600">
                      Année
                    </span>

                    <span className="text-sm font-semibold text-green-900">
                      {formData.annee}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={pending}
              className="px-5 py-2 rounded-lg border border-gray-300
                         text-gray-700 text-xs font-semibold
                         hover:bg-gray-50 transition cursor-pointer
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={
                pending ||
                !formData.membre ||
                !formData.montant ||
                !formData.devise ||
                !formData.date
              }
              className="min-w-28 px-5 py-2 rounded-lg bg-green-800
                         text-white text-xs font-semibold
                         hover:bg-green-900 transition
                         flex items-center justify-center gap-2
                         disabled:bg-gray-300
                         disabled:cursor-not-allowed"
            >
              {pending ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Enregistrement...
                </>
              ) : (
                "Enregistrer"
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateSocial;

