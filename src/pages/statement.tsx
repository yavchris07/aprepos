import RootLayout from "../components/root-layout";
import { useMemo, useState } from "react";
import TransactionStatement from "../features/transactions/components/transaction-statement";
import { useTransactions } from "../features/transactions/hooks/use-transactions";
import { getToken } from "../utlis/get-token";
import type { Transaction } from "../utlis/type";
// import Pagination from "../components/pagination";

const StatementPage = () => {
  const token = getToken();
  const { data } = useTransactions(token ?? "");
  const transactions: Transaction[] = useMemo(
    () => data?.transactions ?? [],
    [data?.transactions],
  );

  const [searchQuery, setSearchQuery] = useState("");

  //Search
  const filteredData = useMemo(() => {
    return transactions.filter((item) =>
      String(item.compte).includes(searchQuery),
    );
  }, [searchQuery, transactions]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // setCurrentPage(1);
  };

  return (
    <RootLayout>
      <div className="flex justify-between items-center my-3">
        <h1 className="text-gray-900 font-semibold text-sm">
          Tableau de board /{" "}
          <span className="text-gray-500"> Relevé de compte</span>{" "}
        </h1>
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
          placeholder="Recherche par nom !"
          className="border border-gray-400 py-2 pl-2 rounded"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <TransactionStatement loading={false} transactions={filteredData} />

      {/* <Pagination filtered={filteredData} items={tr} /> */}
    </RootLayout>
  );
};

export default StatementPage;
