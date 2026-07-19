import LoginPage from "../pages/login";
import SplashScreenPage from "../pages/splash-screen";
import type { router } from "./type";

 

export const routers: router[] = [
  {
    path: "/",
    element: <SplashScreenPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  }  
];
