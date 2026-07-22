import { useState } from "react";
import RootLayout from "../components/root-layout";
import ListMember from "../features/members/components/list-member";
import type { Member } from "../utlis/type";
import CreateMember from "../features/members/components/create-member";
import EditMember from "../features/members/components/edit-member";
import DeleteMember from "../features/members/components/delete-member";

const MemberPage = () => {
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

  const [selectedItem, setSelectedItem] = useState<Member | null>(null);
  const [modal, setModal] = useState<"open" | "edit" | "delete" | "view">(null);

  const handleDelete = (item: Member) => {
    setSelectedItem(item);
    setModal("delete");
  };
  const handleEdit = (item: Member) => {
    setSelectedItem(item);
    setModal("edit");
  };
  const handleView = (item: Member) => {
    setSelectedItem(item);
    setModal("view");
  };

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

      <ListMember
        loading={false}
        members={members}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onView={handleView}
      />
      {modal == "open" && (
        <CreateMember onClose={() => setModal(null)} open={modal} />
      )}
      {modal === "edit" && selectedItem && (
        <EditMember
          member={selectedItem}
          onClose={() => setModal(null)}
          open={modal}
        />
      )}
      {modal === "delete" && selectedItem && (
        <DeleteMember
          member={selectedItem}
          onClose={() => setModal(null)}
          open={modal}
        />
      )}
    </RootLayout>
  );
};

export default MemberPage;
