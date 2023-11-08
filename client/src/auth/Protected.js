import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Protected = ({ children, redirectTo }) => {
  const [isAuth, setAuth] = useState(null);
  const navigate = useNavigate();
  const logIn = () => {
    setAuth(true);
  };

  const logOut = () => {
    setAuth(false);
  };

  let temp_token = localStorage.getItem("access_token");
  let temp_user = localStorage.getItem("user");
  axios.defaults.headers.get["Authorization"] = "Bearer " + temp_token;

  const checkToken = () => {
    console.log("[*] Validating LocalStorage Token...");
    return axios({
      url: `${import.meta.env.VITE_BACKEND_URL}/protected`,
      method: "get",
      timeout: 8000,
    })
      .then((res) => {
        //validation logic here
        if (res.data.logged_in_as === temp_user) {
          return "Valid";
        } else {
          return "Invalid";
        }
      })
      .catch((err) => {
        console.error(err);
        console.log(err.response.data.msg);
        return "Invalid";
      });
  };
  checkToken().then((data) => {
    if (data === "Invalid") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      logOut();
    } else {
      logIn();
    }
  });
  if (isAuth === false) {
    return navigate(redirectTo);
  } else if (isAuth === true) {
    return children;
  }
};

export default Protected;
