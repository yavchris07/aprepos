import { Eye, Pencil, Trash2 } from "lucide-react";
import type { Member } from "../../../utlis/type";
import Loading from "../../../components/loading";

interface memberProps {
  members: Member[];
  loading: boolean;
  onDelete: (member: Member) => void;
  onEdit: (member: Member) => void;
  onView: (member: Member) => void;
}

const ListMember = ({
  members,
  loading,
  onDelete,
  onEdit,
  onView,
}: memberProps) => {
  if (loading) return <Loading />;
  return (
    <div className="w-full bg-gray-100 my-2">
      <table className="text-black w-full">
        <thead className="bg-gray-50 text-xs font-bold tracking-wider text-gray-700 text-start">
          <tr>
            <th scope="col" className="px-6 py-4 text-left">
              ID
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Nom complet
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Téléphone
            </th>
            <th
              scope="col"
              className="px-6 py-4 max-w-xs text-left md:max-w-md"
            >
              Adresse
            </th>
            <th
              scope="col"
              className="px-6 py-4 max-w-xs text-left md:max-w-md"
            >
              Etat
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-gray-600 text-xs">
          {members.map((mb) => (
            <tr
              key={mb.id}
              className="hover:bg-gray-50 odd:bg-white even:bg-gray-50/50 transition-colors"
            >
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{mb.id}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{mb.nom_complet}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span>{mb.phone}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{mb.adresse}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{mb.status}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium flex gap-2 justify-center">
                {/* onView={} onEdit={} onDelete={} */}
                <button
                  onClick={() => onView(mb)}
                  className=" hover:bg-gray-100 cursor-pointer"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={() => onEdit(mb)}
                  className=" hover:bg-gray-100 cursor-pointer"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => onDelete(mb)}
                  className=" text-red-600 hover:bg-red-50 cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListMember;
