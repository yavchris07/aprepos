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

const AdhesionPage = () => {
  const token = getToken();
  const { data: mbs } = useMembers(token);
  const { data, isLoading } = useAdhesion(token);
  const members: Member[] = mbs?.members ?? [];
  const adhesions: Adhesion[] = data?.adhesions ?? [];
  const pagination = data?.pagination;

  console.log(pagination);

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
      item?.membre.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // setCurrentPage(1);
  };

  console.log("XXXXXXXXXXXXXXXXX ", adhesions);

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
          <span className="bg-green-800 py-2 px-4 rounded text-xs text-white cursor-pointer">
            PDF
          </span>{" "}
        </div>
        <input
          type="text"
          placeholder="Recherche par nom !"
          className="border border-gray-400 py-2 pl-2 rounded"
          value={searchQuery}
          onChange={handleSearchChange}
        />
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
