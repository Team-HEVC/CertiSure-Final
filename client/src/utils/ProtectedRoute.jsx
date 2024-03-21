import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = (localStorage.getItem("access_token") || "").trim();
  console.log(token);
  if (token === "") {
    return <Navigate to="/404" />;
  }
  return children;
};

export default ProtectedRoute;
