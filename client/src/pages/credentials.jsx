import { useCallback, useEffect, useState } from "react";
import Table from "../components/Credentials/Table";
import { useNavigate, useParams } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { toast } from "react-toastify";
import API from "../Axios";

const Credentials = () => {
  const params = useParams();
  const navigator = useNavigate();
  const groupId = params?.id || null;
  const [res, setRes] = useState([]);
  const [state, setState] = useState(false);
  const [selected, setSelected] = useState(0);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    username: "",
    email: "",
  });

  const getData = useCallback(
    async (Id) => {
      try {
        setLoading(true);
        var path =
          groupId === null
            ? `/get_all_certificate`
            : `/get_certificate_by_group/${Id}`;
        const response = await API.get(path, {
          headers: {
            Authorization: localStorage.getItem("access_token"),
          },
        });
        setRes(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (err) {
        setLoading(false);
        console.log(err);
        toast.error(err?.response?.data?.msg);
        if (err.response.status === 401) {
          navigator("/login");
        } else {
          navigator("/error", {
            state: {
              statusCode: err.response.status,
            },
          });
        }
      }
    },
    [groupId]
  );

  useEffect(() => {
    getData(groupId);
  }, [groupId]);

  const handleFileChange = (e) => {
    toast.success("CSV file Added");
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await API.post(`/upload/${groupId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("access_token"),
        },
      });
      if (response?.data?.data !== null) {
        setRes(response.data.data);
      }
      toast.success("Certificate Generated Successfully");
    } catch (err) {
      toast.error("Sorry, there was an issue while uploading file.");
      if (err.response.status === 401) {
        navigator("/login");
      }
    }
  };

  const handleRadioChange = (event) => {
    setSelected(parseInt(event.target.value));
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const generateCertificate = async () => {
      try {
        const response = await API.post(
          "/generate_certificate",
          {
            ...user,
            _id: groupId,
          },
          {
            headers: {
              Authorization: localStorage.getItem("access_token"),
            },
          }
        );
        if (response?.data?.data !== null) {
          setRes(response.data.data);
        }
        toast.success(`Certificate of ${user.username} Generated Successfully`);
      } catch (err) {
        toast.error("Sorry, there was an issue while uploading file.");
        if (err.response.status === 401) {
          navigator("/login");
        }
      }
    };
    generateCertificate();
    setState(false);
  };

  const radios = [
    {
      image:
        "https://res.cloudinary.com/deohymauz/image/upload/v1711101691/add-recipients_gogpes.png",
      title: "Upload Manually",
    },
    {
      image:
        "https://res.cloudinary.com/deohymauz/image/upload/v1711101691/upload-recipients_oqy9wb.png",
      title: "Upload via spreadsheet",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col px-4 md:px-24 py-4 gap-4 text-black bg-[#F0F2F5]">
      <div className="rounded-lg bg-white flex justify-between items-center py-3 px-5 ">
        <div className="w-[10%] font-bold text-xl">Credentials</div>
        <div className="w-[100%] items-end justify-end flex">
          <button
            onClick={() => setState(true)}
            disabled={groupId === null}
            className={`px-2 md:px-3 py-1.5 gap-1 justify-center items-center flex text-sm text-white duration-150 bg-[#1677FF] font-medium pb-2 rounded-lg hover:bg-indigo-500 active:shadow-lg ${
              groupId === null ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 hidden md:block h-5"
            >
              <path
                fillRule="evenodd"
                d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"
                clipRule="evenodd"
              />
            </svg>
            Issue Certificate
          </button>
        </div>
      </div>
      <div className="bg-white pb-5 md:py-10 ">
        <Table
          id={groupId}
          refreshData={getData}
          tableData={res}
          loading={loading}
        />
      </div>
      {state ? (
        <div className="fixed inset-0 z-10 ">
          <div
            className="fixed inset-0 w-full h-full bg-black opacity-40"
            onClick={() => setState(false)}
          ></div>
          <div className="flex items-center min-h-screen px-4 py-8">
            <div className="relative w-full max-w-lg mx-auto bg-white rounded-md shadow-lg">
              <div className="flex items-center justify-between p-4 border-b">
                <h4 className="text-lg font-medium text-gray-800">
                  Issue Certificate
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
              <div className="space-y-2 md:p-4 p-3 pt-2 md:pb-8 mt-0 md:mt-3 text-[15.5px] leading-relaxed text-gray-500">
                <p className="ml-2 font-semibold">
                  How would you like to add recipient details?
                </p>
              </div>
              <ul className="md:mb-10 mb-0 mx-4 flex md:gap-1 gap-3">
                {radios.map((item, idx) => (
                  <li key={idx}>
                    <label className="block relative">
                      <input
                        id={item.title}
                        type="radio"
                        value={idx}
                        checked={selected === idx}
                        onChange={handleRadioChange}
                        className="peer sr-only"
                      />
                      <div className="w-full p-2 md:p-5 cursor-pointer rounded-lg border bg-white shadow-sm ring-indigo-600 peer-checked:ring-2 duration-200">
                        <div className="flex flex-col justify-center items-center border-2 rounded-md hover:scale-105 transition duration-500 cursor-pointer">
                          <img className="w-32 md:w-56" src={item.image}></img>
                          <p className="py-2 font-semibold text-xs md:text-base">
                            {item.title}
                          </p>
                        </div>
                      </div>
                      <span className="block absolute top-5 left-5 border peer-checked:border-[5px] peer-checked:border-indigo-600 w-4 h-4 rounded-full"></span>
                    </label>
                  </li>
                ))}
              </ul>
              {selected === 0 && (
                <form action="" onSubmit={handleSubmit}>
                  <div className="max-w-full md:px-20 md:mt-4 mt-5 m-[19px]">
                    <div>
                      <label className="block pb-2 text-gray-500">
                        Recipient Name
                      </label>
                      <div className="flex items-center p-2 border rounded-md">
                        <BsFillPersonFill className="text-gray-400 w-7 h-7" />
                        <input
                          type="text"
                          placeholder="Enter the person's full name"
                          id="username"
                          name="username"
                          onChange={handleChange}
                          className="w-full p-1 md:ml-3 text-gray-500 outline-none bg-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block py-2 text-gray-500">
                        Recipient Email
                      </label>
                      <div className="flex items-center p-2 border rounded-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-gray-400 w-7 h-7"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        <input
                          type="email"
                          placeholder="Enter the person's email"
                          id="email"
                          name="email"
                          onChange={handleChange}
                          className="w-full p-1 ml-3 text-gray-500 outline-none bg-transparent"
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleSubmit}
                      className="px-4 ml-16 py-2 font-semibold text-indigo-600 bg-indigo-50 rounded-lg duration-150 hover:bg-indigo-100 active:bg-indigo-200 mt-4"
                    >
                      Generate Certificate
                    </button>
                  </div>
                </form>
              )}
              {selected === 1 && (
                <div className="flex mb-6 md:gap-4 mt-8 md:mt-14 flex-col justify-center items-center">
                  <div className=" border-2 rounded-md">
                    <label
                      htmlFor="file"
                      className="cursor-pointer text-center p-4 md:p-8"
                    >
                      <svg
                        className="w-10 h-10 mx-auto"
                        viewBox="0 0 41 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.1667 26.6667C8.48477 26.6667 5.5 23.6819 5.5 20C5.5 16.8216 7.72428 14.1627 10.7012 13.4949C10.5695 12.9066 10.5 12.2947 10.5 11.6667C10.5 7.0643 14.231 3.33334 18.8333 3.33334C22.8655 3.33334 26.2288 6.19709 27.0003 10.0016C27.0556 10.0006 27.1111 10 27.1667 10C31.769 10 35.5 13.731 35.5 18.3333C35.5 22.3649 32.6371 25.7279 28.8333 26.5M25.5 21.6667L20.5 16.6667M20.5 16.6667L15.5 21.6667M20.5 16.6667L20.5 36.6667"
                          stroke="#4F46E5"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      {file ? (
                        <p className="mt-3 p-3 text-gray-700 max-w-xs mx-6">
                          File has been Added
                        </p>
                      ) : (
                        <p className="mt-3 text-gray-700 max-w-xs mx-auto">
                          Click to{" "}
                          <span className="font-medium text-indigo-600">
                            Upload your file
                          </span>{" "}
                          or drag and drop your file here
                        </p>
                      )}
                    </label>
                    <input
                      id="file"
                      name="file"
                      onChange={handleFileChange}
                      type="file"
                      className="hidden"
                    />
                  </div>
                  <button
                    onClick={() => {
                      setState(false);
                      toast.success("🔄 Processing your CSV file...");
                      handleUpload();
                    }}
                    className="px-4 py-2 mt-5 md:mt-0 font-semibold text-indigo-600 bg-indigo-50 rounded-lg duration-150 hover:bg-indigo-100 active:bg-indigo-200"
                  >
                    Generate Certificate
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Credentials;
