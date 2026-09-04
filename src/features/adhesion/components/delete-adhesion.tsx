import {
  AlertTriangle,
  CalendarDays,
  Coins,
  Loader2,
  Trash2,
  X,
} from "lucide-react";
import type { Adhesion } from "../../../utlis/type";
import { useToast } from "../../../components/toast-context";
import { getToken } from "../../../utlis/get-token";
import Modal from "../../../components/modal";
import { useDeleteAdhesion } from "../hooks/use-delete-adhesion";

type modalProps = {
  open: boolean;
  onClose: () => void;
  adhesion: Adhesion;
};

const DeletAdhesion = ({ adhesion, open, onClose }: modalProps) => {
  const token = getToken();
  const { deleteUser, fail, pending } = useDeleteAdhesion(token ?? "");
  const { showToast } = useToast();
  // const [formData, setFormData] = useState({ id: adhesion.id });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await deleteUser(adhesion.id);
      showToast("Suppression adhesion reussie !", "success");
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

  if (open === null) return null;

  return (
    <Modal>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <Trash2 size={19} className="text-red-600" />
            </div>

            <div>
              <h2 className="text-gray-900 font-semibold text-base">
                Supprimer l'adhésion
              </h2>

              <p className="text-gray-400 text-xs mt-0.5">
                Confirmation requise
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            className="
              w-8 h-8
              rounded-full
              flex items-center justify-center
              text-gray-400
              hover:text-gray-700
              hover:bg-gray-100
              transition
              disabled:opacity-50
            "
          >
            <X size={17} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Content */}
          <div className="py-5">
            {/* Warning */}
            <div className="flex gap-3 p-3 rounded-lg bg-red-50 border border-red-100">
              <AlertTriangle
                size={18}
                className="text-red-600 shrink-0 mt-0.5"
              />

              <div>
                <p className="text-sm font-medium text-red-800">Attention</p>

                <p className="text-xs text-red-700 mt-1 leading-5">
                  Cette contribution sera définitivement supprimée. Cette action
                  ne peut pas être annulée.
                </p>
              </div>
            </div>

            {/* Contribution */}
            <div className="mt-4 rounded-lg border border-gray-200 overflow-hidden">
              {/* Member */}
              <div className="p-4 bg-gray-50">
                <p className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">
                  Membre
                </p>

                <div className="flex items-center gap-3 mt-2">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-800 font-semibold text-sm">
                      {adhesion.membre_nom?.charAt(0)?.toUpperCase() ?? "M"}
                    </span>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {adhesion.membre_nom ?? "Membre inconnu"}
                    </p>

                    <p className="text-xs text-gray-500">
                      adhésion
                    </p>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 divide-x border-t border-gray-200">
                <div className="p-3">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Coins size={14} />
                    <span className="text-[11px]">Montant</span>
                  </div>

                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    {adhesion.montant}{" "}
                    <span className="text-xs text-gray-500 uppercase">
                      {adhesion.devise}
                    </span>
                  </p>
                </div>

                <div className="p-3">
                  <div className="flex items-center gap-2 text-gray-400">
                    <CalendarDays size={14} />
                    <span className="text-[11px]">Année</span>
                  </div>

                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    {adhesion.annee || "-"}
                  </p>
                </div>
              </div>
            </div>

            {/* Confirmation message */}
            <p className="text-xs text-gray-600 text-center mt-5">
              Voulez-vous vraiment supprimer cette contribution ?
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              disabled={pending}
              className="
                px-5 py-2.5
                rounded-lg
                border border-gray-300
                text-gray-700
                text-xs
                font-semibold
                hover:bg-gray-50
                transition
                disabled:opacity-50
                disabled:cursor-not-allowed
                cursor-pointer
              "
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={pending}
              className="
                min-w-28
                px-5 py-2.5
                rounded-lg
                bg-red-700
                text-white
                text-xs
                font-semibold
                flex items-center justify-center gap-2
                hover:bg-red-800
                active:bg-red-900
                transition
                disabled:bg-red-300
                disabled:cursor-not-allowed
                cursor-pointer
              "
            >
              {pending ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Suppression...
                </>
              ) : (
                <>
                  <Trash2 size={14} />
                  Supprimer
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default DeletAdhesion;
