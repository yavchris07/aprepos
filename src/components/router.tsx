import { Route, Routes } from "react-router";
import NotFoundPage from "../pages/not-found";
import { routers } from "../utlis/routers";

const Router = () => {
  return (
    <Routes>
      {routers.map((route) => {
        return (
          <Route path={route.path} element={route.element} key={route.path} />
        );
      })}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
