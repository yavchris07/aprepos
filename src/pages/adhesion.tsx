import { useMemo, useState } from "react";
import RootLayout from "../components/root-layout";
import ListAdhesion from "../features/adhesion/components/list-adhesion";
import type { Adhesion, Member } from "../utlis/type";
import EditAdhesion from "../features/adhesion/components/edit-adhesion";
import DeletAdhesion from "../features/adhesion/components/delete-adhesion";
import CreateAdhesion from "../features/adhesion/components/create-adhesion";
// import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
// import AdhesionItem from "../features/adhesion/components/adhesion-item";
// import GetMember from "../features/members/components/get-member";
import { getToken } from "../utlis/get-token";
import { useMembers } from "../features/members/hooks/use-members";
import { useAdhesion } from "../features/adhesion/hooks/use-adhesions";
import AdhesionPDF from "../components/pdf/adhesion";

const AdhesionPage = () => {
  const token = getToken();
  const { data: mbs } = useMembers(token ?? "");
  const { data, isLoading } = useAdhesion(token ?? "");
  const members: Member[] = mbs?.members ?? [];
  const adhesions: Adhesion[] = data?.adhesions ?? [];
  const pagination = data?.pagination;

  console.log("VVVVVVVVVVVVV ", pagination);

  const [selectedItem, setSelectedItem] = useState<Adhesion | null>(null);
  const [modal, setModal] = useState<"open" | "edit" | "delete">(null);

  const handleDelete = (item: Adhesion) => {
    setSelectedItem(item);
    setModal("delete");
  };
  const handleEdit = (item: Adhesion) => {
    setSelectedItem(item);
    setModal("edit");
  };

  console.log(selectedItem);

  const [searchQuery, setSearchQuery] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);

  //Search
  const filteredData = useMemo(() => {
    return adhesions.filter((item) =>
      item?.membre_nom.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [adhesions, searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // setCurrentPage(1);
  };

  return (
    <RootLayout>
      <div className="flex justify-between items-center my-3">
        <h1 className="text-gray-900 font-semibold text-sm">
          Tableau de board /{" "}
          <span className="text-gray-500">Adhesion</span>{" "}
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
          <AdhesionPDF data={filteredData}/>
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Recherche par nom !"
            className="border border-gray-400 py-2 pl-2 rounded focus:outline-none focus:ring-2 focus:ring-green-700"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <input
            type="text"
            placeholder="Annee !"
            className="border border-gray-400 py-2 pl-2 rounded focus:outline-none focus:ring-2 focus:ring-green-700"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <ListAdhesion
        adhesions={filteredData}
        loading={isLoading}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      {/* 
      {modal === "view" && selectedItem && (
        <AdhesionItem
          adhesion={selectedItem}
          onClose={() => setModal(null)}
          open={modal}
        />
      )} */}
      
      {modal === "open" && (
        <CreateAdhesion
          onClose={() => setModal(null)}
          open='open'
        />
      )}
      {modal === "edit" && selectedItem && (
        <EditAdhesion
          adhesion={selectedItem}
          onClose={() => setModal(null)}
          members={members}
          open='edit'
        />
      )}
      {modal === "delete" && selectedItem && (
        <DeletAdhesion
          adhesion={selectedItem}
          onClose={() => setModal(null)}
          open='delete'
        />
      )}
      {/* 
      {items.length > 12 && (
        <div className="flex gap-2 text-gray-500 w-max px-4 py-2 rounded mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="bg-green-700 text-white p-2 rounded-full cursor-pointer hover:bg-green-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <ArrowBigLeft size={12} />
          </button>
          reports
          <span>
            Page {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="bg-green-700 text-white p-2 rounded-full cursor-pointer hover:bg-green-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <ArrowBigRight size={12} />
          </button>
        </div>
      )} */}
    </RootLayout>
  );
};

export default AdhesionPage;
