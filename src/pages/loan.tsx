import { useMemo, useState } from "react";
import RootLayout from "../components/root-layout";
import type { Loan } from "../utlis/type";
import CreateLoan from "../features/loan/components/create-loan";

import ListLoans from "../features/loan/components/list-loan";
import EditLoan from "../features/loan/components/edit-loan";

import DeleteLoan from "../features/loan/components/delete-loan";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

const LoanPage = () => {
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
  ];

  const members = [
    {
      id: 1,
      nom_complet: "Jean Mukendi",
      phone: "+243975123456",
      adresse: "Commune d'Ibanda, Bukavu",
      status: "Actif",
    },
    {
      id: 2,
      nom_complet: "Grace Bahati",
      phone: "+243991234567",
      adresse: "Commune de Kadutu, Bukavu",
      status: "Actif",
    },
    {
      id: 3,
      nom_complet: "Patrick Kabeya",
      phone: "+243812345678",
      adresse: "Commune de Bagira, Bukavu",
      status: "Inactif",
    },
    {
      id: 4,
      nom_complet: "Aline Kasereka",
      phone: "+243998765432",
      adresse: "Goma, Quartier Les Volcans",
      status: "Suspendu",
    },
    {
      id: 5,
      nom_complet: "Samuel Nyembo",
      phone: "+243971112233",
      adresse: "Uvira, Centre-ville",
      status: "Actif",
    },
    {
      id: 6,
      nom_complet: "Esther Ilunga",
      phone: "+243995556677",
      adresse: "Butembo, Quartier Vulamba",
      status: "En attente",
    },
    {
      id: 7,
      nom_complet: "David Mumbere",
      phone: "+243810001122",
      adresse: "Beni, Quartier Mambango",
      status: "Actif",
    },
  ];

  const [selectedItem, setSelectedItem] = useState<Loan | null>(null);
  const [modal, setModal] = useState<"open" | "edit" | "delete" | "view">(null);

  const handleDelete = (item: Loan) => {
    setSelectedItem(item);
    setModal("delete");
  };
  const handleEdit = (item: Loan) => {
    setSelectedItem(item);
    setModal("edit");
  };
  const handleView = (item: Loan) => {
    setSelectedItem(item);
    setModal("view");
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  //Search
  const filteredData = useMemo(() => {
    return ln.filter((item) =>
      String(item.membre).toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [ln, searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Pagination
  const itemsPerPage = 18;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentloans = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(ln.length / itemsPerPage);

  return (
    <RootLayout>
      <div className="flex justify-between items-center my-3">
        <h1 className="text-gray-900 font-semibold text-sm">
          Tableau de board /{" "}
          <span className="text-gray-500">Emprunts</span>{" "}
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
            Liste emprunts
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

      <ListLoans
        loading={false}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onView={handleView}
        loans={currentloans}
      />

      {ln.length > 18 && (
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
        <CreateLoan
          members={members}
          onClose={() => setModal(null)}
          open={modal}
        />
      )}
      {modal === "edit" && selectedItem && (
        <EditLoan
          members={members}
          onClose={() => setModal(null)}
          open={modal}
          loan={selectedItem}
        />
      )}
      {modal === "delete" && selectedItem && (
        <DeleteLoan
          onClose={() => setModal(null)}
          open={modal}
          loan={selectedItem}
        />
      )}
    </RootLayout>
  );
};

export default LoanPage;
