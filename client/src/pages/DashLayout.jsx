import { Outlet, useNavigation } from "react-router-dom";
import NavDash from "../components/Dashboard/NavDash";
import Footerdash from "../components/Dashboard/Footerdash";

const DashLayout = () => {
  const navigation = useNavigation();

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
      <Footerdash />
    </>
  );
};
export default DashLayout;
