import { Outlet, useNavigate } from "react-router-dom";
import NavDash from "../components/Dashboard/NavDash";
import FooterDash from "../components/Dashboard/FooterDash";

const DashLayout = () => {
  const navigation = useNavigate();

  const isPageLoading = navigation.state === "loading";
  const value = "loading...";
  return (
    <>
      <NavDash />
      <section className="page">
        {isPageLoading ? (
          <div className="loading" />
        ) : (
          <Outlet context={{ value }} />
        )}
      </section>
      <FooterDash />
    </>
  );
};
export default DashLayout;
