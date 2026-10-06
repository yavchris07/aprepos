import { Loader2 } from "lucide-react";
import React from "react";
import Modal from "../../../components/modal";
import { useToast } from "../../../components/toast-context";
import { useLogout } from "../hooks/use-logoutt";
import { getToken } from "../../../utlis/get-token";
import { useNavigate } from "react-router";

type LogoutProps = {
  open: boolean;
  onClose: () => void;
};

const Logout = ({ onClose, open }: LogoutProps) => {
  // 1. On récupère toujours le token le plus frais
  const token = getToken();
  const navigate = useNavigate()
 
  const { logout, fail, pending } = useLogout(token ?? "");
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 2. Vérification de sécurité au clic
    const currentToken = getToken();

    if (!currentToken) {
      showToast("Aucun token trouvé ou session expirée.", "error");
      onClose();
      return;
    }

    try {
      // Si votre hook `logout` peut prendre le token en paramètre : await logout(currentToken);
      await logout(); 
      showToast("Déconnexion réussie !", "success");
      onClose();
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        // showToast(e.message || fail, "error");
      } else {
        console.log("error");
        showToast(fail, "error");
      }
    }
  };

  if (!open) return null;

  return (
    <Modal>
      <div className="my-2 flex items-center justify-between">
        <h2 className="font-semibold text-black">Déconnexion</h2>
        <span onClick={onClose} className="cursor-pointer text-gray-600">
          ×
        </span>
      </div>

      <form onSubmit={handleSubmit}>
        <p className="text-sm text-gray-500">
          Voulez-vous vraiment vous déconnecter ?
        </p>
        <p className="text-xs text-red-700">
          Cette session sera fermée, il vous faudra vous reconnecter.
        </p>

        <div className="my-2 flex justify-end gap-2">
          <button
            type="button"
            className="cursor-pointer rounded border border-gray-300 px-6 py-2 text-xs font-semibold text-gray-900 hover:bg-gray-100"
            onClick={onClose}
          >
            Annuler
          </button>

          <button
            type="button"
            className="flex cursor-pointer justify-center rounded bg-red-700 px-6 py-2 text-xs font-semibold text-white"
            disabled={pending}
            onClick={()=> navigate('/login')}
          >
            {pending ? (
              <Loader2 className="animate-spin" size={14} />
            ) : (
              "Déconnexion"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default Logout;
