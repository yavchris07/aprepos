import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Link,
  MonitorCloud,
  SettingsIcon,
  ShieldPlus,
  User as UserIcon,
  UserKey,
} from "lucide-react";
import { useLocation } from "react-router";
import { ADMN, type User } from "../utlis/type";
import { getCurrentUser } from "../utlis/get-user";

const SidebarItems = () => {
//   const pathname = usePathname();
    const location = useLocation();

  // Combine user data and mounting state into one cohesive state object
  const [hydrationProfile, setHydrationProfile] = useState<{
    isMounted: boolean;
    user: User | null;
  }>({
    isMounted: false,
    user: null,
  });

  useEffect(() => {
    const newProfile = {
      isMounted: true,
      user: getCurrentUser(),
    };

    // Defer update to avoid synchronous setState inside the effect.
    Promise.resolve().then(() => {
      setHydrationProfile((prev) => {
        if (
          prev?.isMounted === newProfile.isMounted &&
          prev?.user === newProfile.user
        ) {
          return prev;
        }
        return newProfile;
      });
    });
  }, []);

  const itemsAdmin = [
    {
      path: "/dashboard",
      name: "Tableau de bord",
      icon: <LayoutDashboard size={17} />,
    },
    { path: "/users", name: "Utilisateurs", icon: <UserIcon size={17} /> },
    { path: "/rules", name: "Roles", icon: <UserKey size={17} /> },
    { path: "/sessions", name: "Sessions", icon: <ShieldPlus size={17} /> },
    { path: "/logs", name: "Monitoring", icon: <MonitorCloud size={17} /> },
    { path: "/settings", name: "Parametres", icon: <SettingsIcon size={17} /> },
  ];

 

  // Destructure for seamless integration with your existing layout logic
  const { isMounted, user } = hydrationProfile;

  // Render a clean placeholder matching the height on the server string
  if (!isMounted) {
    return <div className="animate-pulse bg-transparent h-20 w-full" />;
  }

  const items =
    user?.role === ADMN
      ? itemsAdmin
      :null;

  return (
    <div className="space-y-1">
      {items.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <Link
            href={item.path}
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
