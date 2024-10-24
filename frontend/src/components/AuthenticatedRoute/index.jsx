import { Navigate, Outlet } from "react-router-dom";

import { isAuthenticated } from "@/utils/utils";

const AuthenticatedRoute = () => {
  const isAuth = isAuthenticated();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthenticatedRoute;
