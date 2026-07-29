import { Search, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { accountApi } from "..";

type Account = {
  id: number;
  numero_compte: string;
  membre: string;
};

type Props = {
  value?: number;
  onChange: (account: Account) => void;
};

const GetAccount = ({ value, onChange }: Props) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const timeout = useRef<number | undefined>(undefined);


const shouldSearch = query.trim().length >= 2;

//   useEffect(() => {
//     if (query.trim().length < 2) {
//       setResults([]);
//       return;
//     }

//     window.clearTimeout(timeout.current);

//     timeout.current = window.setTimeout(async () => {
//       try {
//         setLoading(true);
//         // const { account } = useGetAccount(query);
//         const account = await accountApi.get(query);
//         setResults(account);

//         setOpen(true);
//       } finally {
//         setLoading(false);
//       }
//     }, 300);

//     return () => window.clearTimeout(timeout.current);
//   }, [query]);

useEffect(() => {
  if (!shouldSearch) return;

  const timer = setTimeout(async () => {
    try {
      setLoading(true);
      const data = await accountApi.get(query);
      setResults(data);
      setOpen(true);
    } finally {
      setLoading(false);
    }
  }, 300);
  return () => clearTimeout(timer);
}, [query, shouldSearch]);


  const handleSelect = (account: Account) => {
    setQuery(`${account.numero_compte} - ${account.membre}`);
    setOpen(false);
    onChange(account);
  };

  console.log(value);
  return (
    <div className="relative">
      <label className="text-xs font-semibold text-gray-500">Compte</label>

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
          {results.map((account) => (
            <button
              type="button"
              key={account.id}
              onClick={() => handleSelect(account)}
              className="w-full text-left px-3 py-2 hover:bg-gray-100"
            >
              <p className="font-medium text-sm">{account.membre}</p>
              <p className="text-xs text-gray-500">{account.numero_compte}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetAccount;

// // ...existing code...
// const handleQueryChange = (value: string) => {
//   setQuery(value);
//   if (value.trim().length < 2) {
//     setResults([]);
//   }
// };

// useEffect(() => {
//   if (query.trim().length < 2) return;

//   // fetch/search logic here
// }, [query]);
// // ...existing code...

// Crud sur tous les models
// Modele compte aura un endpoint de recherche.
// La pagination.
// Recherche. 