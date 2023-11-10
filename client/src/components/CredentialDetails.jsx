import Skeleton from "react-loading-skeleton";
import { BiCopyAlt, BiSolidCloudDownload } from "react-icons/bi";
import { FaTwitterSquare, FaLinkedin } from "react-icons/fa";

/* eslint-disable react/prop-types */
const CredentialDetails = ({
  isLoading,
  navigateToLinkedIn,
  navigateToTwitter,
  downloadImage,
  copyLink,
  credential,
}) => {
  return (
    <div className="w-full sm:w-screen lg:w-1/3 lg:max-w-screen-md h-full px-6 sm:mr-0 md:ml-0">
      <div className="w-full lg:max-w-md">
        <h1 className=" sm:text-2xl font-bold text-[24px]">
          {credential.title || <Skeleton height={32} />}
        </h1>
        <hr className=" my-2" />
        {isLoading ? (
          <div>
            <Skeleton height={144} />
          </div>
        ) : (
          <div>
            <p className=" mt-2 mb-2 font-medium">
              {"General information" || <Skeleton height={20} />}
            </p>
            <div className="list-disc space-y-2">
              <p>
                <span className=" font-semibold mr-2">Recipient:</span>
                <span>{credential.recipient}</span>
              </p>
              <p>
                <span className=" font-semibold mr-2">Description:</span>
                <span>{credential.description}</span>
              </p>
              <p>
                <span className=" font-semibold mr-2">Issue date:</span>
                <span>{credential.issueDate}</span>
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-md sm:max-w-full">
        <hr className=" my-2" />
        <p className=" mt-2 mb-4 font-medium">
          {isLoading ? <Skeleton /> : "Share and download your credential"}
        </p>
        <div className="flex flex-col gap-2 sm:max-w-full">
          {isLoading ? (
            <div>
              <Skeleton height={43} count={2} />
            </div>
          ) : (
            <div className="sm:flex sm:flex-row lg:flex-col sm:justify-between sm:items-center sm:space-x-2 lg:space-x-0 lg:space-y-2">
              <button
                onClick={navigateToLinkedIn}
                className="flex justify-center items-center gap-2 px-1 py-2 sm:w-1/2 lg:w-full w-full h-full text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-500 active:bg-indigo-700"
              >
                <FaLinkedin size="25px" />
                Add to LinkedIn Profile
              </button>

              <button
                onClick={navigateToTwitter}
                className="flex justify-center items-center gap-3 mt-2 sm:mt-0 px-1 py-2 sm:w-1/2 lg:w-full w-full h-full text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-500 active:bg-indigo-700"
              >
                <FaTwitterSquare size="25px" />
                <span>Share on Twitter</span>
              </button>
            </div>
          )}
          <div className="">
            {isLoading ? (
              <div className="flex gap-2 my-2">
                <Skeleton
                  height={43}
                  width="100%"
                  containerClassName="flex-1"
                />
                <Skeleton
                  height={43}
                  width="100%"
                  containerClassName="flex-1"
                />
              </div>
            ) : (
              <div className="flex gap-2 my-2">
                <button
                  onClick={downloadImage}
                  className="flex justify-center items-center space-x-2 w-full px-4 py-2  border rounded-lg duration-100 hover:border-indigo-600 active:shadow-lg"
                >
                  <span className="">
                    <BiSolidCloudDownload size="25px" />
                  </span>{" "}
                  <span>Download</span>
                </button>
                <button
                  onClick={() => {
                    copyLink();
                  }}
                  className=" flex justify-center items-center space-x-2 w-full px-4 py-2  border rounded-lg duration-100 hover:border-indigo-600 active:shadow-lg"
                >
                  <BiCopyAlt size="20px" /> <span>Copy Link</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CredentialDetails;
