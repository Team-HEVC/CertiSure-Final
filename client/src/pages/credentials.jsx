/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import Table from "../components/Credentials/Table";
import { useLocation } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { toast } from "react-toastify";
import API from "../Axios";

const Credentials = () => {
  const id = useLocation();
  var userid = id.state;
  const [res, setRes] = useState([]);
  const [state, setState] = useState(false);
  const [selected, setSelected] = useState(0);
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
  });

  const getData = async () => {
    try {
      var path =
        userid === null
          ? `/get_all_certificate/${localStorage.getItem("user")}`
          : `/get_certificate_by_email/${userid}`;
      const response = await API.get(path);
      if (response.status === 200) {
        setRes(response.data);
      } else {
        console.error("Request failed with status", response.status);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const downloadCSV = () => {
    const columns = ["Username", "Email", "Groupname", "CertificateID", "Date"];
    const formattedData = res.map((row) => ({
      Username: row.username,
      Email: row.email,
      Groupname: row.group_name,
      CertificateID: row._id,
      Date: row.data,
    }));
    const csvContent = `${columns.join(" , ")}\n${formattedData
      .map((row) => columns.map((col) => row[col]).join(" , "))
      .join("\n")}`;
    const csvDataUrl = `data:text/csv;charset=utf-8,${encodeURIComponent(
      csvContent
    )}`;

    const link = document.createElement("a");
    link.href = csvDataUrl;
    link.download = "exported_data.csv";
    document.body.appendChild(link);

    // Trigger the click event to start the download
    link.click();

    // Remove the temporary link element
    document.body.removeChild(link);
  };

  const handleFileChange = (e) => {
    toast.success("CSV file Added", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
    });
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await API.post(`/upload/${userid}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      getData();
      toast.success("Certificate Generated Successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 4000,
      });
    } catch (error) {
      toast.error("Sorry, there was an issue while uploading file.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
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
        const response = await API.post("/certificate", {
          ...user,
          _id: userid,
        });
        getData();
        toast.success(
          `Certificate of ${user.username} Generated Successfully`,
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
      } catch (err) {
        console.log(err);
        toast.error("Sorry, there was an issue.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    };
    generateCertificate();
    setState(false);
  };

  const radios = [
    {
      image:
        "https://app.certifier.io/static/media/manual-mode.2de646831b072af6a90c.png",
      title: "Upload Manually",
    },
    {
      image:
        "https://app.certifier.io/static/media/spreadsheet-mode.2b142e383d3afc95a9e6.png",
      title: "Upload via spreadsheet",
    },
  ];

  return (
    <div className="flex flex-col px-24 py-4 gap-4 text-black bg-[#F0F2F5]">
      <div className=" h-28 rounded-lg items-end bg-white flex">
        <div className="w-[10%]] font-bold text-xl pl-5 pb-6">Credentials</div>
        <div className="w-[100%] items-end justify-end pr-5 pb-6 flex">
          <button
            onClick={() => setState(true)}
            disabled={userid === null}
            className={`px-3 py-1.5 gap-1 justify-center items-center flex text-sm text-white duration-150 bg-[#1677FF] font-medium pb-2 rounded-lg hover:bg-indigo-500 active:shadow-lg ${
              userid === null ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
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
      <div className="bg-white py-10 flex justify-center items-center ">
        <Table
          id={userid}
          refreshData={getData}
          tableData={res}
          exportCSV={downloadCSV}
        />
      </div>
      {state ? (
        <div className="fixed inset-0 z-10 h-[700px]">
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
              <div className="space-y-2 p-4 pb-8 mt-3 text-[15.5px] leading-relaxed text-gray-500">
                <p className="ml-2 font-semibold">
                  How would you like to add recipient details?
                </p>
              </div>
              <ul className="mb-10 mx-4 flex gap-1">
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
                      <div className="w-full p-5 cursor-pointer rounded-lg border bg-white shadow-sm ring-indigo-600 peer-checked:ring-2 duration-200">
                        <div className="flex flex-col justify-center items-center border-2 rounded-md hover:scale-105 transition duration-500 cursor-pointer">
                          <img className=" w-56" src={item.image}></img>
                          <p className="py-2 font-semibold text-base">
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
                  <div className="max-w-full px-20 mt-4 m-[19px]">
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
                          className="w-full p-1 ml-3 text-gray-500 outline-none bg-transparent"
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
                <div className="flex mb-6 gap-4 mt-14 flex-col justify-center items-center">
                  <div className=" border-2">
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
                        <p className="mt-3 text-gray-700 max-w-xs mx-auto">
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
                      toast.success("🔄 Processing your CSV file...", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 2000,
                      });
                      handleUpload();
                    }}
                    className="px-4 py-2 font-semibold text-indigo-600 bg-indigo-50 rounded-lg duration-150 hover:bg-indigo-100 active:bg-indigo-200"
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
