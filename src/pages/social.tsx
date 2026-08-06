import { useMemo, useState } from "react";
import RootLayout from "../components/root-layout";
import CreateSocial from "../features/socials/components/create-social";
import ListSocial from "../features/socials/components/list-social";
import type { Member, Social } from "../utlis/type";
import EditSocial from "../features/socials/components/edit-social";
import DeleteSocial from "../features/socials/components/delete-social";
// import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useSocials } from "../features/socials/hooks/use-socials";
import { useMembers } from "../features/members/hooks/use-members";
import { getToken } from "../utlis/get-token";

const SocialPage = () => {
  const token = getToken();
  const { data: mb } = useMembers(token ?? "");
  const { data, isLoading } = useSocials(token ?? "");

  const members: Member[] = mb?.members ?? [];
  const socials: Social[] = data?.socials ?? [];
  const pagination = data?.pagination;

  console.log(pagination);

  const [selectedItem, setSelectedItem] = useState<Social | null>(null);
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const handleDelete = (item: Social) => {
    setSelectedItem(item);
    setDeleteModal(true)
  };
  const handleEdit = (item: Social) => {
    setSelectedItem(item);
   setEditModal(true)
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  //Search
  const filteredData = useMemo(() => {
    return socials.filter((item) =>
      item.membre_nom.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, socials]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Pagination
  const itemsPerPage = 18;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSocials = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(socials.length / itemsPerPage);
  console.log(totalPages);

  return (
    <RootLayout>
      <div className="flex justify-between items-center my-3">
        <h1 className="text-gray-900 font-semibold text-sm">
          Tableau de board / <span className="text-gray-500">Social</span>{" "}
        </h1>

        <span
          className="bg-green-800 text-white px-3 py-1 rounded cursor-pointer"
          onClick={() => setModal(true)}
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

      <ListSocial
        loading={isLoading}
        onDelete={handleDelete}
        onEdit={handleEdit}
        socials={currentSocials}
      />

      {modal && (
        <CreateSocial
          members={members}
          onClose={() => setModal(null)}
          open={modal}
        />
      )}
      {editModal && selectedItem && (
        <EditSocial
          members={members}
          onClose={() => setModal(null)}
          open={editModal}
          social={selectedItem}
        />
      )}
      {deleteModal && selectedItem && (
        <DeleteSocial
          onClose={() => setModal(null)}
          open={deleteModal}
          social={selectedItem}
        />
      )}
    </RootLayout>
  );
};

export default SocialPage;
