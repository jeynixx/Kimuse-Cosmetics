import React from "react";
import { Link } from "react-router-dom";

export default function EmailVerified() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-6xl font-bold text-purple-900">
          Your Email is Verified
        </h1>
        <p className="text-gray-700 mb-8">
          Proceed to login. Click the Button below
        </p>
        <Link
          to="/login"
          className="bg-purple-900 hover:bg-purple-700 text-white py-3 px-8"
        >
          LOGIN
        </Link>
      </div>
    </>
  );
}
