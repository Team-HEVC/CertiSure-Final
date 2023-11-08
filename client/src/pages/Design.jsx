/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import resolutiion from "../assets/base.png";
import API from "../Axios";

const Design = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [points, setPoints] = useState({ ox: 0, oy: 0, rx: 0, ry: 0 });
  const newData = useSelector((store) => store.template);
  const [temp, setTemp] = useState({ sx: 0, sy: 0, ex: 0, ey: 0 });
  const isDrawing = useRef(false);
  const startCoords = useRef({ x: 0, y: 0 });
  const endCoords = useRef({ x: 0, y: 0 });
  const myEmail = localStorage.getItem("user") || "sumil@gmail.com";
  const [data, setData] = useState({
    organizationid: "",
    issuer: "",
    groupname: "",
    type: "0",
    imagelink: "",
    fontname: "",
    startname: "",
    finalname: "",
    startlink: "",
    finallink: "",
    startqr: "",
    finalqr: "",
    startrank: "",
    finalrank: "",
    email: `${myEmail}`,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/create_group", data);
      console.log(response);
      toast.success("Group successfully created!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      navigate("/dashboard/groups");
    } catch (err) {
      toast.error("Sorry, there was an issue while creating the group.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      console.log(err);
    }
  };

  useEffect(() => {
    setData({
      ...data,
      organizationid: searchParams.get("param3"),
      issuer: searchParams.get("param1"),
      groupname: searchParams.get("param2"),
    });
  }, []);

  const changeCertificate = (e) => {
    const name = e.target.value;
    console.log(newData[name]);
    setData({ ...data, ...newData[name] });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleImageUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    async function uploadImage() {
      try {
        const response = await axios({
          method: "post",
          url: `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_REACT_APP_IMGBBKEY
          }`,

          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.status === 200) {
          const imageUrl = response.data.data.url;
          setData({ ...data, imagelink: imageUrl });
          toast.success("Image Uploaded Successfully!", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        } else {
          toast.error("Sorry, there was an issue while uploading image.", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      } catch (error) {
        toast.error("Sorry, there was an issue while uploading image.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    }
    uploadImage();
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const renderSize = {
          width: img.width,
          height: img.height,
        };
        setPoints({ ...points, ox: img.width, oy: img.height });
        console.log(
          "Original Size (width x height)::",
          renderSize.width,
          "x",
          renderSize.height
        );
      };
    }
  };

  const handleMouseClick = (e) => {
    if (!isDrawing.current) {
      startCoords.current.x = e.nativeEvent.offsetX;
      startCoords.current.y = e.nativeEvent.offsetY;
      isDrawing.current = true;
    } else {
      endCoords.current.x = e.nativeEvent.offsetX;
      endCoords.current.y = e.nativeEvent.offsetY;

      const startX = Math.min(startCoords.current.x, endCoords.current.x);
      const startY = Math.min(startCoords.current.y, endCoords.current.y);
      const endX = Math.max(startCoords.current.x, endCoords.current.x);
      const endY = Math.max(startCoords.current.y, endCoords.current.y);

      const rectangle = document.createElement("div");
      rectangle.style.position = "absolute";
      rectangle.style.border = "2px solid red";
      rectangle.style.left = `${startX}px`;
      rectangle.style.top = `${startY}px`;
      rectangle.style.width = `${endX - startX}px`;
      rectangle.style.height = `${endY - startY}px`;

      const imageContainer = document.getElementById("image-container");
      imageContainer.appendChild(rectangle);
      console.log("ratio :coordinate*(original size/render size)");
      setTemp({
        sx: Math.round((startX * points.ox) / points.rx),
        sy: Math.round((startY * points.oy) / points.ry),
        ex: Math.round((endX * points.ox) / points.rx),
        ey: Math.round((endY * points.oy) / points.ry),
      });
      isDrawing.current = false;
    }
  };

  useEffect(() => {
    const imageContainer = document.getElementById("image-container");
    const image = document.querySelector("#image-container img");

    if (image && imageContainer) {
      const renderSize = {
        width: image.width,
        height: image.height,
      };
      setPoints({ ...points, rx: image.width, ry: image.height });
      console.log(
        "Render Size (width x height):",
        renderSize.width,
        "x",
        renderSize.height
      );
    }
  }, [data.imagelink]);

  return (
    <div className="flex flex-col px-24 pt-4 gap-4 bg-[#F0F2F5]">
      <div className="h-14 rounded-lg bg-white flex relative">
        <div className="flex justify-center items-center flex-row mx-5">
          <div className="block text-md font-medium leading-6 text-gray-900">
            Design:{" "}
          </div>
          <div className="relative max-w-xs ml-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 right-2.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <select
              onChange={changeCertificate}
              className="w-full p-2.5 px-5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none "
            >
              <option value={"default"}>Customize</option>
              <option value={"template1"}>CS50 template</option>
            </select>
          </div>
        </div>
        <div className="flex justify-center items-center flex-row ml-60">
          <div className="block text-md font-medium leading-6 text-gray-900">
            Cerificate Type:{" "}
          </div>
          <div className="relative max-w-xs ml-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 right-2.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <select
              name="type"
              onChange={handleChange}
              className="w-full p-2.5 px-10 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none "
            >
              <option value={0} selected={Selection}>
                Participation
              </option>
              <option value={1}>Winners</option>
            </select>
          </div>
        </div>

        <div className=" text-md font-medium leading-6 text-gray-900 absolute right-8 top-4 ">
          <p>issued by {data.issuer}</p>
        </div>
      </div>
      <div className="bg-white h-[630px] flex flex-row rounded-lg mb-5">
        {/* coordinate details */}
        <div className="w-4/12 border-r-2 border-gray-200">
          <form onSubmit={handleSubmit} action="" className="p-4 -mt-1">
            <div className="">
              <label
                htmlFor="groupname"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Group Name:
              </label>
              <div className="mt-1">
                <input
                  id="groupname"
                  name="groupname"
                  type="groupname"
                  value={data.groupname}
                  onChange={handleChange}
                  placeholder="Group Name"
                  className="block w-full rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* FONT */}
            <div className="mt-3">
              <label
                htmlFor="fontname"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Font Name:
              </label>
              <div className="mt-1">
                <input
                  id="fontname"
                  name="fontname"
                  type="fontname"
                  value={data.fontname}
                  onChange={handleChange}
                  placeholder="Poppins, sans-serif"
                  className="block w-full rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* NAME */}
            <div className="mt-3">
              <div className="flex">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Recipient name:
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setData({
                      ...data,
                      startname: `${temp.sx},${temp.sy}`,
                      finalname: `${temp.ex},${temp.ey}`,
                    });
                  }}
                  className="ml-[230px] rounded-md bg-indigo-600 px-2 py-1 text-xs font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get points
                </button>
              </div>

              <div className="flex flex-row space-x-9">
                <div>
                  <label
                    htmlFor="startname"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    initial coordinates:
                  </label>
                  <input
                    id="startname"
                    name="startname"
                    type="startname"
                    value={data.startname}
                    onChange={handleChange}
                    placeholder=" X , Y  "
                    className="block w-[185px] rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label
                    htmlFor="finalname"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    final Coordinates:
                  </label>
                  <input
                    id="finalname"
                    name="finalname"
                    type="finalname"
                    value={data.finalname}
                    onChange={handleChange}
                    placeholder=" X , Y  "
                    className="block w-[185px] rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            {/* LINK */}
            <div className="mt-3">
              <div className="flex">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Recipient Link:
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setData({
                      ...data,
                      startlink: `${temp.sx},${temp.sy}`,
                      finallink: `${temp.ex},${temp.ey}`,
                    });
                  }}
                  className="ml-60 rounded-md bg-indigo-600 px-2 py-1 text-xs font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get points
                </button>
              </div>

              <div className="flex flex-row space-x-9">
                <div>
                  <label
                    htmlFor="startlink"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    initial coordinates:
                  </label>
                  <input
                    id="startlink"
                    name="startlink"
                    type="text"
                    value={data.startlink}
                    onChange={handleChange}
                    placeholder=" X , Y  "
                    className="block w-[185px] rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label
                    htmlFor="finallink"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    final Coordinates:
                  </label>
                  <input
                    id="finallink"
                    name="finallink"
                    type="text"
                    value={data.finallink}
                    onChange={handleChange}
                    placeholder=" X , Y  "
                    className="block w-[185px] rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            {/* QR Code */}
            <div className="mt-3">
              <div className="flex">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Recipient QR Code:
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setData({
                      ...data,
                      startqr: `${temp.sx},${temp.sy}`,
                      finalqr: `${temp.ex},${temp.ey}`,
                    });
                  }}
                  className="ml-52 rounded-md bg-indigo-600 px-2 py-1 text-xs font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get points
                </button>
              </div>

              <div className="flex flex-row space-x-9">
                <div>
                  <label
                    htmlFor="startqr"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    initial coordinates:
                  </label>
                  <input
                    id="startqr"
                    name="startqr"
                    type="text"
                    value={data.startqr}
                    onChange={handleChange}
                    placeholder=" X , Y  "
                    className="block w-[185px] rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label
                    htmlFor="finalqr"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    final Coordinates:
                  </label>
                  <input
                    id="finalqr"
                    name="finalqr"
                    type="text"
                    value={data.finalqr}
                    onChange={handleChange}
                    placeholder=" X , Y  "
                    className="block w-[185px] rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            {/* rank  */}
            <div
              className={
                data.type === "0"
                  ? "mt-5 opacity-60 cursor-not-allowed"
                  : " mt-5"
              }
            >
              <div className="flex">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900 "
                  style={data.type === "0" ? { cursor: "not-allowed" } : {}}
                >
                  Recipient Rank:
                </label>
                <button
                  style={data.type === "0" ? { cursor: "not-allowed" } : {}}
                  type="button"
                  onClick={() => {
                    setData({
                      ...data,
                      startrank: `${temp.sx},${temp.sy}`,
                      finalrank: `${temp.ex},${temp.ey}`,
                    });
                  }}
                  className="ml-[230px] rounded-md bg-indigo-600 px-2 py-1 text-xs font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get points
                </button>
              </div>

              <div className="flex flex-row space-x-9">
                <div>
                  <label
                    htmlFor="startrank"
                    className="block text-sm font-medium leading-6 text-gray-900"
                    style={data.type === "0" ? { cursor: "not-allowed" } : {}}
                  >
                    initial coordinates:
                  </label>
                  <input
                    id="startrank"
                    name="startrank"
                    type="text"
                    value={data.startrank}
                    onChange={handleChange}
                    disabled={data.type === "0"}
                    placeholder=" X , Y  "
                    style={data.type === "0" ? { cursor: "not-allowed" } : {}}
                    className="block w-[185px] rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label
                    htmlFor="finalrank"
                    className="block text-sm font-medium leading-6 text-gray-900"
                    style={data.type === "0" ? { cursor: "not-allowed" } : {}}
                  >
                    final Coordinates:
                  </label>
                  <input
                    id="finalrank"
                    name="finalrank"
                    type="text"
                    value={data.finalrank}
                    onChange={handleChange}
                    placeholder=" X , Y  "
                    disabled={data.type === "0"}
                    style={data.type === "0" ? { cursor: "not-allowed" } : {}}
                    className="block w-[185px] rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-center items-center space-x-6">
              <button
                type="button"
                onClick={() => {
                  console.log(data);
                }}
                className=" w-28 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Preview
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-28 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* certificate upload */}
        <div className="pl-11">
          <h2 className="text-sm font-medium leading-6 text-gray-900 mt-2 flex">
            <span>Certificate:</span>
            <span className="ml-[570px]">size: min- 794 x 1123 pixels</span>
          </h2>
          <div className="w-[820px] h-[550px] mt-2 border-dashed border-2 border-green-400 bg-slate-100 flex justify-center items-center">
            {!data.imagelink && (
              <div className="flex justify-center items-center">
                <div className="text-center">
                  <div className="mt-4 text-sm flex justify-center items-center leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleImageUpload}
                      />
                    </label>
                    <p className="pl-1 ">
                      or{" "}
                      <span className="text-indigo-600 font-semibold">
                        drag and drop
                      </span>
                    </p>
                  </div>
                  <p className="text-xs leading-5 text-center  text-gray-600">
                    Upload JPG or JPEG upto 10MB
                  </p>
                  <p className="text-xs leading-5 text-gray-600">
                    Suggested Resolution 1280 x 720 or more
                  </p>
                  <p>
                    <img src={resolutiion} className="h-[200px] mt-7" alt="" />
                  </p>
                </div>
              </div>
            )}
            {data.imagelink && (
              <div
                id="image-container"
                className=" cursor-crosshair"
                style={{
                  position: "relative",
                  height: "550px",
                  width: "900px",
                }}
                onClick={handleMouseClick}
              >
                <img
                  className="object-left-top object-fill w-full h-full absolute cursor-crosshair"
                  src={data.imagelink}
                  alt="Uploaded Image"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Design;
