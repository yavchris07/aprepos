import { Search, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { memberApi } from "..";
import type { Member } from "../../../utlis/type";

type Props = {
  value?: number;
  onChange: (member: Member) => void;
  token: string;
};

const GetMember = ({ value, onChange, token }: Props) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // console.log(timeout)
  const shouldSearch = query.trim().length >= 2;

  useEffect(() => {
    if (!shouldSearch) return;

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const data = await memberApi.get(token, query);
        setResults(data.results);
        setOpen(data.results.length > 0);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query, shouldSearch, token]);

  const handleSelect = (member: Member) => {
    setQuery(`${member.nom_complet} - ${member.id}`);
    setOpen(false);
    onChange(member);
  };

  console.log(value);

  return (
    <div className="relative">
      <label className="text-xs font-semibold text-gray-500">Membre</label>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-3 text-gray-500" />
        <input
          className="border rounded w-full pl-10 py-2 text-sm"
          placeholder="Rechercher un membre..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {loading && (
          <Loader2
            size={16}
            className="animate-spin absolute right-3 top-3 text-green-800"
          />
        )}
      </div>

      {open && results.length > 0 && (
        <div className="absolute mt-1 w-full bg-white border rounded shadow-lg max-h-64 overflow-y-auto z-50">
          {results.map((member) => (
            <button
              type="button"
              key={member.id}
              onClick={() => handleSelect(member)}
              className="w-full text-left px-3 py-2 hover:bg-gray-100"
            >
              <p className="text-sm font-medium text-gray-500">
                {member.nom_complet}
              </p>
              <p className="text-xs">{member.phone}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetMember;
