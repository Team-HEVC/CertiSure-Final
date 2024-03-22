import React from "react";
import { Link, useLocation } from "react-router-dom";

const Error = () => {
  const { state } = useLocation();
  const { statusCode } = state || {};
  let title, msg;
  if (statusCode) {
    if (statusCode === 500) {
      title = "Internal Server Error";
      msg =
        "An unexpected error occurred while trying to process your request. Please try again later. If the problem persists, contact our support team.";
    } else if (statusCode === 502) {
      title = "Bad Gateway";
      msg =
        "The server received an invalid response from the upstream server while processing your request. Please try again later.";
    } else if (statusCode === 403) {
      title = "Forbidden";
      msg =
        "You don't have permission to access this resource. Please contact the administrator for more information.";
    } else if (statusCode === 404) {
      title = "Page Not Found";
      msg =
        "Sorry, we couldn't find this page. But don't worry, you can find plenty of other things on our homepage.";
    } else {
      title = "Something went wrong";
      msg =
        "An unexpected error occurred while trying to process your request. Please try again later. If the problem persists, contact our support team.";
    }
  }
  return (
    <section className="flex items-center h-screen p-16">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
            <span className="sr-only">Error</span>
            {statusCode || "404"}
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            {title || "Sorry, we couldn't find this page."}
          </p>
          <p className="mt-4 mb-8 dark:text-gray-400">
            {msg ||
              "But don't worry, you can find plenty of other things on our homepage."}
          </p>
          <Link
            to="/"
            className="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Error;
