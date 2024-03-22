import { AiFillDelete } from "react-icons/ai";
import { HiViewList } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { memo } from "react";

const Card = ({ image, title, id, deleteGroup }) => {
  const navigate = useNavigate();
  return (
    <div className="rounded-lg min-w-[250px] sm:w-[47%] lg:w-[47%] xl:w-[30%]  border-2 ">
      <figure className="bg-[#F0F0F0] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[300px] 3xl:h-[450px] ">
        <img
          className="p-5 lg:p-7 2xl:p-8 w-full h-full object-fill"
          src={image}
          alt="Shoes"
        />
      </figure>
      <div className="flex flex-col justify-center">
        <div className="flex justify-start items-center">
          <h2 className=" font-semibold pl-4 py-4 text-xl text-left">
            {title.toUpperCase()}
          </h2>
        </div>
        <div className="flex text-sm py-1 text-[#000000D9] bg-[#FAFAFA]">
          <div
            onClick={() => {
              navigate(`/dashboard/credentials/${id}`);
            }}
            className="flex py-1 cursor-pointer justify-center items-center w-[50%]"
          >
            <HiViewList />
            <p>View Credentials</p>
          </div>
          <div
            onClick={() => {
              document.getElementById(`${id}`).showModal();
            }}
            className="flex justify-center items-center w-[50%] cursor-pointer"
          >
            <AiFillDelete />
            <p>Delete</p>
          </div>
          <dialog id={id} className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="flex w-full gap-3 justify-start items-center font-bold text-lg">
                <div className="flex items-center justify-center flex-none w-12 h-12 bg-red-100 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-red-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                Delete group with Certificate ?
              </h3>
              <p className="py-4 leading-relaxed mt-1">
                Deleting a group with its certificate removes all traces,
                ensuring a clean, comprehensive deletion from the system. <br />
                <br />
                Group ID: {id}
                <br /> GroupName: {title}
              </p>
              <div className="items-center gap-2 sm:flex">
                <button
                  onClick={() => {
                    deleteGroup(id, "true");
                  }}
                  className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md ring-offset-2 ring-red-600 focus:outline-none"
                >
                  Delete Group with Certificate
                </button>
                <button
                  onClick={() => {
                    deleteGroup(id, "false");
                  }}
                  className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md border ring-offset-2 ring-indigo-600 focus:outline-none"
                >
                  Delete Group
                </button>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default memo(Card);
