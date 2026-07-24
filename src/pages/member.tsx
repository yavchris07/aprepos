import { useMemo, useState } from "react";
import RootLayout from "../components/root-layout";
import ListMember from "../features/members/components/list-member";
import type { Member } from "../utlis/type";
import CreateMember from "../features/members/components/create-member";
import EditMember from "../features/members/components/edit-member";
import DeleteMember from "../features/members/components/delete-member";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

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

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  //Search
  const filteredData = useMemo(() => {
    return members.filter((item) =>
      String(item.nom_complet)
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
    );
  }, [members, searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Pagination
  const itemsPerPage = 18;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMembers = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(members.length / itemsPerPage);

  return (
    <RootLayout>
      <div className="flex justify-between items-center my-3">
        <h1 className="text-gray-900 font-semibold text-sm">
          Tableau de board / <span className="text-gray-500">Membres</span>{" "}
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
            Liste
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

      <ListMember
        loading={false}
        members={currentMembers}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onView={handleView}
      />

      {members.length > 18 && (
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
