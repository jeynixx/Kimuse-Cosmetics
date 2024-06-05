import { Link } from "react-router-dom";

export default function AccessDenied() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-purple-900">ADMIN ONLY!</h1>
      <p className="text-purple-900 mb-8">
        Sorry, you do not have an access for this page.
      </p>
      <Link to="/" className="bg-purple-900 hover:bg-purple-300 text-white py-3 px-8">
        Go back home
      </Link>
    </div>
  );
}
