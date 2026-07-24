import { UserRoundArrowLeft } from "lucide-react"
import type { Loan } from "../../../utlis/type"

type loanItemProps = {item : Loan}

const LoanItem = ({item}:loanItemProps) => {
  return (
    <div className="flex justify-between items-center px-2 py-2 border-b border-gray-200">
      <div className="flex flex-row items-center gap-2">
        <UserRoundArrowLeft size={17}/>
        <div className="flex flex-col gap-0">
          <h3 className="text-sm">{item.membre}</h3>
          <span className="text-xs text-gray-500">{item.date}</span>
        </div>
      </div>

      <div className="flex flex-col">
        <strong className="text-sm text-orange-800">{item.montant}</strong>
        <span className="text-xs text-gray-400">{item.taux_interet}%</span>
      </div>
    </div>
  )
}

export default LoanItem
