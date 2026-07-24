import { useMemo, useState } from "react";
import RootLayout from "../components/root-layout";
import type { Transaction } from "../utlis/type";
import ListTransaction from "../features/transactions/components/list-transactions";
import EditTransaction from "../features/transactions/components/edit-transaction";
import DeleteTransaction from "../features/transactions/components/delete-transaction";
import CreateTransaction from "../features/transactions/components/create-transaction";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

const TransactionPage = () => {
  const tr = [
    {
      id: 1,
      compte: 1,
      type_transaction: "Dépôt",
      montant: 500,
      date: "2026-07-01 09:15:00",
      reference: "TRX-20260701-0001",
    },
    {
      id: 2,
      compte: 1,
      type_transaction: "Retrait",
      montant: 150,
      date: "2026-07-02 11:20:00",
      reference: "TRX-20260702-0002",
    },
    {
      id: 3,
      compte: 2,
      type_transaction: "Dépôt",
      montant: 800,
      date: "2026-07-02 15:40:00",
      reference: "TRX-20260702-0003",
    },
    {
      id: 4,
      compte: 3,
      type_transaction: "Dépôt",
      montant: 300,
      date: "2026-07-03 08:10:00",
      reference: "TRX-20260703-0004",
    },
    {
      id: 5,
      compte: 2,
      type_transaction: "Retrait",
      montant: 120,
      date: "2026-07-03 13:05:00",
      reference: "TRX-20260703-0005",
    },
    {
      id: 6,
      compte: 4,
      type_transaction: "Dépôt",
      montant: 950,
      date: "2026-07-04 10:45:00",
      reference: "TRX-20260704-0006",
    },
    {
      id: 7,
      compte: 5,
      type_transaction: "Dépôt",
      montant: 1200,
      date: "2026-07-04 16:25:00",
      reference: "TRX-20260704-0007",
    },
    {
      id: 8,
      compte: 6,
      type_transaction: "Retrait",
      montant: 80,
      date: "2026-07-05 09:35:00",
      reference: "TRX-20260705-0008",
    },
    {
      id: 9,
      compte: 7,
      type_transaction: "Dépôt",
      montant: 400,
      date: "2026-07-05 14:50:00",
      reference: "TRX-20260705-0009",
    },
    {
      id: 10,
      compte: 1,
      type_transaction: "Transfert",
      montant: 250,
      date: "2026-07-06 10:10:00",
      reference: "TRX-20260706-0010",
    },
    {
      id: 11,
      compte: 2,
      type_transaction: "Dépôt",
      montant: 600,
      date: "2026-07-06 15:45:00",
      reference: "TRX-20260706-0011",
    },
    {
      id: 12,
      compte: 3,
      type_transaction: "Retrait",
      montant: 50,
      date: "2026-07-07 08:30:00",
      reference: "TRX-20260707-0012",
    },
    {
      id: 13,
      compte: 4,
      type_transaction: "Dépôt",
      montant: 1000,
      date: "2026-07-07 12:00:00",
      reference: "TRX-20260707-0013",
    },
    {
      id: 14,
      compte: 5,
      type_transaction: "Paiement",
      montant: 180,
      date: "2026-07-08 09:25:00",
      reference: "TRX-20260708-0014",
    },
    {
      id: 15,
      compte: 6,
      type_transaction: "Dépôt",
      montant: 450,
      date: "2026-07-08 17:10:00",
      reference: "TRX-20260708-0015",
    },
    {
      id: 16,
      compte: 7,
      type_transaction: "Retrait",
      montant: 100,
      date: "2026-07-09 11:15:00",
      reference: "TRX-20260709-0016",
    },
    {
      id: 17,
      compte: 1,
      type_transaction: "Paiement",
      montant: 75,
      date: "2026-07-09 16:40:00",
      reference: "TRX-20260709-0017",
    },
    {
      id: 18,
      compte: 2,
      type_transaction: "Transfert",
      montant: 300,
      date: "2026-07-10 09:50:00",
      reference: "TRX-20260710-0018",
    },
    {
      id: 19,
      compte: 5,
      type_transaction: "Dépôt",
      montant: 700,
      date: "2026-07-10 13:20:00",
      reference: "TRX-20260710-0019",
    },
    {
      id: 20,
      compte: 4,
      type_transaction: "Retrait",
      montant: 220,
      date: "2026-07-11 10:05:00",
      reference: "TRX-20260711-0020",
    },
    {
      id: 21,
      compte: 3,
      type_transaction: "Dépôt",
      montant: 950,
      date: "2026-07-11 14:30:00",
      reference: "TRX-20260711-0021",
    },
    {
      id: 22,
      compte: 6,
      type_transaction: "Transfert",
      montant: 125,
      date: "2026-07-12 09:40:00",
      reference: "TRX-20260712-0022",
    },
    {
      id: 23,
      compte: 7,
      type_transaction: "Paiement",
      montant: 90,
      date: "2026-07-12 15:10:00",
      reference: "TRX-20260712-0023",
    },
    {
      id: 24,
      compte: 5,
      type_transaction: "Retrait",
      montant: 350,
      date: "2026-07-13 11:45:00",
      reference: "TRX-20260713-0024",
    },
    {
      id: 25,
      compte: 1,
      type_transaction: "Dépôt",
      montant: 1000,
      date: "2026-07-13 17:30:00",
      reference: "TRX-20260713-0025",
    },
  ];

  const accounts = [
    {
      id: 1,
      membre: 1,
      numero_compte: "ACC-20260001",
      balance: 1250.75,
    },
    {
      id: 2,
      membre: 2,
      numero_compte: "ACC-20260002",
      balance: 840.5,
    },
    {
      id: 3,
      membre: 3,
      numero_compte: "ACC-20260003",
      balance: 0,
    },
    {
      id: 4,
      membre: 4,
      numero_compte: "ACC-20260004",
      balance: 325.25,
    },
    {
      id: 5,
      membre: 5,
      numero_compte: "ACC-20260005",
      balance: 5120,
    },
    {
      id: 6,
      membre: 6,
      numero_compte: "ACC-20260006",
      balance: 187.9,
    },
    {
      id: 7,
      membre: 7,
      numero_compte: "ACC-20260007",
      balance: 2695.4,
    },
  ];

  const [selectedItem, setSelectedItem] = useState<Transaction | null>(null);
  const [modal, setModal] = useState<"open" | "edit" | "delete">(null);

  const handleDelete = (item: Transaction) => {
    setSelectedItem(item);
    setModal("delete");
  };
  const handleEdit = (item: Transaction) => {
    setSelectedItem(item);
    setModal("edit");
  };
  // const handleView = (item: Transaction) => {
  //   setSelectedItem(item);
  //   setModal("view");
  // };

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  //Search
  const filteredData = useMemo(() => {
    return tr.filter((item) => String(item.compte).includes(searchQuery));
    // item?.compte.includes(searchQuery)
  }, [searchQuery, tr]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Pagination
  const itemsPerPage = 18;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredData.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const totalPages = Math.ceil(tr.length / itemsPerPage);

  return (
    <RootLayout>
      <div className="flex justify-between items-center my-3">
        <h1 className="text-gray-900 font-semibold text-sm">
          Tableau de board /{" "}
          <span className="text-gray-500">Transactions</span>{" "}
        </h1>

        <span
          className="bg-green-800 text-white px-3 py-1 rounded cursor-pointer"
          onClick={() => setModal("open")}
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

      {tr.length > 18 && (
        <div className="flex gap-2 text-gray-500 w-max px-4 py-2 rounded mt-2 ">
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
      {modal === "open" && (
        <CreateTransaction
          onClose={() => setModal(null)}
          accounts={accounts}
          open={modal}
        />
      )}
      {modal === "edit" && selectedItem && (
        <EditTransaction
          accounts={accounts}
          onClose={() => setModal(null)}
          transaction={selectedItem}
          open={modal}
        />
      )}
      {modal === "delete" && selectedItem && (
        <DeleteTransaction
          transaction={selectedItem}
          onClose={() => setModal(null)}
          open={modal}
        />
      )}
    </RootLayout>
  );
};

export default TransactionPage