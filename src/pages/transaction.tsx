import { useMemo, useState } from "react";
import RootLayout from "../components/root-layout";
import type { Account, Transaction } from "../utlis/type";
import ListTransaction from "../features/transactions/components/list-transactions";
import EditTransaction from "../features/transactions/components/edit-transaction";
import DeleteTransaction from "../features/transactions/components/delete-transaction";
import CreateTransaction from "../features/transactions/components/create-transaction";
import { useTransactions } from "../features/transactions/hooks/use-transactions";
import { getToken } from "../utlis/get-token";

const TransactionPage = () => {
  const token = getToken();
  const { data } = useTransactions(token ?? "");

  const accounts: Account[] = [];

  const transactions: Transaction[] = useMemo(
    () => data?.transactions ?? [],
    [data?.transactions],
  );
  // const transactions =  => data ?? [], [data]);
  const pagination = data?.pagination;
  console.log(pagination);

  const [selectedItem, setSelectedItem] = useState<Transaction | null>(null);
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const handleDelete = (item: Transaction) => {
    setSelectedItem(item);
    setDeleteModal(true);
  };
  const handleEdit = (item: Transaction) => {
    setSelectedItem(item);
    setEditModal(true);
  };
  // const handleView = (item: Transaction) => {
  //   setSelectedItem(item);
  //   setModal("view");
  // };

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  //Search
  const filteredData = useMemo(() => {
    return transactions.filter((item) =>
      String(item.compte).includes(searchQuery),
    );
    // item?.compte.includes(searchQuery)
  }, [searchQuery, transactions]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Pagination
  const itemsPerPage = 20;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredData.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  console.log(totalPages);

  return (
    <RootLayout>
      <div className="flex justify-between items-center my-3">
        <h1 className="text-gray-900 font-semibold text-sm">
          Tableau de board /{" "}
          <span className="text-gray-500">Transactions</span>{" "}
        </h1>

        <span
          className="bg-green-800 text-white px-3 py-1 rounded cursor-pointer"
          onClick={() => setModal(true)}
        >
          Nouvelle
        </span>
      </div>

      <div className="flex justify-between items-center my-6 rounded">
        <div>
          {" "}
          <span className="bg-green-800 py-2 px-4 rounded text-xs text-white cursor-pointer">
            PDF
          </span>{" "}
        </div>
        <input
          type="text"
          placeholder="Recherchez par compte !"
          className="border border-gray-400 py-2 pl-2 rounded"
          onChange={handleSearchChange}
          value={searchQuery}
        />
      </div>

      <ListTransaction
        loading={false}
        onDelete={handleDelete}
        onEdit={handleEdit}
        // onView={handleView}
        transactions={currentTransactions}
      />

      {modal && (
        <CreateTransaction onClose={() => setModal(false)} open={modal} />
      )}
      {editModal && selectedItem && (
        <EditTransaction
          accounts={accounts}
          onClose={() => setEditModal(false)}
          transaction={selectedItem}
          open={editModal}
        />
      )}
      {deleteModal && selectedItem && (
        <DeleteTransaction
          transaction={selectedItem}
          onClose={() => setDeleteModal(false)}
          open={deleteModal}
        />
      )}
    </RootLayout>
  );
};

export default TransactionPage;
