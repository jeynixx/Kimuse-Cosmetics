import { Link } from "react-router-dom";

export default function ThankYou() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-purple-900">Thank You</h1>
      <p className="text-purple-500 mb-8">
        Your order has been placed successfully..
      </p>
      <Link to="/" className="bg-purple-900 hover:bg-purple-500 text-white py-3 px-8">
        Go back home
      </Link>
    </div>
  );
}
