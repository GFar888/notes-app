import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../../src/config/firebase-config";

const PrivateRoutes = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
