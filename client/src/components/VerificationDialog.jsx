import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useEffect, useState } from "react";
import ChangingProgressProvider from "./ChangingProgressProvider";

// eslint-disable-next-line react/prop-types, no-unused-vars
const VerificationDialog = ({ isOpen, onClose, title, recipient }) => {
  const [progressStarted, setProgressStarted] = useState({
    p1: false,
    p2: false,
    p3: false,
    p4: false,
  });

  useEffect(() => {
    if (isOpen) {
      // Set your progressStarted state and timers here.
      setProgressStarted({ ...progressStarted, p1: true });
      setTimeout(() => {
        setProgressStarted({
          ...progressStarted,
          p1: false,
          p2: true,
          p3: true,
        });
      }, 4000);
      setTimeout(() => {
        setProgressStarted({
          ...progressStarted,
          p2: true,
          p3: false,
          p4: true,
          p5: true,
        });
      }, 7000);
      setTimeout(() => {
        setProgressStarted({
          ...progressStarted,
          p2: true,
          p3: false,
          p4: true,
          p5: false,
          p6: true,
        });
      }, 10000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <div>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box ">
          <h3 className="font-bold text-lg mb-4 ">Credential verification</h3>
          {/* <p className="py-4">Press ESC key or click outside to close</p> */}

          <div className="flex flex-row mb-2">
            <div className="flex justify-center items-center flex-col">
              {progressStarted.p1 === true ? (
                <ChangingProgressProvider values={[0, 20, 64, 100]}>
                  {(percentage) => (
                    <CircularProgressbar
                      className="h-14"
                      value={percentage}
                      text={`${percentage}%`}
                      styles={buildStyles({
                        pathTransitionDuration: 1,
                        pathColor: `#4F46E5`,
                        textColor: "#4F46E5",
                      })}
                    />
                  )}
                </ChangingProgressProvider>
              ) : (
                <CircularProgressbar
                  className="h-14"
                  value="100"
                  text={`100%`}
                  styles={buildStyles({
                    pathColor: `#4F46E5`,
                    textColor: "#4F46E5",
                  })}
                />
              )}
              <hr
                className="rotate-90 border-[2px] sm:border-[3px] w-9 sm:w-7 flex mt-[12px]  sm:mt-[11px]"
                style={
                  progressStarted.p2 === false
                    ? { borderColor: "#D6D6D6" }
                    : { borderColor: "#4F46E5" }
                }
              />
            </div>

            <div className="flex-col  px-4 flex  justify-center items-start">
              <p className=" font-semibold  ">
                Verifying the recipient
              </p>
              <p
                className="text-sm text-gray-500 mt-1 "
                style={
                  progressStarted.p2 === true
                    ? { display: "block" }
                    : { visibility: "hidden" }
                }
              >
                The owner of this credential is {recipient}.
              </p>
            </div>
          </div>

          {/* 2nd */}
          <div className="flex flex-row mb-2">
            <div className="flex justify-center items-center flex-col">
              {progressStarted.p3 === true ? (
                <ChangingProgressProvider values={[0, 69, 100]}>
                  {(percentage) => (
                    <CircularProgressbar
                      className="h-14"
                      value={percentage}
                      text={`${percentage}%`}
                      styles={buildStyles({
                        pathTransitionDuration: 1,
                        pathColor: `#4F46E5`,
                        textColor: "#4F46E5",
                      })}
                    />
                  )}
                </ChangingProgressProvider>
              ) : (
                <CircularProgressbar
                  className="h-14"
                  value={progressStarted.p4 === true ? "100" : "0"}
                  text={progressStarted.p4 === true ? "100%" : "0%"}
                  styles={buildStyles({
                    pathColor: `#4F46E5`,
                    textColor: "#4F46E5",
                  })}
                />
              )}
              <hr
                className="rotate-90 border-[2px] sm:border-[3px] w-9 sm:w-7 flex  mt-[10px]  sm:mt-[11px]"
                style={
                  progressStarted.p4 === false
                    ? { borderColor: "#D6D6D6" }
                    : { borderColor: "#4F46E5" }
                }
              />
            </div>
            <div className="flex-col  px-4 flex  justify-center items-start">
              <p className=" font-semibold ">
                Verifying the issuer
              </p>
              <p
                className="text-sm text-gray-500 mt-2 "
                style={
                  progressStarted.p4 === true
                    ? { display: "block" }
                    : { visibility: "hidden" }
                }
              >
                The issuer of this credential is {title}
              </p>
            </div>
          </div>
          {/* 3 */}
          <div className="flex flex-row">
            <div className="">
              {progressStarted.p5 === true ? (
                <ChangingProgressProvider values={[0, 60, 98, 100]}>
                  {(percentage) => (
                    <CircularProgressbar
                      className="h-14"
                      value={percentage}
                      text={`${percentage}%`}
                      styles={buildStyles({
                        pathTransitionDuration: 0.8,
                        pathColor: `#4F46E5`,
                        textColor: "#4F46E5",
                      })}
                    />
                  )}
                </ChangingProgressProvider>
              ) : (
                <CircularProgressbar
                  className="h-14"
                  value={progressStarted.p6 === true ? "100" : "0"}
                  text={progressStarted.p6 === true ? "100%" : "0%"}
                  styles={buildStyles({
                    pathColor: `#4F46E5`,
                    textColor: "#4F46E5",
                  })}
                />
              )}
            </div>
            <div className="flex-col  px-4 flex  justify-center items-start">
              <p className="font-semibold  ">
                Verifying the credential&apos;s ID
              </p>
              <p
                className="text-sm mt-1  text-gray-500 "
                style={
                  progressStarted.p6 === true
                    ? { display: "block" }
                    : { visibility: "hidden" }
                }
              >
                The ID of this credential is unique and valid.
              </p>
            </div>
          </div>
          {progressStarted.p6 === true && (
            <div className="max-w-5xl mt-6">
              <div className="flex justify-between p-4 rounded-md  bg-green-50  border border-green-300">
                <div className="flex items-start gap-3 w-full">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 self-center">
                    <span className="text-green-600 font-medium">
                      This is the valid credential
                    </span>
                    <div className="text-green-600">
                      <p className="mt-2 sm:text-sm">
                        This credential was securely issued by CertiSure. All
                        the displayed information is valid.{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default VerificationDialog;
