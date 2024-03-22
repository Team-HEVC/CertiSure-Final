import React, { memo } from "react";

const InputField = ({
  id,
  title,
  name,
  type,
  value,
  placeholder,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="mt-3 w-full">
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {title}:
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={disabled ? { cursor: "not-allowed" } : {}}
        disabled={disabled}
        className="block w-full rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
  );
};

const CertificateForm = ({
  data,
  handleChange,
  handleSubmit,
  updatePoints,
}) => {
  return (
    <div className="w-4/12 border-r-2 border-gray-200">
      <form onSubmit={handleSubmit} action="" className="p-4 -mt-1">
        {/* Group Name */}
        <InputField
          title="Group Name"
          id="groupname"
          name="groupname"
          type="text"
          value={data.groupname}
          onChange={handleChange}
          placeholder="Group Name"
        />
        {/* Font Name */}
        <InputField
          title="Font Name"
          id="fontname"
          name="fontname"
          type="text"
          value={data.fontname}
          onChange={handleChange}
          placeholder="Poppins, sans-serif"
        />
        {/* Name of Recipient */}
        <div className="mt-3">
          <div className="flex justify-between">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Recipient Name:
            </label>
            <button
              type="button"
              onClick={() => updatePoints("startname", "finalname")}
              className=" rounded-md bg-indigo-600 px-2 py-1 text-xs font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get points
            </button>
          </div>
          <div className="flex flex-row space-x-9 -mt-2">
            <InputField
              title="initial coordinates"
              id="startname"
              name="startname"
              type="text"
              value={data.startname}
              onChange={handleChange}
              placeholder=" X , Y "
            />
            <InputField
              title="final coordinates"
              id="finalname"
              name="finalname"
              type="text"
              value={data.finalname}
              onChange={handleChange}
              placeholder=" X , Y "
            />
          </div>
        </div>
        {/* Link of Certificate */}
        <div className="mt-3">
          <div className="flex justify-between">
            <label
              htmlFor="link"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Certificate Link:
            </label>
            <button
              type="button"
              onClick={() => updatePoints("startlink", "finallink")}
              className=" rounded-md bg-indigo-600 px-2 py-1 text-xs font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get points
            </button>
          </div>
          <div className="flex w-full space-x-10 -mt-2">
            <InputField
              title="initial coordinates"
              id="startlink"
              name="startlink"
              type="text"
              value={data.startlink}
              onChange={handleChange}
              placeholder=" X , Y  "
            />
            <InputField
              title="final coordinates"
              id="finallink"
              name="finallink"
              type="text"
              value={data.finallink}
              onChange={handleChange}
              placeholder=" X , Y "
            />
          </div>
        </div>
        {/* QR of Certificate */}
        <div className="mt-3">
          <div className="flex justify-between">
            <label
              htmlFor="qr"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Certificate QR:
            </label>
            <button
              type="button"
              onClick={() => updatePoints("startqr", "finalqr")}
              className=" rounded-md bg-indigo-600 px-2 py-1 text-xs font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get points
            </button>
          </div>

          <div className="flex flex-row space-x-9 -mt-2">
            <InputField
              title="initial coordinates"
              id="startqr"
              name="startqr"
              type="text"
              value={data.startqr}
              onChange={handleChange}
              placeholder=" X , Y  "
            />
            <InputField
              title="final coordinates"
              id="finalqr"
              name="finalqr"
              type="text"
              value={data.finalqr}
              onChange={handleChange}
              placeholder=" X , Y "
            />
          </div>
        </div>
        {/* Rank */}
        <div
          className={
            data.type === "0" ? "mt-5 opacity-60 cursor-not-allowed" : " mt-5"
          }
        >
          <div className="flex justify-between">
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
              onClick={() => updatePoints("startrank", "finalrank")}
              className="rounded-md bg-indigo-600 px-2 py-1 text-xs font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get points
            </button>
          </div>
          <div className="flex flex-row space-x-10 -mt-2">
            <InputField
              title="initial coordinates"
              id="startrank"
              name="startrank"
              type="text"
              value={data.startrank}
              onChange={handleChange}
              disabled={data.type === "0"}
              placeholder=" X , Y  "
            />
            <InputField
              title="final coordinates"
              id="finalrank"
              name="finalrank"
              type="text"
              value={data.finalrank}
              onChange={handleChange}
              disabled={data.type === "0"}
              placeholder=" X , Y "
            />
          </div>
        </div>
        <div className="mt-4 flex justify-center items-center space-x-6">
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
  );
};

export default memo(CertificateForm);
