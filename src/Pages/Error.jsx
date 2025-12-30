// src/pages/NotFound.js
import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center px-4">
      <div className="max-w-md">
        {/* Illustration */}
        <div className="flex justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-40 h-40 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {/* You can replace this SVG with an illustration/image */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>

        {/* Text */}
        <h1 className="text-5xl font-bold text-gray-800">404</h1>
        <p className="mt-2 text-lg text-gray-600">Oops... Page Not Found</p>

        {/* Back to Home Button */}
        <div className="mt-6">
          <a
            href="/"
            className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
