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





// import { Search, Loader2, X } from "lucide-react";
// import { useEffect, useState } from "react";
// import { memberApi } from "..";
// import type { Member } from "../../../utlis/type";

// type Props = {
//   value?: number;
//   initialName?: string; // Nom optionnel à afficher directement en mode édition
//   onChange: (member: Member | null) => void;
//   token: string;
// };

// const GetMember = ({ value, initialName, onChange, token }: Props) => {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState<Member[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [open, setOpen] = useState(false);

//   // 1. Synchroniser le champ avec la valeur 'value' / 'initialName' lors de la modification (Edit)
//   useEffect(() => {
//     if (initialName) {
//       setQuery(initialName);
//     } else if (value && memberApi.getById) {
//       // Si vous avez un endpoint getById dans votre memberApi :
//       setLoading(true);
//       memberApi
//         .getById(token, value)
//         .then((member: Member) => {
//           setQuery(`${member.nom_complet || ""} - ${member.phone || ""}`);
//         })
//         .catch(() => setQuery(`Membre #${value}`))
//         .finally(() => setLoading(false));
//     } else if (!value) {
//       setQuery("");
//     }
//   }, [value, initialName, token]);

//   const shouldSearch = query.trim().length >= 2;

//   // 2. Recherche automatique (Debounce)
//   useEffect(() => {
//     if (!shouldSearch || !open) {
//       setResults([]);
//       return;
//     }

//     const timer = setTimeout(async () => {
//       try {
//         setLoading(true);
//         const data = await memberApi.get(token, query.trim());
//         const members = data.results ?? data;
//         setResults(members);
//       } catch (error) {
//         console.error("Erreur recherche membre :", error);
//         setResults([]);
//       } font-finally {
//         setLoading(false);
//       }
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [query, shouldSearch, token, open]);

//   const handleSelect = (member: Member) => {
//     setQuery(`${member.nom_complet} - ${member.phone}`);
//     setOpen(false);
//     setResults([]);
//     onChange(member);
//   };

//   const clearSelection = () => {
//     setQuery("");
//     setResults([]);
//     setOpen(false);
//     onChange(null);
//   };

//   return (
//     <div className="relative w-full">
//       <label className="text-xs font-semibold text-gray-500">Membre</label>

//       <div className="relative mt-1">
//         <Search size={16} className="absolute left-3 top-3 text-gray-500" />

//         <input
//           type="text"
//           className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-10 text-sm text-gray-800 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
//           placeholder="Rechercher un membre..."
//           value={query}
//           onChange={(e) => {
//             setQuery(e.target.value);
//             setOpen(true);
//           }}
//           onFocus={() => {
//             if (query.trim().length >= 2) setOpen(true);
//           }}
//         />

//         {loading && (
//           <Loader2
//             size={16}
//             className="absolute right-3 top-3 animate-spin text-green-800"
//           />
//         )}

//         {!loading && query && (
//           <button
//             type="button"
//             onClick={clearSelection}
//             className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-700"
//           >
//             <X size={16} />
//           </button>
//         )}
//       </div>

//       {open && (
//         <div className="absolute z-50 mt-1 max-h-64 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
//           {loading && (
//             <div className="px-3 py-3 text-xs text-gray-500">Recherche...</div>
//           )}

//           {!loading && results.length === 0 && shouldSearch && (
//             <div className="px-3 py-3 text-xs text-gray-500">
//               Aucun membre trouvé.
//             </div>
//           )}

//           {!loading &&
//             results.map((member) => (
//               <button
//                 type="button"
//                 key={member.id}
//                 onClick={() => handleSelect(member)}
//                 className="w-full border-b border-gray-100 px-3 py-2 text-left transition hover:bg-green-50"
//               >
//                 <p className="text-sm font-medium text-gray-800">
//                   {member.nom_complet}
//                 </p>
//                 <p className="text-xs text-gray-500">{member.phone}</p>
//               </button>
//             ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default GetMember;
