import { Search, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { memberApi } from "..";
import type { Member } from "../../../utlis/type";

type Props = {
  value?: number;
  onChange: (member: Member) => void;
  token: string;
};

const GetMember = ({  onChange, token }: Props) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const shouldSearch = query.trim().length >= 2;

  useEffect(() => {
    if (!shouldSearch) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResults([]);
      setOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const data = await memberApi.get(token, query.trim());

        console.log("SEARCH :", query);
        console.log("RESPONSE :", data);

        const members = data.results ?? data;

        setResults(members);
        setOpen(members.length > 0);
      } catch (error) {
        console.error("Erreur recherche membre :", error);
        setResults([]);
        setOpen(false);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, shouldSearch, token]);

  const handleSelect = (member: Member) => {
    setQuery(`${member.nom_complet} - ${member.phone}`);
    setOpen(false);
    setResults([]);
    onChange(member);
  };

  const clearSelection = () => {
    setQuery("");
    setResults([]);
    setOpen(false);
  };

  return (
    <div className="relative w-full">
      <label className="text-xs font-semibold text-gray-500">Membre</label>

      <div className="relative mt-1">
        <Search size={16} className="absolute left-3 top-3 text-gray-500" />

        <input
          type="text"
          className="
            border border-gray-300
            rounded-lg
            w-full
            pl-10 pr-10 py-2
            text-sm text-gray-800
            outline-none
            transition
            focus:border-green-700
            focus:ring-2
            focus:ring-green-100
          "
          placeholder="Rechercher un membre..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            if (results.length > 0) {
              setOpen(true);
            }
          }}
        />

        {loading && (
          <Loader2
            size={16}
            className="
              animate-spin
              absolute right-3 top-3
              text-green-800
            "
          />
        )}

        {!loading && query && (
          <button
            type="button"
            onClick={clearSelection}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-700"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {open && (
        <div
          className="
            absolute
            mt-1
            w-full
            bg-white
            border border-gray-200
            rounded-lg
            shadow-lg
            max-h-64
            overflow-y-auto
            z-50
          "
        >
          {loading && (
            <div className="px-3 py-3 text-xs text-gray-500">Recherche...</div>
          )}

          {!loading && results.length === 0 && shouldSearch && (
            <div className="px-3 py-3 text-xs text-gray-500">
              Aucun membre trouvé.
            </div>
          )}

          {!loading &&
            results.map((member) => (
              <button
                type="button"
                key={member.id}
                onClick={() => handleSelect(member)}
                className="
                  w-full
                  text-left
                  px-3 py-2
                  hover:bg-green-50
                  border-b border-gray-100
                  transition
                "
              >
                <p className="text-sm font-medium text-gray-800">
                  {member.nom_complet}
                </p>

                <p className="text-xs text-gray-500">{member.phone}</p>
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default GetMember;
