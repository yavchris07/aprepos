import { useState } from "react";
import RootLayout from "../components/root-layout";
import type { Loan } from "../utlis/type";
import CreateLoan from "../features/loan/components/create-loan";
 
import ListLoans from "../features/loan/components/list-loan";
import EditLoan from "../features/loan/components/edit-loan";
 
import DeleteLoan from "../features/loan/components/delete-loan";

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

  return (
    <RootLayout>
      <div className="flex justify-between">
        <p>Emprunts</p>
        <span
          className="bg-green-800 text-white px-3 py-1 rounded"
          onClick={() => setModal("open")}
        >
          Nouveau
        </span>
      </div>\
      <ListLoans loading={false} onDelete={handleDelete} onEdit={handleEdit} onView={handleView} loans={ln} />

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
