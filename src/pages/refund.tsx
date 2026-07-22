import { useState } from "react";
import RootLayout from "../components/root-layout";
import CreateRefund from "../features/refund/components/create-refund";
import ListRefund from "../features/refund/components/list-refund";
import type { Refund } from "../utlis/type";
import EditRefund from "../features/refund/components/edit-refund";
import DeleteRefund from "../features/refund/components/delete-refund";

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

  console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO')
  return (
    <RootLayout>
      <div className="flex justify-between">
        <p>Membres</p>
        <span
          className="bg-green-800 text-white px-3 py-1 rounded cursor-pointer"
          onClick={() => setModal("open")}
        >
          Nouveau
        </span>
      </div>

      <ListRefund
        loading={false}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onView={handleView}
        refunds={rf}
      />

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
