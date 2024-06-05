import { useEffect, useState } from "react";
import useAuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";
import api from "../../api/axios"; // Ensure you import the api module

export default function Account() {
  const { user } = useAuthContext();
  const [isApplying, setIsApplying] = useState(false);

  const handleApplyAsAdmin = async () => {
    try {
      setIsApplying(true);
      // Simulate API call to apply as admin
      await api.post("/api/apply-admin", { userId: user.id });
      alert("Application to become an admin has been submitted.");
    } catch (error) {
      console.error("Failed to apply as admin:", error);
      alert("There was an error submitting your application. Please try again later.");
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <>
      <div className="h-20"></div>

      <div className="md:container mx-auto mb-3 h-screen lg:p-5 p-1">
        <div className="border-solid border-purple-900 border-2 p-5 h-3/4">
          <div className="flex items-center justify-center mb-3">
            <div className="h-36 w-36 relative rounded-full overflow-hidden border-solid border-2 border-purple-900 shadow">
              <img
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="/images/logo.png"
                alt="Kimuse"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center mb-5">
            <h2 className="uppercase font-extrabold text-purple-900 m-0">
              {user?.name}
            </h2>
            <p className="text-purple-300">{user?.email}</p>
          </div>
          <div className="flex justify-center items-center mb-5">
            <div className="grid lg:grid-cols-3 gap-5 text-center">
              <Link
                className="no-underline uppercase text-2xl font-semibold text-purple-900"
                to={"/edit"}
              >
                <span className="hover:text-purple-500 text-purple-900"> Edit Profile</span>
              </Link>
              <Link
                className="no-underline uppercase text-2xl font-semibold hover:text-purple-500 text-purple-900"
                to={"/cart"}
              >
                <span>Cart</span>
              </Link>
              <Link
                className="no-underline uppercase text-2xl font-semibold hover:text-purple-500 text-purple-900"
                to={"/order"}
              >
                <span>Orders</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
