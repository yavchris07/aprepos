import { useState } from "react";
import RootLayout from "../components/root-layout";
import ListAdhesion from "../features/adhesion/components/list-adhesion";
import type { Adhesion } from "../utlis/type";
import EditAdhesion from "../features/adhesion/components/edit-adhesion";
import DeletAdhesion from "../features/adhesion/components/delete-adhesion";
import CreateAdhesion from "../features/adhesion/components/create-adhesion";

const AdhesionPage = () => {
  const items = [
    {
      id: 1,
      membre: "123",
      annee: "2026",
      montant: 10000,
      date: "2026-20-11",
    },
    {
      id: 2,
      membre: "123",
      annee: "2026",
      montant: 10000,
      date: "2026-20-11",
    },
    {
      id: 3,
      membre: "123",
      annee: "2026",
      montant: 10000,
      date: "2026-20-11",
    },
    {
      id: 4,
      membre: "123",
      annee: "2026",
      montant: 10000,
      date: "2026-20-11",
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

  const [selectedItem, setSelectedItem] = useState<Adhesion | null>(null);
  const [modal, setModal] = useState<"open" | "edit" | "delete" | "view">(null);

  const handleDelete = (item: Adhesion) => {
    setSelectedItem(item);
    setModal("delete");
  };
  const handleEdit = (item: Adhesion) => {
    setSelectedItem(item);
    setModal("edit");
  };
  const handleView = (item: Adhesion) => {
    setSelectedItem(item);
    setModal("view");
  };

  console.log(selectedItem);
  return (
    <RootLayout>
      <div className="flex justify-between">
        <p>Adhesion</p>
        <span
          className="bg-green-800 text-white px-3 py-1 rounded cursor-pointer"
          onClick={() => setModal("open")}
        >
          Nouveau
        </span>
      </div>

      <ListAdhesion
        adhesions={items}
        loading={false}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onView={handleView}
      />
      {modal === "open" && (
        <CreateAdhesion
          onClose={() => setModal(null)}
          open={modal}
          members={members}
        />
      )}
      {modal === "edit" && selectedItem && (
        <EditAdhesion
          addhesion={selectedItem}
          onClose={() => setModal(null)}
          members={members}
          open={modal}
        />
      )}
      {modal === "delete" && selectedItem && (
        <DeletAdhesion
          adhesion={selectedItem}
          onClose={() => setModal(null)}
          open={modal}
        />
      )}
    </RootLayout>
  );
};

export default AdhesionPage;
