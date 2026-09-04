import Modal from "../../../components/modal";
import React, { useState } from "react";
import { useEditeMember } from "../hooks/use-edit-member";
import type { Kind, Member } from "../../../utlis/type";
import { Loader2, Pencil, X } from "lucide-react";
import { useToast } from "../../../components/toast-context";
import { getToken } from "../../../utlis/get-token";

type editMemberProps = {
  open: boolean;
  onClose: () => void;
  member: Member;
  kinds: Kind[];
};

const EditMember = ({ onClose, open, member, kinds }: editMemberProps) => {
  const token = getToken();
  const { editMember, fail, pending } = useEditeMember(token ?? "");
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    id: member.id,
    nom_complet: member.nom_complet ?? "",
    phone: member.phone ?? "",
    adresse: member.adresse ?? "",
    type_member: member.type_member ?? 0,
    status: member.status ?? "actif",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "type_member" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await editMember(formData);
      showToast("Membre modifié avec succès !", "success");
      onClose();
    } catch (e) {
      console.error("Edit member error:", e);
      showToast(fail || "Impossible de modifier le membre.", "error");
    }
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
                Modifier le membre
              </h2>

              <p className="text-gray-500 text-xs mt-1">
                Modifiez les informations du membre.
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
          {/* Nom */}
          <div className="mb-3">
            <label
              htmlFor="nom_complet"
              className="block mb-1.5 text-xs font-semibold text-gray-700"
            >
              Nom complet
            </label>

            <input
              id="nom_complet"
              name="nom_complet"
              type="text"
              value={formData.nom_complet}
              onChange={handleChange}
              placeholder="Nom complet"
              required
              className="
                w-full
                rounded-lg
                border border-gray-300
                bg-white
                px-3 py-2.5
                text-sm text-gray-900
                outline-none
                transition
                placeholder:text-gray-400
                focus:border-green-700
                focus:ring-2
                focus:ring-green-100
              "
            />
          </div>

          {/* Téléphone */}
          <div className="mb-3">
            <label
              htmlFor="phone"
              className="block mb-1.5 text-xs font-semibold text-gray-700"
            >
              Téléphone
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Numéro de téléphone"
              required
              className="
                w-full
                rounded-lg
                border border-gray-300
                bg-white
                px-3 py-2.5
                text-sm text-gray-900
                outline-none
                transition
                placeholder:text-gray-400
                focus:border-green-700
                focus:ring-2
                focus:ring-green-100
              "
            />
          </div>

          {/* Adresse */}
          <div className="mb-3">
            <label
              htmlFor="adresse"
              className="block mb-1.5 text-xs font-semibold text-gray-700"
            >
              Adresse
            </label>

            <input
              id="adresse"
              name="adresse"
              type="text"
              value={formData.adresse}
              onChange={handleChange}
              placeholder="Adresse du membre"
              className="
                w-full
                rounded-lg
                border border-gray-300
                bg-white
                px-3 py-2.5
                text-sm text-gray-900
                outline-none
                transition
                placeholder:text-gray-400
                focus:border-green-700
                focus:ring-2
                focus:ring-green-100
              "
            />
          </div>

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
              value={formData.type_member}
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
              <option value={0}>-- Type de membre --</option>

              {kinds.map((kind) => (
                <option key={kind.id} value={kind.id}>
                  {kind.nom}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="mb-4">
            <label
              htmlFor="status"
              className="block mb-1.5 text-xs font-semibold text-gray-700"
            >
              Statut
            </label>

            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
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
              <option value="actif">Actif</option>
              <option value="inactif">Inactif</option>
            </select>
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

export default EditMember;
