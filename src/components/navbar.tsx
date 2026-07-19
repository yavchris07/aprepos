import { LogOut } from "lucide-react";
import React from "react";
import logo from "../public/icon.png";
import { useNavigate } from "react-router";
import { getToken } from "../utlis/get-token";
import { useLogout } from "../features/auth/hooks/use-logoutt";

const Navbar = () => {
  const navigate = useNavigate();
  const token = getToken();
  const { logout, fail, pending } = useLogout(token ?? "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await logout();
      navigate("/");
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      } else {
        console.log("test");
      }
    }
  };

  console.log(fail);
  console.log(pending);

  return (
    <nav className="py-3 px-8 border-b border-gray-200 mb-3 bg-zinc-50 sticky">
      <div className="w-[97%] mx-auto">
        <div className="flex items-center justify-between">
          <div className="menu-left flex gap-1">
            <img src={logo} alt="logo-abichoi" width={30} height={20} />
            <a href="/dashboard" className="text-xl font-bold text-gray-900">
              APREPOS
            </a>
          </div>

          <form onSubmit={handleSubmit} className="menu-right">
            <button
              type="submit"
              title="Se déconnecter"
              className="w-6 h-6 rounded-full border-2 border-red-600 bg-red-700 flex items-center justify-center text-white cursor-pointer"
            >
              <LogOut size={12} />
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
