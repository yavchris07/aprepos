import { Pencil, Trash2 } from "lucide-react";
import type { Social } from "../../../utlis/type";
import Loading from "../../../components/loading";

interface listSocialProps {
  socials: Social[];
  loading: boolean;
  onDelete: (social: Social) => void;
  onEdit: (social: Social) => void;
  // onView: (social: Social) => void;
}

const ListSocial = ({
  socials,
  loading,
  onDelete,
  onEdit,
  // onView,
}: listSocialProps) => {
  if (loading) return <Loading />;
  return (
    <div className="w-full bg-gray-100 my-2">
      <table className="text-black w-full">
        {/* 
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              <th className="whitespace-nowrap px-3 py-2">#</th>

              <th className="whitespace-nowrap px-3 py-2">Membre</th>

              <th className="whitespace-nowrap px-3 py-2">Téléphone</th>

              <th className="whitespace-nowrap px-3 py-2">Adresse</th>

              <th className="whitespace-nowrap px-3 py-2">Type</th>

              <th className="whitespace-nowrap px-3 py-2">État</th>

              <th className="whitespace-nowrap px-3 py-2 text-center">
                Actions
              </th>
            </tr>
          </thead> */}

        <thead className="bg-gray-50 text-xs font-bold tracking-wider text-gray-700 text-start">
          <tr className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
            <th scope="col" className="px-3 py-2 text-left">
              ID
            </th>
            <th scope="col" className="px-3 py-2 text-left">
              Membre
            </th>
            <th scope="col" className="px-3 py-2 text-left">
              Montant
            </th>
            <th
              scope="col"
              className="px-3 py-2 max-w-xs text-left md:max-w-md"
            >
              Semaine
            </th>
            <th
              scope="col"
              className="px-3 py-2 max-w-xs text-left md:max-w-md"
            >
              Annee
            </th>
            <th
              scope="col"
              className="px-3 py-2 max-w-xs text-left md:max-w-md"
            >
              Date
            </th>
            <th scope="col" className="px-3 py-2 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {socials.map((social) => (
            <tr
              key={social.id}
              className="group transition-colors hover:bg-green-50/40"
            >
              <td className="whitespace-nowrap px-3 py-2">
                <span className="text-xs font-medium text-gray-400">
                  {social.id}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <div className="flex items-center gap-3">
                    {/* Avatar */}

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold uppercase text-green-700">
                      {social.membre_nom?.charAt(0)?.toUpperCase() ?? "M"}
                    </div>

                    {/* Informations */}

                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-gray-800">
                        {social.membre_nom}
                      </p>

                      <p className="mt-0.5 text-[10px] text-gray-400">
                        ID : {social.id}
                      </p>
                    </div>
                  </div>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium text-gray-900">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600">
                    {social.montant}
                  </span>
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-2">
                <span className="text-xs text-gray-600">{social.semaine}</span>
              </td>
              <td className="whitespace-nowrap px-3 py-2">
                <span className="text-xs text-gray-600">{social.annee}</span>
              </td>
              <td className="whitespace-nowrap px-3 py-2">
                <span className="text-xs text-gray-600">{social.date}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium flex gap-2 justify-center">
                <button
                  onClick={() => onEdit(social)}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition hover:bg-green-100 hover:text-green-700"
                >
                  <Pencil size={15} />
                </button>

                <button
                  onClick={() => onDelete(social)}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-600"
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

export default ListSocial;
