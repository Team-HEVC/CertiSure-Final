import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../Axios.js";

const NavDash = () => {
  const [upgrade, setUpgrade] = useState("Upgrade");
  const [selected, setSelected] = useState(0);
  const handleRadioChange = (event) => {
    setSelected(parseInt(event.target.value));
  };

  const handleSubmitt = async () => {
    try {
      const res = await API.post(
        `/create-checkout-session`,
        {},
        {
          headers: {
            Authorization: `${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (res.status === 200) {
        console.log(res);
        window.location.href = res.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpgrade = async () => {
    const userData = await API.get("/get_user", {
      headers: {
        Authorization: `${localStorage.getItem("access_token")}`,
      },
    });

    console.log(userData);

    if (userData.data.subscription) {
      setUpgrade("Premium");
    }
  };

  useEffect(() => {
    handleUpgrade();
  }, []);

  const radios = [
    {
      name: "Professional",
      description:
        "For small companies looking for professional branded experience & data insights",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.60676 23.1864L8.02271 20.5444L7.09617 20.5229H2.67188L5.74654 1.02757C5.75608 0.968712 5.7871 0.913836 5.83243 0.874866C5.87776 0.835896 5.93582 0.814423 5.99626 0.814423H13.4562C15.9328 0.814423 17.642 1.32978 18.5343 2.34698C18.9526 2.82417 19.219 3.32282 19.3479 3.87159C19.4831 4.44739 19.4855 5.13533 19.3535 5.97438L19.3439 6.03562V6.57325L19.7622 6.81025C20.1146 6.99715 20.3945 7.21108 20.6092 7.45604C20.9671 7.86403 21.1986 8.38257 21.2964 8.99734C21.3974 9.62961 21.364 10.382 21.1986 11.2338C21.0077 12.2136 20.6991 13.0669 20.2824 13.7652C19.899 14.4086 19.4107 14.9423 18.8309 15.3558C18.2774 15.7487 17.6197 16.047 16.8761 16.2378C16.1555 16.4255 15.334 16.5202 14.4329 16.5202H13.8523C13.4372 16.5202 13.0339 16.6697 12.7174 16.9377C12.4001 17.2113 12.1901 17.5851 12.1257 17.9939L12.082 18.2317L11.3471 22.8882L11.3137 23.0592C11.3049 23.1133 11.2898 23.1403 11.2676 23.1586C11.2477 23.1753 11.219 23.1864 11.1912 23.1864H7.60676Z"
            fill="#253B80"
          />
          <path
            d="M20.1586 6.09761C20.1364 6.23997 20.1109 6.38551 20.0823 6.53503C19.0985 11.586 15.7327 13.3309 11.4341 13.3309H9.24541C8.71971 13.3309 8.27673 13.7127 8.19481 14.2312L7.07422 21.3381L6.75689 23.3526C6.70361 23.693 6.96606 24 7.30963 24H11.1915C11.6512 24 12.0417 23.666 12.1141 23.2126L12.1523 23.0154L12.8831 18.3772L12.9301 18.1227C13.0016 17.6678 13.3929 17.3337 13.8526 17.3337H14.4332C18.1942 17.3337 21.1384 15.8067 21.999 11.388C22.3584 9.54209 22.1723 8.00078 21.2212 6.91678C20.9333 6.58991 20.5762 6.31871 20.1586 6.09761Z"
            fill="#179BD7"
          />
          <path
            d="M19.13 5.68728C18.9797 5.64354 18.8246 5.60378 18.6655 5.56799C18.5057 5.53299 18.3419 5.50198 18.1732 5.47494C17.5831 5.3795 16.9365 5.33417 16.2438 5.33417H10.3967C10.2528 5.33417 10.116 5.36678 9.9935 5.42563C9.72389 5.55526 9.52348 5.81056 9.47496 6.12311L8.2311 14.0014L8.19531 14.2313C8.27723 13.7127 8.72022 13.331 9.24591 13.331H11.4346C15.7332 13.331 19.099 11.5853 20.0828 6.53508C20.1122 6.38556 20.1369 6.24002 20.1591 6.09766C19.9102 5.96564 19.6406 5.85271 19.3503 5.75648C19.2787 5.73262 19.2048 5.70955 19.13 5.68728Z"
            fill="#222D65"
          />
          <path
            d="M9.47421 6.12308C9.52272 5.81052 9.72314 5.55523 9.99275 5.42639C10.116 5.36753 10.252 5.33493 10.396 5.33493H16.2431C16.9358 5.33493 17.5824 5.38026 18.1725 5.4757C18.3411 5.50274 18.5049 5.53375 18.6648 5.56875C18.8238 5.60453 18.9789 5.6443 19.1292 5.68804C19.204 5.71031 19.278 5.73337 19.3503 5.75644C19.6406 5.85267 19.9102 5.9664 20.1592 6.09763C20.4518 4.23104 20.1568 2.96014 19.1475 1.80933C18.0349 0.5424 16.0267 0 13.4571 0H5.99712C5.47222 0 5.02446 0.381748 4.94334 0.901084L1.83607 20.5969C1.77483 20.9866 2.07546 21.3381 2.46834 21.3381H7.07397L8.23034 14.0014L9.47421 6.12308Z"
            fill="#253B80"
          />
        </svg>
      ),
    },
    {
      name: "Premium",
      description:
        "For medium and large enterprises requiring advanced customization & tailored approach",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.2436 6.17905H8.75391V17.8412H15.2436V6.17905Z"
            fill="#FF5F00"
          />
          <path
            d="M9.16737 12.0105C9.16635 10.8874 9.42086 9.77873 9.91165 8.76848C10.4024 7.75824 11.1166 6.87289 12.0002 6.17946C10.906 5.31945 9.59201 4.78462 8.20829 4.63611C6.82457 4.48759 5.42699 4.73138 4.17527 5.33961C2.92356 5.94784 1.86822 6.89597 1.12988 8.07562C0.391546 9.25528 0 10.6189 0 12.0105C0 13.4022 0.391546 14.7658 1.12988 15.9455C1.86822 17.1251 2.92356 18.0732 4.17527 18.6815C5.42699 19.2897 6.82457 19.5335 8.20829 19.385C9.59201 19.2365 10.906 18.7016 12.0002 17.8416C11.1166 17.1482 10.4024 16.2628 9.91165 15.2526C9.42087 14.2423 9.16635 13.1337 9.16737 12.0105Z"
            fill="#EB001B"
          />
          <path
            d="M23.9998 12.0105C23.9998 13.4022 23.6083 14.7658 22.87 15.9454C22.1317 17.1251 21.0764 18.0732 19.8247 18.6814C18.5731 19.2897 17.1755 19.5335 15.7918 19.385C14.4081 19.2365 13.0941 18.7016 12 17.8416C12.8828 17.1475 13.5964 16.262 14.0871 15.2519C14.5778 14.2418 14.8328 13.1335 14.8328 12.0105C14.8328 10.8876 14.5778 9.77925 14.0871 8.76917C13.5964 7.75908 12.8828 6.87359 12 6.17946C13.0941 5.31945 14.4081 4.78462 15.7918 4.63611C17.1755 4.48759 18.5731 4.73139 19.8247 5.33962C21.0764 5.94786 22.1317 6.89599 22.87 8.07565C23.6083 9.25531 23.9998 10.6189 23.9998 12.0105Z"
            fill="#F79E1B"
          />
          <path
            d="M23.2934 16.6062V16.3674H23.3897V16.3188H23.1445V16.3674H23.2408V16.6062H23.2934ZM23.7695 16.6062V16.3183H23.6943L23.6079 16.5163L23.5214 16.3183H23.4462V16.6062H23.4993V16.389L23.5803 16.5762H23.6354L23.7164 16.3886V16.6062H23.7695Z"
            fill="#F79E1B"
          />
        </svg>
      ),
    },
  ];

  const [state, setState] = useState(false);

  return (
    <div className="navbar text-[#FFFFFF99] bg-[#001529]">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 text-black shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link className=" hover:text-white" to="">
                Dashboard
              </Link>
            </li>
            <li>
              <Link className=" hover:text-white" to="/dashboard/groups">
                Groups
              </Link>
            </li>
            <li>
              <Link className=" hover:text-white" to="/dashboard/credentials">
                Credentials
              </Link>
            </li>
            <li>
              <Link className=" hover:text-white" to="#">
                Email
              </Link>
            </li>
          </ul>
        </div>
        <Link to="#" className="btn btn-ghost normal-case text-xl">
          CertiSure
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className=" flex font-semibold text-base gap-12 px-1">
          <li>
            <Link className=" hover:text-white" to="">
              Dashboard
            </Link>
          </li>
          <li>
            <Link className=" hover:text-white" to="/dashboard/groups">
              Groups
            </Link>
          </li>
          <li>
            <Link className=" hover:text-white" to="/dashboard/credentials">
              Credentials
            </Link>
          </li>
          <li>
            <Link className=" hover:text-white" to="#">
              Email
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end gap-3 mr-4 ">
        <Link
          onClick={() => {
            if (upgrade === "Upgrade") {
              setState(true);
            }
          }}
          to=""
          className="bg-[#FA8C16] font-semibold text-white hover:text-black border-none hover:bg-slate-300 px-4 py-2 rounded-lg duration-150  active:shadow-lg"
        >
          {upgrade}
        </Link>
        {state ? (
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setState(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg mx-auto bg-white rounded-md shadow-lg">
                <div className="flex items-center justify-between p-4 border-b">
                  <h4 className="text-lg font-medium text-gray-800">
                    Select a plan
                  </h4>
                  <button
                    className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
                    onClick={() => setState(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 mx-auto"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <div className="">
                  <ul className="mt-6 px-5 space-y-3">
                    {radios.map((item, idx) => (
                      <li key={idx}>
                        <label htmlFor={item.name} className="block relative">
                          <input
                            id={item.name}
                            type="radio"
                            value={idx}
                            checked={selected === idx}
                            onChange={handleRadioChange}
                            name="payment"
                            className="sr-only peer"
                          />
                          <div className="w-full flex gap-x-3 items-start p-4 cursor-pointer rounded-lg border bg-white shadow-sm ring-indigo-600 peer-checked:ring-2 duration-200">
                            <div className="flex-none">{item.icon}</div>
                            <div>
                              <h3 className="leading-none text-gray-800 font-medium pr-3">
                                {item.name}
                              </h3>
                              <p className="mt-1 text-sm text-gray-600">
                                {item.description}
                              </p>
                            </div>
                          </div>
                          <div className="absolute top-4 right-4 flex-none flex items-center justify-center w-4 h-4 rounded-full border peer-checked:bg-indigo-600 text-white peer-checked:text-white duration-200">
                            <svg className="w-2.5 h-2.5" viewBox="0 0 12 10">
                              <polyline
                                fill="none"
                                strokeWidth="2px"
                                stroke="currentColor"
                                strokeDasharray="16px"
                                points="1.5 6 4.5 9 10.5 1"
                              ></polyline>
                            </svg>
                          </div>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center gap-3 p-4 mt-5 border-t">
                  <button
                    className="px-6 py-2 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                    onClick={handleSubmitt}
                  >
                    Pay
                  </button>
                  <button
                    className="px-6 py-2 text-gray-800 border rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                    onClick={() => setState(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://res.cloudinary.com/dp9kpxfpa/image/upload/v1715363591/undraw_Male_avatar_g98d_p7ozq8.png" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 text-[#5E6570]  shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => {
                  localStorage.removeItem("access_token");
                  localStorage.removeItem("user");
                }}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavDash;
