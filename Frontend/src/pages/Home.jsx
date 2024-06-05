import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link, useLocation } from "react-router-dom";
import Crad from "../components/Crad";
import Slider from "../components/Slider";
import SliderListing from "../components/SliderListing";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isMdScreen, setIsMdScreen] = useState(false);
  const location = useLocation();
  const [message, setMessage] = useState(location?.state?.message);
  const [timeoutId, setTimeoutId] = useState(null);
  const [shuffledProducts, setShuffledProducts] = useState([]);

  useEffect(() => {
    if (message) {
      const id = setTimeout(() => {
        setMessage(null);
      }, 3000);
      setTimeoutId(id);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message]);

  const handleRemoveMessage = () => {
    setMessage(null);
    clearTimeout(timeoutId);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    setIsMdScreen(mediaQuery.matches);

    const handleMediaQueryChange = (e) => {
      setIsMdScreen(e.matches);
    };

    mediaQuery.addListener(handleMediaQueryChange);
    return () => mediaQuery.removeListener(handleMediaQueryChange);
  }, []);
  const myStyle = {
    /*  backgroundImage: isMdScreen
      ? "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url('ezgif.com-webp-to-jpg (2).jpg')"
      : "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0.3)), url('ezgif.com-webp-to-jpg (3).jpg')", */
    height: "screen",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: isMdScreen ? " top " : "top",
  };

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

  const videoMdUrl = "/videos/videoMd.mp4";
  const videoLgUrl = "/videos/videoLg.mp4";

  return (
    <>
      <div className=" h-16"></div>
      <div className="relative">
        {message && (
          <div className=" absolute mx-auto bg-purple-200 text-purple-900 p-2 mb-4 flex justify-between items-center z-30 inset-x-0">
            <div className="font-bold">{message}</div>
            <button
              className="ml-2 px-2 py-1 rounded"
              onClick={handleRemoveMessage}
            >
              X
            </button>
          </div>
        )}
      </div>
      <section className=" h-[500px] md:h-[900px] lg:h-screen">
        <div
          className=" h-full transform transition-transform ease-in-out duration-500 bg-fixed relative border-2 border-solid border-purple-300"
          style={{ ...myStyle }}
        >
          {isMdScreen && (
            <video
              autoPlay
              loop
              muted
              className="absolute object-cover h-full w-full"
            >
              <source src={videoLgUrl} type="video/mp4" />
              {/* Add additional source tags if you want to support different video formats */}
            </video>
          )}

          {!isMdScreen && (
            <video
              autoPlay
              loop
              muted
              className="absolute object-cover h-full w-full"
            >
              <source src={videoMdUrl} type="video/mp4" />
              {/* Add additional source tags if you want to support different video formats */}
            </video>
          )}
          <div className="absolute w-full h-full">
            <div className=" container md:mx-auto h-full lg:pl-10 flex items-center relative">
              <div className="lg:static transform transition-transform ease-in-out duration-500 absolute lg:left-10 md:bottom-10 left-5 md:left-0 bottom-0 ">
                <p>
                  
                  <br></br>
                  
                  <br></br>
                  
                  <br></br>
                  
                  <br></br>
                  
                  <br></br>
                  
                  <br></br>
                  
                  <br></br>
                  
                  <br></br>
                  
                  <br></br>
                  
                  <br></br>
                  
                  <br></br>
                  
                  <br></br>
                  
                  <br></br>
                  
                  <br></br>
                  
                  <br></br>
                  
                  <br></br>
                </p>
                <h1 className=" font-extrabold text-3xl text-purple-700 m-0 ">
                  Kimuse Cosmetics: Unleash Your Inner Glow
                </h1>
                <p className=" text-base text-purple-700 mb-3">
                Unlock the Secret to Timeless Beauty
                <br></br>
                At Kimuse Cosmetics, we believe that beauty is an expression of your true self. <br></br>
                Our products are designed to enhance your natural radiance, <br></br>empowering you to feel confident and beautiful every day.
                </p>
                <div className=" flex flex-col">
                  <Link className=" no-underline text-white" to={"/mens"}>
                    <button className="flex items-center gap-2 mb-4  bg-purple-300 hover:text-purple-700  font-bold px-4 py-1 text-lg uppercase outline outline-2 outline-purple-200 outline-offset-4 hover:outline-purple-900">
                      <span>BEAUTY TOOLS</span>
                      <ArrowLongRightIcon className="h-6 w-6 " />
                    </button>
                  </Link>
                  <Link
                    className=" no-underline text-white w-auto"
                    to={"/womens"}
                  >
                    <button className="flex items-center gap-2 mb-4  bg-purple-300  hover:text-purple-700  font-bold px-4 py-1 text-lg uppercase outline outline-2 outline-purple-200 outline-offset-4 hover:outline-purple-900">
                      <span>MAKEUP</span>
                      <ArrowLongRightIcon className="h-6 w-6 " />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br />
      <br />

      <div className="container  whitespace-nowrap overflow-x-auto scroll-behavior-smooth text-purple-900">
        <Slider
          link={"/product"}
          productData={products}
          title={"BROWSE PRODUCTS"}
        />
        <SliderListing
          listings={"New"}
          link={"/newProducts"}
          productData={products}
          title={"NEW PRODUCTS"}
        />
        <section className="mb-5 flex flex-col items-center">
          <h2 className="mb-3">Best Products</h2>
          <div className="grid gap grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products
              .filter((product) =>
                product.listing.toLowerCase().includes("best")
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
