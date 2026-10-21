import type { Rate } from "../type";
import { Lock, Pencil, Trash2 } from "lucide-react";
import Loading from "../../../components/loading";

type listeRateProps = {
  rates: Rate[];
  loading: boolean;
  onEdit: (rate: Rate) => void;
  onDelete: (rate: Rate) => void;
};

const ListRate = ({ rates, loading, onDelete, onEdit }: listeRateProps) => {
    // console.log('XX :',rates)
  if (loading) return <Loading />;
  return (
    
      <div className="divide-y divide-gray-100">
        {rates.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <Lock size={28} className="mx-auto text-gray-300" />

            <p className="mt-2 text-sm font-medium text-gray-600">
              Aucun taux d'interet
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Ajoutez taux d'interet.
            </p>
          </div>
        ) : (
          rates.map((rate) => (
            <div
              key={rate.id}
              className="flex items-center justify-between px-5 py-3.5 transition hover:bg-gray-50"
            >
              <div className="flex items-center gap-8">
                <div className="h-2 w-2 rounded-full bg-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {rate.description === "" ? 'Taux standard': rate.description}
                  </p>
                  <p className="text-[11px] text-gray-400">Description</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {rate.taux_mensuel} %
                  </p>
                  <p className="text-[11px] text-gray-400">Taux</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {rate.duree_min_mois}
                  </p>
                  <p className="text-[11px] text-gray-400">Duree mois min </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {rate.duree_max_mois}
                  </p>
                  <p className="text-[11px] text-gray-400">Duree mois max</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="rounded-lg p-2 text-gray-400 transition  hover:bg-green-200 hover:text-green-700 cursor-pointer"
                  onClick={() => onEdit(rate)}
                >
                  <Pencil size={16} />
                </button>

                <button
                  type="button"
                  className="rounded-lg p-2 text-gray-400 transition hover:bg-red-300 hover:text-red-700 cursor-pointer"
                  onClick={() => onDelete(rate)}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
  );
};

export default ListRate;
