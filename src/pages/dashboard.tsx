import ItemCardList from "../components/item-card-list";
import LoanItemList from "../components/loan-item-list";
import OperationItemList from "../components/operation-item-list";
import RootLayout from "../components/root-layout";
import TransactionItem from "../features/transactions/components/transaction-item";

const DashboardPage = () => {
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
  const ln = [
    {
      id: 1,
      membre: 1,
      montant: 500,
      taux_interet: 10,
      total_a_payer: 550,
      balance: 350,
      date: "2026-01-10",
    },
    {
      id: 2,
      membre: 2,
      montant: 1000,
      taux_interet: 12,
      total_a_payer: 1120,
      balance: 920,
      date: "2026-01-18",
    },
    {
      id: 3,
      membre: 3,
      montant: 750,
      taux_interet: 8,
      total_a_payer: 810,
      balance: 0,
      date: "2026-02-02",
    },
    {
      id: 4,
      membre: 4,
      montant: 300,
      taux_interet: 10,
      total_a_payer: 330,
      balance: 130,
      date: "2026-02-14",
    },
    {
      id: 5,
      membre: 5,
      montant: 1200,
      taux_interet: 15,
      total_a_payer: 1380,
      balance: 980,
      date: "2026-03-01",
    },
    {
      id: 6,
      membre: 6,
      montant: 450,
      taux_interet: 10,
      total_a_payer: 495,
      balance: 495,
      date: "2026-03-15",
    },
    {
      id: 7,
      membre: 7,
      montant: 900,
      taux_interet: 12,
      total_a_payer: 1008,
      balance: 608,
      date: "2026-04-05",
    },
    {
      id: 8,
      membre: 2,
      montant: 650,
      taux_interet: 10,
      total_a_payer: 715,
      balance: 215,
      date: "2026-04-22",
    },
    {
      id: 9,
      membre: 4,
      montant: 800,
      taux_interet: 8,
      total_a_payer: 864,
      balance: 864,
      date: "2026-05-10",
    },
    {
      id: 10,
      membre: 1,
      montant: 1500,
      taux_interet: 15,
      total_a_payer: 1725,
      balance: 1225,
      date: "2026-06-01",
    },
    {
      id: 11,
      membre: 1,
      montant: 500,
      taux_interet: 10,
      total_a_payer: 550,
      balance: 350,
      date: "2026-01-10",
    },
    {
      id: 12,
      membre: 2,
      montant: 1000,
      taux_interet: 12,
      total_a_payer: 1120,
      balance: 920,
      date: "2026-01-18",
    },
  ];
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
                {tr.slice(0, 5).map((item) => (
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
            <LoanItemList items={ln} />
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default DashboardPage;
