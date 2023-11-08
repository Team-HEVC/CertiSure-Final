import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import API from "../Axios";

/* eslint-disable react/no-unknown-property */
const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/login", user);
      console.log(response);
      localStorage.setItem("access_token", response.data.token);
      localStorage.setItem("user", user.email);
      toast.success("Login successful. Access granted.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.status === 401
          ? error.response.data.msg
          : error.message,
        { position: toast.POSITION.BOTTOM_RIGHT }
      );
    }
  };

  return (
    <main className="w-full flex">
      {/* <ToastBar /> */}
      <div className="relative flex-1 hidden items-center justify-center h-screen bg-gray-900 lg:flex">
        <div className="relative z-10 w-full max-w-md">
          <img
            className="cursor-pointer"
            onClick={() => navigate("/")}
            src="https://i.ibb.co/j5dVL0j/1.png"
            width={250}
          />
          <div className=" mt-16 space-y-3">
            <h3 className="text-white text-3xl font-bold">
              Login to your Account
            </h3>
            <p className="text-gray-300">
              Login and access all your credentials in one place
            </p>
            <div className="flex items-center -space-x-2 overflow-hidden">
              <img
                src="https://randomuser.me/api/portraits/women/79.jpg"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://randomuser.me/api/portraits/men/86.jpg"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <p className="text-sm text-gray-400 font-medium translate-x-5">
                Join 5000+ users
              </p>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-0 my-auto h-[500px]"
          style={{
            background:
              "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
            filter: "blur(118px)",
          }}
        ></div>
      </div>
      <div className="flex-1 flex items-center justify-center bg-white h-screen">
        <div className="w-full max-w-md space-y-8 px-4 p-10 bg-white text-gray-600 sm:px-0">
          <div className="max-w-sm w-full text-gray-600">
            <div className="text-center">
              <div className="mt-5 space-y-2">
                <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                  Log in to your account
                </h3>
                <p className="">
                  Dont have an account?{" "}
                  <Link
                    to="/signup"
                    href="javascript:void(0)"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="font-medium">Email</label>
                <input
                  type="email"
                  required
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium">Password</label>
                <input
                  type="password"
                  required
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
              >
                Sign in
              </button>
              <div className="text-center">
                <a href="javascript:void(0)" className="hover:text-indigo-600">
                  Forgot password?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
