// import { useEffect, useState } from "react";
import {
  ArrowRightLeft,
  ChartCandlestick,
  ChevronRight,
  CircleUserRound,
  Coins,
  FileChartColumn,
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
  const location = useLocation();

  const sections = [
    {
      title: "Vue d'ensemble",
      items: [
        {
          path: "/dashboard",
          name: "Tableau de bord",
          icon: <LayoutDashboard size={17} />,
        },
      ],
    },

    {
      title: "Opérations financières",
      items: [
        {
          path: "/transactions",
          name: "Transactions",
          icon: <ArrowRightLeft size={17} />,
        },
        {
          path: "/loans",
          name: "Emprunts",
          icon: <Coins size={17} />,
        },
        {
          path: "/refunds",
          name: "Remboursements",
          icon: <ChartCandlestick size={17} />,
        },
        {
          path: "/statement",
          name: "Relevé de compte",
          icon: <FileChartColumn size={17} />,
        },
      ],
    },

    {
      title: "Membres & épargne",
      items: [
        {
          path: "/members",
          name: "Membres",
          icon: <UserIcon size={17} />,
        },
        {
          path: "/accounts",
          name: "Comptes épargne",
          icon: <CircleUserRound size={17} />,
        },
        {
          path: "/adhesions",
          name: "Adhésions",
          icon: <ReceiptText size={17} />,
        },
        {
          path: "/socials",
          name: "Social",
          icon: <Repeat2 size={17} />,
        },
      ],
    },

    {
      title: "Administration",
      items: [
        {
          path: "/settings",
          name: "Paramètres",
          icon: <SettingsIcon size={17} />,
        },
      ],
    },
  ];

  return (
    <nav className="space-y-5">
      {sections.map((section) => (
        <div key={section.title}>
          {/* Titre section */}

          <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
            {section.title}
          </p>

          {/* Items */}

          <div className="space-y-0.5">
            {section.items.map((item) => {
              const isActive =
                location.pathname === item.path ||
                location.pathname.startsWith(`${item.path}/`);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-all duration-150 ${
                    isActive
                      ? "bg-green-700 font-medium text-white shadow-sm"
                      : "text-gray-600 hover:bg-green-50 hover:text-green-800"
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className={`shrink-0 ${
                        isActive
                          ? "text-white"
                          : "text-gray-400 group-hover:text-green-700"
                      }`}
                    >
                      {item.icon}
                    </span>

                    <span className="truncate">{item.name}</span>
                  </div>

                  {isActive && (
                    <ChevronRight
                      size={14}
                      className="shrink-0 text-white/70"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
};

export default SidebarItems;
