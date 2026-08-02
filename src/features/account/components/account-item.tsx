import { UserLock } from "lucide-react";
import Modal from "../../../components/modal";
import type { Account } from "../../../utlis/type";
import { formatAccountNumber } from "../../../utlis/fomatted-number";

type accountItemProps = {
  open: string;
  onClose: () => void;
  account: Account;
};

const AccountItem = ({ account, onClose, open }: accountItemProps) => {
  if (!open) return null;
  return (
    <Modal>
      <div className="flex justify-between items-center my-2">
        <h2 className="text-black font-semibold">Compte épargne</h2>
        <span onClick={onClose} className="text-gray-600 cursor-pointer">
          x
        </span>
      </div>
      <p className="text-gray-500 text-xs font-medium my-3">
        Le compte épargne, aide a épargners.
      </p>
      <div className="flex gap-4 items-center justify-between">
        <div className="flex gap-4 items-center">
          <div className="bg-green-200 rounded-full flex justify-between py-2 px-3 items-center">
            <UserLock size={25} className="text-green-700" />
          </div>
          <div>
            <p className="text-gray-700">{account.membre_nom}</p>
            <p className="text-orange-800 font-semibold">
              {formatAccountNumber(account.numero_compte)}
            </p>
          </div>
        </div>

        <span className="text-black font-bold">{account.balance} FC</span>
      </div>
      <p className="text-gray-500 my-4 text-xs">
        Ce numéro de compte épargne,va servir a faire de transactions, dépot et
        retrait dans le systeme.
      </p>
    </Modal>
  );
};

export default AccountItem;
