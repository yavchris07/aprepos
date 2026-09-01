// import { useEffect, useState } from "react";
import SidebarItems from "./sidebar-items";
import { getCurrentUser } from "../utlis/get-user";
// import { getCurrentUser } from "../utlis/get-user";

const Sidebar = () => {
  const user = getCurrentUser();

  return (
    <aside className="w-full shrink-0 lg:w-62.5">

      {/* =====================================================
          PROFIL
      ===================================================== */}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

        {/* Header profil */}

        <div className="flex flex-col items-center px-5 py-6 text-center">

          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 border-green-50 bg-green-50 shadow-sm">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mt-4 min-w-0">

            <h2 className="truncate text-sm font-semibold text-gray-900">
              {user?.username ?? "Administrateur"}
            </h2>

            <p className="mt-1 truncate text-xs text-gray-500">
              {user?.email ?? "admin@ceparcrea.org"}
            </p>

            <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-green-700">
              Administrateur
            </span>

          </div>

        </div>

      </div>

      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <div className="mt-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">

        <SidebarItems />

      </div>

      {/* =====================================================
          VERSION
      ===================================================== */}

      <div className="px-2 py-4 text-center">
        <p className="text-[10px] text-gray-400">
          CEPARCREA
        </p>

        <p className="mt-0.5 text-[10px] text-gray-300">
          Version 1.0.0
        </p>
      </div>

    </aside>
  );
};

export default Sidebar;
