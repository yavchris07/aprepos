import { User } from "lucide-react";
// import { useEffect, useState } from "react";
import SidebarItems from "./sidebar-itms";
// import { getCurrentUser } from "../utlis/get-user";

const Sidebar = () => {
  // const user = getCurrentUser();
  // const [isMounted, setIsMounted] = useState(false);
  // useEffect(() => {
  //   const raf = requestAnimationFrame(() => setIsMounted(true));
  //   return () => cancelAnimationFrame(raf);
  // }, []);

  // const role =
  // const role =
  //   user?.role === "super"
  //     ? "Administrateur system"
  //     :  '';
  return (
    <aside className="w-full lg:w-62.5 shrink-0">
      <div className="bg-white border border-gray-200 rounded p-4">
        <div className="space-y-4">
          <div className="flex flex-col items-start justify-center">
            <div className="w-22.5 h-22.5 rounded-full bg-purple-500 flex items-center justify-center">
              <User size={50} color="white" />
            </div>
            <p className="text-xs py-3">
              <strong className="text-gray-900 text-xl">
                {/* {isMounted ? user?.name : ""} */}
              </strong>
            </p>
            <p className="text-blue-600 text-sm"> Email</p>
            <p className="text-gray-600 text-sm">Role</p>
            
            <p className="text-gray-500 text-sm">
              {/* {isMounted ? user?.phone : "Numero invalide"} */}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded p-4 my-2">
        <div className="space-y-4">
          <SidebarItems />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
