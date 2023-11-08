import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Groups from "./pages/Groups";
import DashLayout from "./pages/DashLayout";
import Credentials from "./pages/credentials";
import Design from "./pages/Design";
import CertificateCredentials from "./pages/CertificateCredentials";
import Protected from "./auth/Protected";
import Pricing from "./pages/Pricing";
import Blogs from "./pages/Blogs";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <h1>error</h1>,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <h1>error</h1>,
  },
  {
    path: "/signup",
    element: <Signup />,
    errorElement: <h1>error</h1>,
  },
  {
    path: "/credential/:id",
    element: <CertificateCredentials />,
    errorElement: <h1>error</h1>,
  },
  {
    path: "/pricing",
    element: <Pricing />,
    errorElement: <h1>error</h1>,
  },
  {
    path: "/blogs",
    element: <Blogs />,
    errorElement: <h1>error</h1>,
  },
  {
    path: "/dashboard",
    element: (
      <Protected redirectTo="/login">
        <DashLayout />
      </Protected>
    ),
    errorElement: <h1>error</h1>,
    children: [
      {
        index: true,
        element: <Groups />,
        errorElement: <h1>error</h1>,
      },
      {
        path: "groups",
        element: <Groups />,
        errorElement: <h1>error</h1>,
      },
      {
        path: "design",
        element: <Design />,
        errorElement: <h1>error</h1>,
      },
      {
        path: "credentials",
        element: <Credentials />,
        errorElement: <h1>error</h1>,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
