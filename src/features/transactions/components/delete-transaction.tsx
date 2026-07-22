import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import type { Transaction } from "../../../utlis/type";
import { useToast } from "../../../components/toast-context";
import { getToken } from "../../../utlis/get-token";
import Modal from "../../../components/modal";
import { useDeleteTransaction } from "../hooks/use-delete-transaction";

type deleteAccountProps = {
  open: string;
  onClose: () => void;
  transaction: Transaction;
};

const DeleteTransaction = ({ onClose, open, transaction }: deleteAccountProps) => {
  const token = getToken();
  const { deleteTransaction, fail, pending } = useDeleteTransaction(token ?? "");
  const { showToast } = useToast();
  const [formData, setFormData] = useState({ id: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await deleteTransaction(transaction.id);
      showToast("Suppression cette transaction reussie !", "success");
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
      <div className="flex justify-between items-center my-2">
        <h2 className="text-black font-semibold">Suppression transaction</h2>
        <span onClick={onClose} className="text-gray-600 cursor-pointer">
          x
        </span>
      </div>
      <form onSubmit={handleSubmit}>
        <p className="text-gray-500 text-sm">
          Voulez-vous vraiment supprimer cette transaction ?{" "}
          <strong>y a de retour apres cette action</strong>
        </p>

        <input
          type="text"
          value={formData.id}
          onChange={(e) => setFormData({ ...formData, id: e.target.value })}
          placeholder="id"
        />

        <div className="flex justify-end gap-2 my-2">
          <span
            className="hover:bg-gray-100 border border-gray-300 text-gray-900 text-xs py-2 px-6 rounded font-semibold cursor-pointer"
            onClick={onClose}
          >
            Annuler
          </span>
          <button
            type="submit"
            className="bg-red-800 text-white text-xs py-2 px-6 rounded cursor-pointer font-semibold flex justify-center"
            disabled={pending}
          >
            {pending ? (
              <Loader2 className="animate-spin" size={14} />
            ) : (
              "Supprimer"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default DeleteTransaction;
