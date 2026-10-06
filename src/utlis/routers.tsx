import AccountPage from "../pages/account";
import AdhesionPage from "../pages/adhesion";
import Credit from "../pages/credit";
import CreditLine from "../pages/credit-line";
import DashboardPage from "../pages/dashboard";
import LoanPage from "../pages/loan";
import LoginPage from "../pages/login";
import MemberPage from "../pages/member";
import Products from "../pages/products";
import RefundPage from "../pages/refund";
import SettingPage from "../pages/settings";
import SocialPage from "../pages/social";
import SplashScreenPage from "../pages/splash-screen";
import StatementPage from "../pages/statement";
import TransactionPage from "../pages/transaction";
import type { router } from "./type";

export const routers: router[] = [
  {
    path: "/",
    element: <SplashScreenPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/transactions",
    element: <TransactionPage />,
  },
  {
    path: "/adhesions",
    element: <AdhesionPage />,
  },
  {
    path: "/refunds",
    element: <RefundPage />,
  },
  {
    path: "/loans",
    element: <LoanPage />,
  },
  {
    path: "/socials",
    element: <SocialPage />,
  },
  {
    path: "/accounts",
    element: <AccountPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/members",
    element: <MemberPage />,
  },
  {
    path: "/settings",
    element: <SettingPage />,
  },
    {
    path: "/statement",
    element: <StatementPage />,
  },

  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/cantine",
    element: <Credit />,
  },
  {
    path: "/credit-line",
    element: <CreditLine />,
  }
];
