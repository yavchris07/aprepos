import { useMemo, useState } from "react";
import RootLayout from "../components/root-layout";
import CreateRefund from "../features/refund/components/create-refund";
import ListRefund from "../features/refund/components/list-refund";
import type { Member, Refund } from "../utlis/type";
import EditRefund from "../features/refund/components/edit-refund";
import DeleteRefund from "../features/refund/components/delete-refund";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { getToken } from "../utlis/get-token";
import { useRefunds } from "../features/refund/hooks/use-refunds";
import { useMembers } from "../features/members/hooks/use-members";

const RefundPage = () => {
  const token = getToken();
  const { data } = useRefunds(token ?? "");
  const { data: mb } = useMembers(token ?? "");
  const refunds: Refund[] = useMemo(() => data?.refunds ?? [], [data?.refunds]);
  const members: Member[] = mb?.members ?? [];

  const [selectedItem, setSelectedItem] = useState<Refund | null>(null);
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);

  const handleDelete = (item: Refund) => {
    setSelectedItem(item);
    setDeleteModal(true);
  };
  const handleEdit = (item: Refund) => {
    setSelectedItem(item);
    setEditModal(true);
  };
  const handleView = (item: Refund) => {
    setSelectedItem(item);
    setViewModal(true);
  };

  console.log(viewModal);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  //Search
  const filteredData = useMemo(() => {
    return refunds.filter((item) =>
      String(item.emprumt).toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [refunds, searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Pagination
  const itemsPerPage = 18;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRefunds = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(refunds.length / itemsPerPage);

  return (
    <RootLayout>
      <div className="flex justify-between items-center my-3">
        <h1 className="text-gray-900 font-semibold text-sm">
          Tableau de board /{" "}
          <span className="text-gray-500">Remboursement</span>{" "}
        </h1>

        <span
          className="bg-green-800 text-white px-3 py-1 rounded cursor-pointer"
          onClick={() => setModal(true)}
        >
          Nouveau
        </span>
      </div>

      <div className="flex justify-between items-center my-6 rounded">
        <div>
          {" "}
          <span className="bg-green-800 py-2 px-4 rounded text-xs text-white cursor-pointer">
            Relevé
          </span>{" "}
        </div>
        <input
          type="text"
          placeholder="Recherchez par nom !"
          className="border border-gray-400 py-2 pl-2 rounded"
          onChange={handleSearchChange}
          value={searchQuery}
        />
      </div>

      <ListRefund
        loading={false}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onView={handleView}
        refunds={currentRefunds}
      />

      {refunds.length > 18 && (
        <div className="flex gap-2 text-gray-500 w-max px-4 py-2 rounded mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="bg-green-700 text-white p-2 rounded-full cursor-pointer hover:bg-green-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <ArrowBigLeft size={10} />
          </button>
          <span>
            Page {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="bg-green-700 text-white p-2 rounded-full cursor-pointer hover:bg-green-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <ArrowBigRight size={10} />
          </button>
        </div>
      )}

      {modal && <CreateRefund onClose={() => setModal(false)} open={modal} />}
      {editModal && selectedItem && (
        <EditRefund
          members={members}
          onClose={() => setEditModal(false)}
          open={editModal}
          refund={selectedItem}
        />
      )}
      {deleteModal && selectedItem && (
        <DeleteRefund
          onClose={() => setDeleteModal(false)}
          open={deleteModal}
          refund={selectedItem}
        />
      )}
    </RootLayout>
  );
};

export default RefundPage;
