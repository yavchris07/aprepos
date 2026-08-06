import ItemCardList from "../components/item-card-list";
import LoanItemList from "../components/loan-item-list";
import OperationItemList from "../components/operation-item-list";
import RootLayout from "../components/root-layout";
import TransactionItem from "../features/transactions/components/transaction-item";
import { getToken } from "../utlis/get-token";
import { useTransactions } from "../features/transactions/hooks/use-transactions";
import type { Loan, Transaction } from "../utlis/type";
import { useLoans } from "../features/loan/hooks/use-loans";

const DashboardPage = () => {
  const token = getToken();
  const { data } = useTransactions(token ?? "");
  const { data: ln } = useLoans(token ?? "");
  const transactions: Transaction[] = data?.transactions ?? [];
  const loans: Loan[] = ln?.loans ?? [];

  return (
    <RootLayout>
      <div className="flex flex-col my-3">
        <h1 className="text-gray-900 font-semibold text-sm">
          Tableau de board /{" "}
          <span className="text-gray-500">partie principale</span>{" "}
        </h1>
        <p className="text-gray-500 text-xs my-2">Coopéc CEPARCREA</p>
      </div>

      <div className="grid grid-cols-[31%_38%_31%] gap-1">
        {/* col 1 */}
        <div className="flex flex-col gap-2">
          <ItemCardList />
          <div className="grid grid-cols-1 gap-2 p-2">
            <div className="">
              <h2>Transactions récentes</h2>
              <div className="flex flex-col gap-1 mt-4">
                {transactions.slice(0, 5).map((item) => (
                  <TransactionItem item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* col 2 */}
        <div className="p-2 bg-zinc-50">
          <OperationItemList />
        </div>
        {/* col 3 */}
        <div className="px-3 py-1">
          <div className="">
            <h2>Emprunts récents</h2>
            <LoanItemList items={loans} />
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default DashboardPage;
