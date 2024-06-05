import { Link } from "react-router-dom";
import api from "../../api/axios";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import {
  ClipboardDocumentCheckIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/20/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons"; // Example icon for cosmetics

export default function Dashboard() {
  const [userCount, setUserCount] = useState("");
  const [adminCount, setAdminCount] = useState("");
  const [productCount, setProductCount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const userResult = await api.get("/api/user/count");
      setUserCount(userResult.data.userCount);
      setAdminCount(userResult.data.adminCount);

      const productResult = await api.get("/api/product/count");
      setProductCount(productResult.data.count);

      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className=" flex h-screen justify-center items-center z-40">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className=" h-20"></div>
      <div className="container h-full">
        <div className=" mb-3 h-screen text-purple-900 font-bold">
          <h2 className="pt-10 p-4">Dashboard</h2>

          <div className="grid md:grid-cols-2 gap-8 align-middle">
            <div className="flex items-center justify-center py-6 px-4 border-solid border-purple-900 border-2">
              <UsersIcon className="h-20 inline-block" />Users: {userCount}
            </div>
            <div className="flex items-center justify-center py-6 px-4 border-solid border-purple-900 border-2 text-purple-900">
              <UserIcon className="h-20 inline-block" />
              Admins: {adminCount}
            </div>
            <div className="flex items-center justify-center py-6 px-4 border-solid border-purple-900 border-2">
              <FontAwesomeIcon icon={faShoppingBag} className="h-20 inline-block pr-4" />
              <Link to="/productsList" className="text-purple-900 hover:text-purple-500">
                 Products: {productCount}
              </Link>
            </div>
            <div className="flex items-center justify-center py-6 px-4 border-solid border-purple-900 border-2">
              <ClipboardDocumentCheckIcon className="h-20 inline-block" />
              <Link to="/ordersList" className="text-purple-900 hover:text-purple-500">
                ORDERS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
