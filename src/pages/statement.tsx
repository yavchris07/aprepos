import { ArrowBigLeft, ArrowBigRight } from "lucide-react"
import RootLayout from "../components/root-layout"
 


const StatementPage = () => {
  return (
        <RootLayout>
      <div className="flex justify-between items-center my-3">
        <h1 className="text-gray-900 font-semibold text-sm">
          Tableau de board / <span className="text-gray-500">Adhesion</span>{" "}
        </h1>
      </div>

      <div className="flex justify-between items-center my-6 rounded">
        <div>
          {" "}
          <span className="bg-green-800 py-2 px-4 rounded text-xs text-white">
            PDF
          </span>{" "}
        </div>
        <input
          type="text"
          placeholder="Recherche par nom !"
          className="border border-gray-400 py-2 pl-2 rounded"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
       
    

      {items.length > 12 && (
        <div className="flex gap-2 text-gray-500 w-max px-4 py-2 rounded mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="bg-green-700 text-white p-2 rounded-full cursor-pointer hover:bg-green-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <ArrowBigLeft size={12} />
          </button>
          reports
          <span>
            Page {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="bg-green-700 text-white p-2 rounded-full cursor-pointer hover:bg-green-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <ArrowBigRight size={12} />
          </button>
        </div>
      )}
    </RootLayout>
  )
}

export default StatementPage
