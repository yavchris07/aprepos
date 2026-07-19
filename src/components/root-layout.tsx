import { type ReactNode } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

interface LayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-zinc-200">
      <Navbar />
      <div className="w-[97%] mx-auto flex flex-col lg:flex-row gap-4 min-h-screen">
        <Sidebar />
        <main className="flex-1 bg-white p-3 shadow-sm">{children}</main>
      </div>
    </div>
  )
}

export default RootLayout
