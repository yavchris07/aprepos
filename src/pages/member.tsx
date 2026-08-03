import { useMemo, useState } from "react";
import RootLayout from "../components/root-layout";
import ListMember from "../features/members/components/list-member";
import type { Kind, Member } from "../utlis/type";
import CreateMember from "../features/members/components/create-member";
import EditMember from "../features/members/components/edit-member";
import DeleteMember from "../features/members/components/delete-member";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { getToken } from "../utlis/get-token";
import { useMembers } from "../features/members/hooks/use-members";
import { useKinds } from "../features/kind/hooks/use-kind";
import MemberPDF from "../components/pdf/members";

const MemberPage = () => {
  const [selectedItem, setSelectedItem] = useState<Member | null>(null);
  const [modal, setModal] = useState<"open" | "edit" | "delete">(null);

  const handleDelete = (item: Member) => {
    setSelectedItem(item);
    setModal("delete");
  };
  const handleEdit = (item: Member) => {
    setSelectedItem(item);
    setModal("edit");
  };
  // const handleView = (item: Member) => {
  //   setSelectedItem(item);
  //   setModal("view");
  // };

  const token = getToken();
  const { data } = useMembers(token);
  const { data: types } = useKinds(token);
  const members: Member[] = data?.members ?? [];
  const kinds: Kind[] = types?.kinds ?? [];
  const pagination = data?.pagination;
  console.log("MMMMM : ", members);
  console.log("YYYYYYY : ", pagination);

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
           <MemberPDF data={filteredData} />
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
        // onView={handleView}
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
        <CreateMember
          onClose={() => setModal(null)}
          open={modal}
          kinds={kinds}
        />
      )}
      {modal === "edit" && selectedItem && (
        <EditMember
          member={selectedItem}
          onClose={() => setModal(null)}
          open={modal}
          kinds={kinds}
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
