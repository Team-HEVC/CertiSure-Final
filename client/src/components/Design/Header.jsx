import { memo } from "react";

const Header = ({ handleChange, changeCertificate, issuer }) => {
  return (
    <div className="h-14 rounded-lg bg-white flex relative">
      <div className="flex justify-center items-center flex-row mx-5">
        <div className="block text-md font-medium leading-6 text-gray-900">
          Design:
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
            <option value="default">Customize</option>
            <option value="template1">CS50 template</option>
          </select>
        </div>
      </div>
      <div className="flex justify-center items-center flex-row ml-60">
        <div className="block text-md font-medium leading-6 text-gray-900">
          Certificate Type:{" "}
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
            <option value={0}>Participation</option>
            <option value={1}>Winners</option>
          </select>
        </div>
      </div>

      <div className=" text-md font-medium leading-6 text-gray-900 absolute right-8 top-4 ">
        <p>issued by {issuer}</p>
      </div>
    </div>
  );
};

export default memo(Header);
