import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DialogBox1 = () => {
  const navigate = useNavigate();
  const [modalData, setModalData] = useState({
    organizationid: "",
    issuer: "",
    groupname: "",
  });

  const handleChange = (e) => {
    setModalData({ ...modalData, [e.target.name]: e.target.value });
  };

  const sendData = () => {
    if (modalData.issuer != "" && modalData.groupname != "") {
      navigate(
        `/dashboard/design?param1=${modalData.issuer}&param2=${modalData.groupname}&param3=${modalData.organizationid}`
      );
    } else {
      alert("Data is missing");
    }
  };
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-center">Create Group</h3>
        <div className="modal-action block mt-2 ">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <div className="">
              <label
                htmlFor="organizationid"
                className="block text-base font-medium leading-6 text-gray-900"
              >
                Organization Id:
              </label>
              <div className="mt-1">
                <input
                  id="organizationid"
                  name="organizationid"
                  type="organizationid"
                  value={modalData.organizationid}
                  onChange={handleChange}
                  placeholder="Enter your organization ID"
                  className="block w-full rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-300 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className=" mt-5">
              <label
                htmlFor="issuer"
                className="block text-base font-medium leading-6 text-gray-900"
              >
                Issuer:
              </label>
              <div className="mt-1">
                <input
                  id="issuer"
                  name="issuer"
                  type="issuer"
                  value={modalData.issuer}
                  onChange={handleChange}
                  placeholder="Enter the issuer name"
                  className="block w-full rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-300 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="mt-5">
              <label
                htmlFor="groupname"
                className="block text-base font-medium leading-6 text-gray-900"
              >
                Group Name:
              </label>
              <div className="mt-1">
                <input
                  id="groupname"
                  name="groupname"
                  type="groupname"
                  value={modalData.groupname}
                  onChange={handleChange}
                  placeholder="Enter your group name"
                  className="block w-full rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-300 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="mt-5 flex justify-center items-center space-x-5">
              <button
                type="button"
                onClick={() => {
                  setModalData({
                    organizationid: "",
                    issuer: "",
                    groupname: "",
                  });
                }}
                className=" w-28 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => {
                  sendData();
                }}
                className=" w-28 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default DialogBox1;
