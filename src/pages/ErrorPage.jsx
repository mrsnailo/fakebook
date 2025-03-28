import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import { GoRepoLocked } from "react-icons/go";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };
  const goBack = () => {
    navigate(-1);
  };
  const goToHelp = () => {
    navigate("/help");
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
        <div className="p-8 text-center max-w-md">
          <div className="flex justify-center text-6xl text-text mb-4">
            <GoRepoLocked />
          </div>
          <h1 className="text-2xl font-semibold text-accent">
            This content isn't available right now
          </h1>
          <p className="text-text mt-3">
            When this happens, it's usually because the owner only shared it
            with a small group of people, changed who can see it, or it's been
            deleted.
          </p>
          <button
            className="mt-5 px-6 py-3 bg-primary font-bold text-white rounded-md hover:bg-blue-700 transition"
            onClick={handleGoHome}
          >
            Go to news feed
          </button>
          <div className="navigation flex flex-col mt-4 gap-1 font-bold text-md ">
            <span
              onClick={goBack}
              className="text-primary p-2 block cursor-pointer"
            >
              {" "}
              Go Back
            </span>
            <span
              onClick={goToHelp}
              className="text-primary p-2 block cursor-pointer"
            >
              {" "}
              Visit help cenetr
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
