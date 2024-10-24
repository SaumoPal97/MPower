import { Navigate, Outlet } from "react-router-dom";

import { isAuthenticated } from "@/utils/utils";

const UnAuthenticatedRoute = () => {
  const isAuth = isAuthenticated();
  return isAuth ? <Navigate to="/" /> : <Outlet />;
};

export default UnAuthenticatedRoute;
