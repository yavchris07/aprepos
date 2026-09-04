// import React, { useState } from "react";
// import { Loader2 } from "lucide-react";
// import { useToast } from "../../../components/toast-context";
// import { getToken } from "../../../utlis/get-token";
// import { useCreateAccount } from "../hooks/use-create-account";
// import GetMember from "../../members/components/get-member";

// const CreateAccount = ({ onClose, open }: createAccountProps) => {
//   const token = getToken();
//   const { create, fail, pending } = useCreateAccount(token ?? "");

//   const { showToast } = useToast();
//   const [formData, setFormData] = useState({
//     id: 0,
//     membre: 0,
//     numero_compte: "",
//     balance: 0,
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await create(formData);
//       showToast("Création reussie !", "success");
//       onClose();
//     } catch (e) {
//       if (e instanceof Error) {
//         console.log(e.message);
//         showToast(fail, "error");
//       } else {
//         console.log("error");
//         showToast(fail, "error");
//       }
//     }
//   };

//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//       <div className="bg-zinc-50 p-4 rounded w-112.5 shadow-sm">
//         <div className="flex justify-between items-center my-2">
//           <h2 className="text-black font-semibold">Création compte épargne</h2>
//           <span onClick={onClose} className="text-gray-600 cursor-pointer">
//             x
//           </span>
//         </div>
//         <p className="text-gray-500 text-xs font-medium my-3">
//           Ajouter un compte épargne pour permettre aux membres d'épargner et de
//           prendre de crédit.
//         </p>
//         <form onSubmit={handleSubmit} className="flex flex-col gap-0">
//           <GetMember
//             value={formData.membre}
//             onChange={(member) =>
//               setFormData((prev) => ({
//                 ...prev,
//                 membre: member.id,
//               }))
//             }
//             token={token ?? ""}
//           />
//           <div className="w-full my-1 hidden">
//             <label className="text-gray-900 text-xs font-semibold">
//               Numéro compte
//             </label>
//             <input
//               type="text"
//               value={formData.numero_compte}
//               onChange={(e) =>
//                 setFormData({ ...formData, numero_compte: e.target.value })
//               }
//               placeholder="Numéro compte"
//               className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
//             />
//           </div>

//           <div className="w-full my-1 hidden">
//             <label className="text-gray-900 text-xs font-semibold">
//               Balance
//             </label>
//             <input
//               type="text"
//               value={formData.balance}
//               onChange={(e) =>
//                 setFormData({ ...formData, balance: Number(e.target.value) })
//               }
//               placeholder="Numéro ID"
//               className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
//             />
//           </div>
//           <div className="flex justify-end gap-2 my-2">
//             <span
//               className="hover:bg-gray-100 border border-gray-300 text-gray-900 text-xs py-2 px-6 rounded font-semibold cursor-pointer"
//               onClick={onClose}
//             >
//               Annuler
//             </span>
//             <button
//               type="submit"
//               className="bg-green-800 text-white text-xs py-2 px-6 rounded cursor-pointer font-semibold flex justify-center"
//               disabled={pending}
//             >
//               {pending ? (
//                 <Loader2 className="animate-spin" size={14} />
//               ) : (
//                 "Ajouter"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateAccount;

import { Loader2, X, WalletCards } from "lucide-react";
import { useState } from "react";
import { getToken } from "../../../utlis/get-token";
import Modal from "../../../components/modal";
import { useToast } from "../../../components/toast-context";
import { useCreateAccount } from "../hooks/use-create-account";
import GetMember from "../../members/components/get-member";

type createAccountProps = {
  open: boolean;
  onClose: () => void;
};

const CreateAccount = ({ onClose, open }: createAccountProps) => {
  const token = getToken();
  const { create, fail, pending } = useCreateAccount(token ?? "");
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    id: 0,
    membre: 0,
    numero_compte: "",
    balance: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.membre) {
      showToast("Veuillez sélectionner un membre.", "error");
      return;
    }

    try {
      await create(formData);

      showToast("Compte épargne créé avec succès !", "success");

      setFormData({
        id: 0,
        membre: 0,
        numero_compte: "",
        balance: 0,
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
              <WalletCards size={20} className="text-green-800" />
            </div>

            <div>
              <h2 className="text-gray-900 font-semibold text-base">
                Nouveau compte
              </h2>

              <p className="text-gray-500 text-xs mt-0.5">
                Créer un compte épargne pour un membre.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center
                       text-gray-500 hover:bg-gray-100 hover:text-gray-800
                       transition cursor-pointer"
            aria-label="Fermer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="pt-5">
          <div className="space-y-4">
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
                Sélectionnez le membre auquel ce compte sera associé.
              </p>
            </div>

            {/* Informations automatiques */}
            <div className="rounded-lg bg-gray-50 border border-gray-200 p-3">
              <p className="text-xs font-semibold text-gray-700 mb-2">
                Informations du compte
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="block text-[11px] text-gray-400">
                    Numéro de compte
                  </span>
                  <span className="text-xs text-gray-500">
                    Généré automatiquement
                  </span>
                </div>

                <div>
                  <span className="block text-[11px] text-gray-400">
                    Solde initial
                  </span>
                  <span className="text-xs text-gray-500">0 FC</span>
                </div>
              </div>
            </div>
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
              disabled={pending || !formData.membre}
              className="min-w-28 px-5 py-2 rounded-lg bg-green-800
                         text-white text-xs font-semibold
                         hover:bg-green-900 transition
                         flex items-center justify-center gap-2
                         disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {pending ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Création...
                </>
              ) : (
                "Créer le compte"
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateAccount;
