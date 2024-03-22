import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CertificateCredentials from "./pages/CertificateCredentials";
import HomeLayout from "./pages/HomeLayout";
import { Suspense, lazy } from "react";
import Error from "./pages/Error";
import ProtectedRoute from "./utils/ProtectedRoute";

const DashLayout = lazy(() => import("./pages/DashLayout"));
const Groups = lazy(() => import("./pages/Groups"));
const Design = lazy(() => import("./pages/Design"));
const Credentials = lazy(() => import("./pages/credentials"));
const Blogs = lazy(() => import("./pages/Blogs"));
const Pricing = lazy(() => import("./pages/Pricing"));
const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="credential/:id" element={<CertificateCredentials />} />
          </Route>
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <DashLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Groups />} />
            <Route path="groups" element={<Groups />} />
            <Route path="design" element={<Design />} />
            <Route path="credentials/:id" element={<Credentials />} />
            <Route path="credentials" element={<Credentials />} />
          </Route>
          <Route path="/*" element={<Navigate to="/error" />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
export default App;
