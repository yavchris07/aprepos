import { Pencil, Trash2 } from "lucide-react";
import type { Member } from "../../../utlis/type";
import Loading from "../../../components/loading";

interface MemberProps {
  members: Member[];
  loading: boolean;
  onDelete: (member: Member) => void;
  onEdit: (member: Member) => void;
}

const ListMember = ({ members, loading, onDelete, onEdit }: MemberProps) => {
  if (loading) {
    return <Loading />;
  }

  if (!members.length) {
    return (
      <div className="my-3 flex min-h-50 items-center justify-center rounded-xl border border-gray-200 bg-white">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-600">
            Aucun membre trouvé
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Aucun résultat ne correspond à votre recherche.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-3 w-full overflow-hidden rounded-xl border border-gray-200 shadow-sm">
      {/* Table responsive */}

      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-245 text-left text-sm text-gray-600">
          {/* =====================================================
              HEADER
          ===================================================== */}

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
          </thead>

          {/* =====================================================
              BODY
          ===================================================== */}

          <tbody className="divide-y divide-gray-100">
            {members.map((member, index) => (
              <tr
                key={member.id}
                className="group transition-colors hover:bg-green-50/40"
              >
                {/* Numéro */}

                <td className="whitespace-nowrap px-3 py-2">
                  <span className="text-xs font-medium text-gray-400">
                    {index + 1}
                  </span>
                </td>

                {/* Membre */}

                <td className="px-3 py-2">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold uppercase text-green-700">
                      {member.nom_complet?.charAt(0)?.toUpperCase() ?? "M"}
                    </div>

                    {/* Informations */}

                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-gray-800">
                        {member.nom_complet}
                      </p>

                      <p className="mt-0.5 text-[10px] text-gray-400">
                        ID : {member.id}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Téléphone */}

                <td className="whitespace-nowrap px-3 py-2">
                  <span className="text-xs text-gray-600">
                    {member.phone || "—"}
                  </span>
                </td>

                {/* Adresse */}

                <td className="max-w-50 px-3 py-2">
                  <p
                    className="truncate text-xs text-gray-600"
                    title={member.adresse}
                  >
                    {member.adresse || "—"}
                  </p>
                </td>

                {/* Type */}

                <td className="whitespace-nowrap px-3 py-2">
                  <span className="inline-flex rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-semibold text-orange-700">
                    {member.type_member_nom || "Non défini"}
                  </span>
                </td>

                {/* Status */}

                <td className="whitespace-nowrap px-3 py-2">
                  <StatusBadge status={member.status} />
                </td>

                {/* Actions */}

                <td className="whitespace-nowrap px-3 py-2">
                  <div className="flex items-center justify-center gap-1">
                    {/* Modifier */}

                    <button
                      type="button"
                      onClick={() => onEdit(member)}
                      title="Modifier"
                      aria-label={`Modifier ${member.nom_complet}`}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition hover:bg-green-100 hover:text-green-700"
                    >
                      <Pencil size={15} />
                    </button>

                    {/* Supprimer */}

                    <button
                      type="button"
                      onClick={() => onDelete(member)}
                      title="Supprimer"
                      aria-label={`Supprimer ${member.nom_complet}`}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}

      <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/50 px-5 py-3">
        <p className="text-[11px] text-gray-400">
          {members.length} membre{members.length > 1 ? "s" : ""}
          affiché{members.length > 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
};

/* ============================================================
   STATUS BADGE
============================================================ */

const StatusBadge = ({ status }: { status?: string }) => {
  const normalizedStatus = status?.toLowerCase();

  const isActive =
    normalizedStatus === "actif" ||
    normalizedStatus === "active" ||
    normalizedStatus === "active";

  const isInactive =
    normalizedStatus === "inactif" || normalizedStatus === "inactive";

  if (isActive) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-semibold text-green-700">
        <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
        Actif
      </span>
    );
  }

  if (isInactive) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-semibold text-red-600">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
        Inactif
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-semibold text-gray-500">
      <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />

      {status || "Inconnu"}
    </span>
  );
};

export default ListMember;
