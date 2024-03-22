import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import resolution from "../assets/base.png";
import API from "../Axios";
import { cartTemplate } from "../Data";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import Header from "../components/Design/Header";
import CertificateForm from "../components/Design/CertificateForm";

const Design = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [points, setPoints] = useState({ ox: 0, oy: 0, rx: 0, ry: 0 });
  const [temp, setTemp] = useState({ sx: 0, sy: 0, ex: 0, ey: 0 });
  const isDrawing = useRef(false);
  const startCoords = useRef({ x: 0, y: 0 });
  const endCoords = useRef({ x: 0, y: 0 });
  const myEmail = localStorage.getItem("user");
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
      console.log("data", data);
      const response = await API.post("/create_group", data, {
        headers: { Authorization: localStorage.getItem("access_token") },
      });
      console.log(response);
      toast.success("Group successfully created!");
      navigate("/dashboard/groups");
    } catch (err) {
      toast.error("Sorry, there was an issue while creating the group.");
      console.log(err);
      if (err.response.status === 401) {
        navigator("/login");
      }
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
    setData({ ...data, ...cartTemplate[name] });
    setPoints({ ...points, ...cartTemplate[`${name}Points`] });
    console.log(data, points);
    if (name === "default") {
      setIsLoaded(false);
    } else {
      setIsLoaded(true);
    }
  };

  const handleChange = useCallback(
    (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
    },
    [data]
  );

  const updatePoints = useCallback(
    (startKey, endKey) => {
      setData((prevData) => ({
        ...prevData,
        [startKey]: `${temp.sx},${temp.sy}`,
        [endKey]: `${temp.ex},${temp.ey}`,
      }));
    },
    [temp]
  );
  const handleImageUpload = (e) => {
    e.preventDefault();
    setIsLoading(true);
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
        console.log(response);
        if (response.status === 200) {
          const imageUrl = response.data.data.url;
          const image = new Image();
          image.src = imageUrl;
          image.onload = () => {
            setData({ ...data, imagelink: imageUrl });
            setIsLoaded(true);
          };
          toast.success("Image Uploaded Successfully!");
        } else {
          toast.error("Sorry, there was an issue while uploading image.");
        }
      } catch (error) {
        toast.error("Sorry, there was an issue while uploading image.");
      }
    }
    uploadImage();
    const file = e.target.files[0];
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const renderSize = {
          width: img.width,
          height: img.height,
        };
        setPoints({ ...points, ox: img.width, oy: img.height });
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
    }
  }, [data.imagelink]);

  return (
    <div className="flex flex-col px-24 pt-4 gap-4 bg-[#F0F2F5]">
      <Header
        handleChange={handleChange}
        changeCertificate={changeCertificate}
        issuer={data.issuer}
      />
      <div className="bg-white h-[630px] flex flex-row rounded-lg mb-5">
        <CertificateForm
          data={data}
          handleChange={handleChange}
          updatePoints={updatePoints}
          handleSubmit={handleSubmit}
        />
        {/* certificate upload */}
        <div className="px-8 py-2">
          <h2 className="text-sm font-medium leading-6 text-gray-900 mt-2 flex">
            <span>Certificate:</span>
          </h2>
          <div className="w-[820px] h-[550px] mt-2 border-dashed border-2 border-green-400 bg-slate-100 flex justify-center items-center">
            {!isLoading ? (
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
                      or
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
                    <img src={resolution} className="h-48 mt-7" alt="" />
                  </p>
                </div>
              </div>
            ) : (
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
                {!isLoaded ? (
                  <Skeleton className="h-full" />
                ) : (
                  <img
                    className="object-left-top object-fill w-full h-full absolute cursor-crosshair"
                    src={data.imagelink}
                    alt="Uploaded Image"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Design;
