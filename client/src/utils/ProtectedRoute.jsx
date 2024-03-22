import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = (localStorage.getItem("access_token") || "").trim();

  if (token === "") {
    return <Navigate to="/404" />;
  }
  return children;
};

export default ProtectedRoute;
