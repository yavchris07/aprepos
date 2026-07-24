import { useMemo, useState } from "react";
import RootLayout from "../components/root-layout";
import CreateRefund from "../features/refund/components/create-refund";
import ListRefund from "../features/refund/components/list-refund";
import type { Refund } from "../utlis/type";
import EditRefund from "../features/refund/components/edit-refund";
import DeleteRefund from "../features/refund/components/delete-refund";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

const RefundPage = () => {
  const rf = [
    {
      id: 1,
      emprumt: 1,
      montant: 200,
      date: "2026-01-20",
    },
    {
      id: 2,
      emprumt: 1,
      montant: 150,
      date: "2026-02-15",
    },
    {
      id: 3,
      emprumt: 2,
      montant: 200,
      date: "2026-02-05",
    },
    {
      id: 4,
      emprumt: 3,
      montant: 300,
      date: "2026-02-20",
    },
    {
      id: 5,
      emprumt: 3,
      montant: 510,
      date: "2026-03-15",
    },
    {
      id: 6,
      emprumt: 4,
      montant: 100,
      date: "2026-03-01",
    },
    {
      id: 7,
      emprumt: 4,
      montant: 100,
      date: "2026-03-28",
    },
    {
      id: 8,
      emprumt: 5,
      montant: 400,
      date: "2026-03-20",
    },
    {
      id: 9,
      emprumt: 6,
      montant: 150,
      date: "2026-04-01",
    },
    {
      id: 10,
      emprumt: 7,
      montant: 200,
      date: "2026-04-18",
    },
    {
      id: 11,
      emprumt: 7,
      montant: 200,
      date: "2026-05-10",
    },
    {
      id: 12,
      emprumt: 8,
      montant: 250,
      date: "2026-05-05",
    },
    {
      id: 13,
      emprumt: 8,
      montant: 250,
      date: "2026-06-02",
    },
    {
      id: 14,
      emprumt: 9,
      montant: 300,
      date: "2026-06-15",
    },
    {
      id: 15,
      emprumt: 10,
      montant: 500,
      date: "2026-07-01",
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

  const [selectedItem, setSelectedItem] = useState<Refund | null>(null);
  const [modal, setModal] = useState<"open" | "edit" | "delete" | "view">(null);

  const handleDelete = (item: Refund) => {
    setSelectedItem(item);
    setModal("delete");
  };
  const handleEdit = (item: Refund) => {
    setSelectedItem(item);
    setModal("edit");
  };
  const handleView = (item: Refund) => {
    setSelectedItem(item);
    setModal("view");
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  //Search
  const filteredData = useMemo(() => {
    return rf.filter((item) =>
      String(item.emprumt).toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [rf, searchQuery]);

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

  const totalPages = Math.ceil(rf.length / itemsPerPage);

  return (
    <RootLayout>
      <div className="flex justify-between items-center my-3">
        <h1 className="text-gray-900 font-semibold text-sm">
          Tableau de board /{" "}
          <span className="text-gray-500">Remboursement</span>{" "}
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

      {rf.length > 18 && (
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

      {modal === "open" && (
        <CreateRefund
          members={members}
          onClose={() => setModal(null)}
          open={modal}
        />
      )}
      {modal == "edit" && selectedItem && (
        <EditRefund
          members={members}
          onClose={() => setModal(null)}
          open={modal}
          refund={selectedItem}
        />
      )}
      {modal == "delete" && selectedItem && (
        <DeleteRefund
          onClose={() => setModal(null)}
          open={modal}
          refund={selectedItem}
        />
      )}
    </RootLayout>
  );
};

export default RefundPage;
