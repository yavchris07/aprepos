type noResult = {
  subject: string;
  subSubject: string;
};

const NoResult = ({ subject, subSubject }: noResult) => {
  return (
    <div className="my-3 flex min-h-50 items-center justify-center rounded-xl border border-gray-200 bg-white">
      <div className="text-center">
        <p className="text-sm font-medium text-gray-600">{subject}</p>
        <p className="mt-1 text-xs text-gray-400">{subSubject}</p>
      </div>
    </div>
  );
};

export default NoResult;
