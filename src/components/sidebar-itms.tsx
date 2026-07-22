// import { useEffect, useState } from "react";
import {
  ArrowRightLeft,
  ChartCandlestick,
  CircleUserRound,
  Coins,
  LayoutDashboard,
  ReceiptText,
  Repeat2,
  SettingsIcon,
  User as UserIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router";
// import { ADMN, type User } from "../utlis/type";
// import { getCurrentUser } from "../utlis/get-user";

const SidebarItems = () => {
  //   const pathname = usePathname();
  const location = useLocation();

  // Combine user data and mounting state into one cohesive state object
  // const [hydrationProfile, setHydrationProfile] = useState<{
  //   isMounted: boolean;
  //   user: User | null;
  // }>({
  //   isMounted: false,
  //   user: null,
  // });

  // useEffect(() => {
  //   const newProfile = {
  //     isMounted: true,
  //     user: getCurrentUser(),
  //   };

  // Defer update to avoid synchronous setState inside the effect.
  //   Promise.resolve().then(() => {
  //     setHydrationProfile((prev) => {
  //       if (
  //         prev?.isMounted === newProfile.isMounted &&
  //         prev?.user === newProfile.user
  //       ) {
  //         return prev;
  //       }
  //       return newProfile;
  //     });
  //   });
  // }, []);

  const itemsAdmin = [
    {
      path: "/dashboard",
      name: "Tableau de bord",
      icon: <LayoutDashboard size={17} />,
    },
    { path: "/adhesions", name: "Adhesions", icon: <ReceiptText size={17} /> },
    { path: "/members", name: "Membres", icon: <UserIcon size={17} /> },
    { path: "/accounts", name: "Comptes", icon: <CircleUserRound size={17} /> },
    {
      path: "/transactions",
      name: "Transactions",
      icon: <ArrowRightLeft size={17} />,
    },
    { path: "/socials", name: "Social", icon: <Repeat2 size={17} /> },
    { path: "/loans", name: "Emprunts", icon: <Coins size={17} /> },
    {
      path: "/refunds",
      name: "Remboursement",
      icon: <ChartCandlestick size={17} />,
    },
    { path: "/settings", name: "Parametres", icon: <SettingsIcon size={17} /> },
  ];
 
  // const { isMounted, user } = hydrationProfile;
  // if (!isMounted) {
  //   return <div className="animate-pulse bg-transparent h-20 w-full" />;
  // }

  // const items = user?.role === ADMN ? itemsAdmin : null;

  return (
    <div className="space-y-1">
      {itemsAdmin.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <Link
            to={item.path}
            key={item.path}
            className={`flex items-center gap-2 p-2 rounded transition ${
              isActive
                ? "bg-gray-200 text-gray-900 font-medium"
                : "text-black hover:bg-gray-100"
            }`}
          >
            <div className="shrink-0">{item.icon}</div>
            <span>{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default SidebarItems;
