/* eslint-disable react/prop-types */
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const CredentialImage = ({ isLoading, openDialog, id, credential }) => {
  return (
    <div className="px-5 mb-5 lg:w-2/3">
      <div className="mx-w-screen-md max-h-50 h-full w-full py-2 border rounded-lg">
        <div className="flex justify-between px-2">
          {isLoading ? (
            <Skeleton containerClassName="flex-1" width={200} height={30} />
          ) : (
            <h1 className=" mt-2 mb-2 mx-2 font-medium">
              {credential.recipient}&apos;s certificate
            </h1>
          )}
          {isLoading ? (
            <div>
              <Skeleton containerClassName="flex-1 " width={70} height={30} />
            </div>
          ) : (
            <button
              onClick={() => {
                document.getElementById("my_modal_2").showModal();
                openDialog();
              }}
              className="px-2 py-1 mx-2 text-sm  duration-100 border rounded-lg active:bg-gray-100 hover:border-indigo-500 hover:text-indigo-600"
            >
              Verify
            </button>
          )}
        </div>
        <hr className="border-b-lg mt-2" />
        {isLoading ? (
          <div className="mx-3 my-2">
            <Skeleton className="h-80 md:h-[550px] lg:h-[650px]" />
          </div>
        ) : (
          <img
            className="max-w-full h-50 object-contain my-3 px-3"
            src={credential.link}
            alt="cert"
            loading="lazy"
          />
        )}
        <hr className="border-b-lg mt-2" />
        {isLoading ? (
          <div className="mx-2">
            <Skeleton containerClassName="flex-1" height={30} />
          </div>
        ) : (
          <div className="flex justify-start py-3 px-4 flex-col sm:justify-between sm:flex-row">
            <p>
              <span className=" text-sm font-semibold mr-1">
                Credential Id :
              </span>
              <span className="text-sm ">{id}</span>
            </p>
            <p className="mt-1">
              <span className=" text-sm font-semibold flex flex-row justify-start sm:justify-center items-center">
                Distributed By:
                <Link to="/">
                  <img
                    src="https://i.ibb.co/JdMdT4Z/1.png"
                    className="ml-2 h-5"
                    alt=""
                  />
                </Link>
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CredentialImage;
