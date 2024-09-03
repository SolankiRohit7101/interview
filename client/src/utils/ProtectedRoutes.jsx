import { Outlet, Navigate } from "react-router-dom";
const ProtectedRoutes = () => {
  const user = localStorage.getItem("currentUser");
  let currentUser = JSON.parse(user);

  if (!currentUser) return <Navigate to={"/login"} />;
  return currentUser.email ? <Outlet /> : <Navigate to={"/register"} />;
};

export default ProtectedRoutes;
