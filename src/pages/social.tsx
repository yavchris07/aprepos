import { useState } from "react";
import RootLayout from "../components/root-layout";
import CreateSocial from "../features/socials/components/create-socila";
import ListSocial from "../features/socials/components/list-social";
import type { Social } from "../utlis/type";
import EditSocial from "../features/socials/components/edit-social";
import DeleteSocial from "../features/socials/components/delete-social";

const SocialPage = () => {
  const sc = [
    {
      id: 1,
      membre: "Jean Mukendi",
      semaine: 1,
      annee: "2026",
      montant: "25.00",
      date: "2026-01-03",
    },
    {
      id: 2,
      membre: "Grace Bahati",
      semaine: 1,
      annee: "2026",
      montant: "25.00",
      date: "2026-01-04",
    },
    {
      id: 3,
      membre: "Patrick Kabeya",
      semaine: 2,
      annee: "2026",
      montant: "30.00",
      date: "2026-01-10",
    },
    {
      id: 4,
      membre: "Aline Kasereka",
      semaine: 2,
      annee: "2026",
      montant: "20.00",
      date: "2026-01-11",
    },
    {
      id: 5,
      membre: "Samuel Nyembo",
      semaine: 3,
      annee: "2026",
      montant: "25.00",
      date: "2026-01-18",
    },
    {
      id: 6,
      membre: "Esther Ilunga",
      semaine: 3,
      annee: "2026",
      montant: "35.00",
      date: "2026-01-19",
    },
    {
      id: 7,
      membre: "David Mumbere",
      semaine: 4,
      annee: "2026",
      montant: "25.00",
      date: "2026-01-26",
    },
    {
      id: 8,
      membre: "Jean Mukendi",
      semaine: 5,
      annee: "2026",
      montant: "25.00",
      date: "2026-02-02",
    },
    {
      id: 9,
      membre: "Grace Bahati",
      semaine: 5,
      annee: "2026",
      montant: "25.00",
      date: "2026-02-03",
    },
    {
      id: 10,
      membre: "Patrick Kabeya",
      semaine: 6,
      annee: "2026",
      montant: "30.00",
      date: "2026-02-09",
    },
    {
      id: 11,
      membre: "Aline Kasereka",
      semaine: 6,
      annee: "2026",
      montant: "20.00",
      date: "2026-02-10",
    },
    {
      id: 12,
      membre: "Samuel Nyembo",
      semaine: 7,
      annee: "2026",
      montant: "25.00",
      date: "2026-02-17",
    },
    {
      id: 13,
      membre: "Esther Ilunga",
      semaine: 7,
      annee: "2026",
      montant: "35.00",
      date: "2026-02-18",
    },
    {
      id: 14,
      membre: "David Mumbere",
      semaine: 8,
      annee: "2026",
      montant: "25.00",
      date: "2026-02-24",
    },
    {
      id: 15,
      membre: "Jean Mukendi",
      semaine: 9,
      annee: "2026",
      montant: "40.00",
      date: "2026-03-03",
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

  const [selectedItem, setSelectedItem] = useState<Social | null>(null);
  const [modal, setModal] = useState<"open" | "edit" | "delete" | "view">(null);

  const handleDelete = (item: Social) => {
    setSelectedItem(item);
    setModal("delete");
  };
  const handleEdit = (item: Social) => {
    setSelectedItem(item);
    setModal("edit");
  };
  const handleView = (item: Social) => {
    setSelectedItem(item);
    setModal("view");
  };
  return (
    <RootLayout>
      <div className="flex justify-between items-center my-3">
        <h1 className="text-gray-900 font-semibold text-sm">
          Tableau de board / <span className="text-gray-500">Social</span>{" "}
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
            PDF
          </span>{" "}
        </div>
        <input
          type="text"
          placeholder="Recherchez par nom !"
          className="border border-gray-400 py-2 pl-2 rounded"
        />
      </div>

      <ListSocial
        loading={false}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onView={handleView}
        socials={sc}
      />

      {modal === "open" && (
        <CreateSocial
          members={members}
          onClose={() => setModal(null)}
          open={modal}
        />
      )}
      {modal === "edit" && selectedItem && (
        <EditSocial
          members={members}
          onClose={() => setModal(null)}
          open={modal}
          social={selectedItem}
        />
      )}
      {modal === "delete" && selectedItem && (
        <DeleteSocial
          onClose={() => setModal(null)}
          open={modal}
          social={selectedItem}
        />
      )}
    </RootLayout>
  );
};

export default SocialPage;
