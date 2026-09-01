import type { Operation } from "../utlis/type";
import OperationItem from "./operation-item";

type operationListProps = {
  operations: Operation[];
};

const OperationItemList = ({ operations }: operationListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {operations.map((operation) => {
        return <OperationItem operation={operation} />;
      })}
    </div>
  );
};

export default OperationItemList;
