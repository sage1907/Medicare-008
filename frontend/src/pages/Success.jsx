import React from "react";
import { Link, useLocation } from "react-router-dom";

const Success = () => {
  const { state } = useLocation();

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <svg
          className="mx-auto h-16 w-16 text-green-500 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
        <p className="text-lg text-gray-600 mb-6">
          Your feedback has been successfully submitted.
          {state?.email && (
            <span className="block mt-2">
              We'll get back to you at <strong>{state.email}</strong> soon.
            </span>
          )}
        </p>
        <Link
          to="/"
          className="inline-block bg-primaryColor text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#0052CC] transition duration-300 ease-in-out"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default Success;