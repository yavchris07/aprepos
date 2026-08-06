import { useMemo, useState } from "react";
import RootLayout from "../components/root-layout";
import ListAccount from "../features/account/components/list-account";
import type { Account } from "../utlis/type";
import CreateAccount from "../features/account/components/create-account";
import DeleteAccount from "../features/account/components/delete-account";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
// import { useMembers } from "../features/members/hooks/use-members";
import { useAccounts } from "../features/account/hooks/use-accounts";
import { getToken } from "../utlis/get-token";
import AccountItem from "../features/account/components/account-item";
import AccountPDF from "../components/pdf/accounts";

const AccountPage = () => {
  const token = getToken();
  // const { data: mb } = useMembers(token ?? "");
  const { data, isLoading } = useAccounts(token ?? "");

  // const members: Member[] = mb?.members ?? [];
  const accounts: Account[] = data?.accounts ?? [];
  const pagination = data?.pagination;

  console.log(pagination);

  const [selectedItem, setSelectedItem] = useState<Account | null>(null);
  const [modal, setModal] = useState<"open" | "delete" | "view">(null);

  const handleDelete = (item: Account) => {
    setSelectedItem(item);
    setModal("delete");
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
      item.membre_nom.toLowerCase().includes(searchQuery.toLowerCase()),
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

  console.log();
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
          <AccountPDF data={accounts} />
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
        loading={isLoading}
        onDelete={handleDelete}
        // onEdit={handleEdit}
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
          // members={members}
          onClose={() => setModal(null)}
          open={modal}
        />
      )}
      {modal === "view" && selectedItem && (
        <AccountItem
          account={selectedItem}
          // members={members}
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
