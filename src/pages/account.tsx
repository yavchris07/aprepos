import { useMemo, useState } from "react";
import RootLayout from "../components/root-layout";
import ListAccount from "../features/account/components/list-account";
import type { Account } from "../utlis/type";
import CreateAccount from "../features/account/components/create-account";
import EditAccount from "../features/account/components/edit-account";
import DeleteAccount from "../features/account/components/delete-account";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

const AccountPage = () => {
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

  const members = [
    {
      id: 1,
      nom_complet: "KASEREKA NZANGI",
      phone: "098747343",
      adresse: "hIMBI ",
      status: "aCTIF",
    },
    {
      id: 2,
      nom_complet: "OLIVIER MUNYANEZ",
      phone: "098747343",
      adresse: "hIMBI ",
      status: "aCTIF",
    },
    {
      id: 3,
      nom_complet: "OMBENI YETU",
      phone: "098747343",
      adresse: "hIMBI ",
      status: "aCTIF",
    },
  ];

  const [selectedItem, setSelectedItem] = useState<Account | null>(null);
  const [modal, setModal] = useState<"open" | "edit" | "delete" | "view">(null);

  const handleDelete = (item: Account) => {
    setSelectedItem(item);
    setModal("delete");
  };
  const handleEdit = (item: Account) => {
    setSelectedItem(item);
    setModal("edit");
  };
  const handleView = (item: Account) => {
    setSelectedItem(item);
    setModal("view");
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  //Search
  const filteredData = useMemo(() => {
    return accounts.filter((item) =>
      String(item.membre).toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [accounts, searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Pagination
  const itemsPerPage = 18;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAccounts = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(accounts.length / itemsPerPage);

  console.log(handleView);
  return (
    <RootLayout>
      <div className="flex justify-between items-center my-3">
        <h1 className="text-gray-900 font-semibold text-sm">
          Tableau de board /{" "}
          <span className="text-gray-500">Compte epargne</span>{" "}
        </h1>

        <span
          className="bg-green-800 text-white px-3 py-1 rounded cursor-pointer"
          onClick={() => setModal("open")}
        >
          Nouveau
        </span>
      </div>

      <div className="flex justify-between items-center my-6 rounded">
        <div>
          {" "}
          <span className="bg-green-800 py-2 px-4 rounded text-xs text-white">
            Liste compte epargne
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

      <ListAccount
        accounts={currentAccounts}
        loading={false}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onView={handleView}
      />


      {/* Pagination */}
      {accounts.length > 18 && (
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
        <CreateAccount
          members={members}
          onClose={() => setModal(null)}
          open={modal}
        />
      )}
      {modal === "edit" && selectedItem && (
        <EditAccount
          account={selectedItem}
          members={members}
          onClose={() => setModal(null)}
          open={modal}
        />
      )}
      {modal === "delete" && selectedItem && (
        <DeleteAccount
          account={selectedItem}
          onClose={() => setModal(null)}
          open={modal}
        />
      )}
    </RootLayout>
  );
};

export default AccountPage;
