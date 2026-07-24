import LoanItem from "../features/loan/components/loan-item";
import type { Loan } from "../utlis/type";

type loanItemListProps = { items: Loan[] };

const LoanItemList = ({ items }: loanItemListProps) => {
  return (
    <div className="flex flex-col gap-1 mt-4">
      {items.map((item) => (
        <LoanItem item={item} />
      ))}
    </div>
  );
};

export default LoanItemList;
