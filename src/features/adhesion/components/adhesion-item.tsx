import type { Adhesion } from "../../../utlis/type";
import Modal from "../../../components/modal";

type adhesionItemProps = {
  open: string;
  onClose: () => void;
  adhesion: Adhesion;
};

const AdhesionItem = ({ adhesion, onClose, open }: adhesionItemProps) => {
  if (open === null) return null;
  return (
    <Modal>
      <div className="flex justify-between items-center my-2">
        <h2 className="text-black font-semibold">Adhesion</h2>
        <span onClick={onClose} className="text-gray-600 cursor-pointer">
          x
        </span>
      </div>
      <div>{adhesion.membre}</div>
    </Modal>
  );
};

export default AdhesionItem;
