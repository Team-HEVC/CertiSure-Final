/* eslint-disable react/prop-types */
const DeleteCard = ({ title, deleteGroup, id }) => {
  return (
    <dialog id={`${id}`} className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
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
          Deleting a group with its certificate removes all traces, ensuring a
          clean, comprehensive deletion from the system. <br />
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
  );
};

export default DeleteCard;
