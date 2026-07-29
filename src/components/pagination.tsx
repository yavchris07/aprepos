import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useState } from "react";

type paginationProps = {
  items: [];
  filtered: [];
};

const Pagination = ({ items, filtered }: paginationProps) => {
  const itemsPerPage = 18;
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItem = filtered.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  console.log(currentItem)

  if (items.length < 18) return null;
  return (
    <div className="flex gap-2 text-gray-500 w-max px-4 py-2 rounded mt-6">
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
  );
};

export default Pagination;





// import { Paginations } from "../features/types";

// type PaginationProps = {
//   pagination: Paginations | null;
//   onRefresh: (url: string) => void;
// };

// const Pagination = ({ pagination, onRefresh }: PaginationProps) => {
//   return (
//     <div className="pagits">
//       <button
//         disabled={!pagination?.previous}
//         onClick={() => onRefresh(pagination!.previous!)}
//         className="btn"
//       >
//         {/* <ArrowLeft size={16}/> */}
//         Précédent
//       </button>

//       <span className="page-info">
//         Page {pagination?.current_page} / {pagination?.total_pages}
//       </span>

//       <button
//         disabled={!pagination?.next}
//         onClick={() => onRefresh(pagination!.next!)}
//         className="btn"
//       >
//         {/* <ArrowRight size={16}/> */}
//         Suivant
//       </button>
//     </div>
//   );
// };

// export default Pagination;

