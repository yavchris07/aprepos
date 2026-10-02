const StatusBadge = ({ status }: { status?: string }) => {
      const normalizedStatus = status?.toLowerCase();

  const isActive =
    normalizedStatus === "actif" ||
    normalizedStatus === "active" ||
    normalizedStatus === "active";

  const isInactive =
    normalizedStatus === "inactif" || normalizedStatus === "inactive";

  if (isActive) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-semibold text-green-700">
        <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
        Actif
      </span>
    );
  }

  if (isInactive) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-semibold text-red-600">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
        Inactif
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-semibold text-gray-500">
      <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />

      {status || "Inconnu"}
    </span>
  )
}

export default StatusBadge
