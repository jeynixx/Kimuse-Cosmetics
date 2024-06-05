import { useEffect, useState } from "react";
import api from "../api/axios";
import Crad from "../components/Crad";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function ProductWomens() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/api/products");
        const responseData = response.data;
        setProducts(responseData.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <>
      <div className=" h-32"></div>
      <div className="container h-screen">
        <div className="mb-5">
          <BackButton />
        </div>
        <section className="mb-5">
          <div className=" mb-5">
            <h2 className="font-semibold text-purple-900">MAKEUP</h2>
            <p>Browse for 
              <span> </span>
              <Link to={"/mens"} className="text-purple-900">
                <span className=" underline hover:font-semibold hover:text-purple-500">beauty tools</span>
              </Link>
              .
            </p>
          </div>
          {products.length === 0 && <p>No products to display.</p>}
          <div className="grid gap-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products
              .filter(
                (product) =>
                  product.category.includes("Makeup") ||
                  product.category.includes("All")
              )
              .map((product) => (
                <Crad
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  category={product.category}
                  listing={product.listing}
                  image={`http://localhost:8000${product.image}`}
                  price={product.price}
                />
              ))}
          </div>
        </section>
      </div>
    </>
  );
}
