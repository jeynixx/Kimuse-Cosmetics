import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import Loader from "../../components/Loader";
import useAuthContext from "../../context/AuthContext";

export default function ProductEdit() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [listing, setListing] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [success, setSucces] = useState(false);
  const [error, setError] = useState([]);

  const navigate = useNavigate();

  const { user } = useAuthContext();

  const { id } = useParams();

  useEffect(() => {
    if (!user?.is_admin) {
      navigate("/access_denied");
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/products/${id}`);

        const responseData = response.data;
        setName(responseData.data.name);
        setDescription(responseData.data.description);
        setPrice(responseData.data.price);
        setQuantity(responseData.data.qty);
        setCategory(responseData.data.category);
        setListing(responseData.data.listing);
        setLoading(false);
      } catch (e) {
        if (e.response.status === 422) {
          setError(e.response.data.errors);
        }
        console.log(e);
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdate = async () => {
    const data = new FormData();

    data.append("name", name);
    data.append("description", description);
    data.append("price", price);
    data.append("qty", quantity);
    if (image) {
      data.append("image", image);
    }
    data.append("category", category);
    data.append("listing", listing);

    try {
      const response = await api.post(`/api/products/${id}/update`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 5000,
      });

      console.log(response.data);
      setSucces(true);
      setError([]);
    } catch (e) {
      setSucces(false);

      console.log(e);
      if (e.response.status === 422) {
        setError(e.response.data.errors);
      }
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/products/${id}`);
      setDeleting(false);
      navigate("/productsList");
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) {
    return (
      <div className=" flex h-screen justify-center items-center z-40">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="relative container-fluid">
        <div
          className={` ${
            deleting || success
              ? "absolute bg-purple-900 opacity-80 left-0 h-full w-full z-10"
              : "hidden"
          }`}
        ></div>
        <div className=" h-20"></div>
        <div className="relative container">
          <div className=" flex flex-col justify-between items-center">
            <h1 className="mb-4 text-purple-900">Edit Product</h1>

            <Link
              className=" no-underline text-white py-2 px-4 bg-purple-900 hover:bg-purple-500"
              to={"/productsList"}
            >
              <span className=" font-semibold">Back To Products</span>
            </Link>
          </div>
          <form className=" flex flex-col">
            <div className="mb-3">
              <label className=" pl-2 font-bold text-purple-900">Name</label>
              <input
                className={` focus:outline-none focus:ring focus:ring-purple-500 border-2  border-solid ${
                  error.name ? "border-red-700" : "border-purple-900"
                } px-2 py-2 text-lg w-full `}
                type="text"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError({ ...error, name: "" });
                }}
              />
              {error.name && (
                <p className="pl-3 border-3 font-semibold text-red-700 text-sm">
                  {error.name[0]}
                </p>
              )}
            </div>

            <div className="mb-3">
              <label className="text-purple-900"> Description:</label>

              <textarea
                className={` focus:outline-none focus:ring focus:ring-purple-500 border-2  border-solid ${
                  error.description ? "border-red-700" : "border-purple-900"
                } px-2 py-2 text-lg w-full `}
                type="text"
                name="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setError({ ...error, description: "" });
                }}
              />

              {error.description && (
                <p className="pl-3 border-3 font-semibold text-red-700 text-sm">
                  {error.description[0]}
                </p>
              )}
            </div>

            <div className="grid gap-3 grid-cols-1 md:grid-cols-4 mb-3">
              <div className=" flex flex-col">
                <label>Price: </label>
                <input
                  className={` focus:outline-none focus:ring focus:ring-purple-500 border-2  border-solid ${
                    error.price ? "border-red-700" : "border-purple-900"
                  } px-2 py-2 text-lg w-full `}
                  type="number"
                  name="price"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                    setError({ ...error, price: "" });
                  }}
                />
                {error.price && (
                  <p className="pl-3 border-3 font-semibold text-red-700 text-sm">
                    {error.price[0]}
                  </p>
                )}
              </div>

              <div className=" flex flex-col">
                <label>Quantity: </label>
                <input
                  className={` focus:outline-none focus:ring focus:ring-purple-500 border-2  border-solid ${
                    error.qty ? "border-red-700" : "border-purple-900"
                  } px-2 py-2 text-lg w-full `}
                  type="number"
                  name="quantity"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                    setError({ ...error, qty: "" });
                  }}
                />
                {error.price && (
                  <p className="pl-3 border-3 font-semibold text-red-700 text-sm">
                    {error.quantity[0]}
                  </p>
                )}
              </div>

              <div className=" flex flex-col">
                <label htmlFor="category">Category: </label>
                <select
                  className={` focus:outline-none focus:ring focus:ring-purple-500 border-2  border-solid ${
                    error.category ? "border-red-700" : "border-purple-900"
                  } px-2 py-2 text-lg w-full `}
                  name="category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setError({ ...error, category: "" });
                  }}
                >
                  <option value="All">All</option>
                  <option value="Mens">Tools</option>
                  <option value="Womens">Makeup</option>
                </select>
                {error.category && (
                  <p className="pl-3 border-3 font-semibold text-red-700 text-sm">
                    {error.category[0]}
                  </p>
                )}
              </div>
              <div className=" flex flex-col">
                <label htmlFor="listing">Listing: </label>
                <select
                  className={` focus:outline-none focus:ring focus:ring-purple-500 border-2  border-solid ${
                    error.listing ? "border-red-700" : "border-purple-900"
                  } px-2 py-2 text-lg w-full `}
                  name="listing"
                  value={listing}
                  onChange={(e) => {
                    setListing(e.target.value);
                    setError({ ...error, listing: "" });
                  }}
                >
                  <option value="New">New</option>
                  <option value="Featured">Featured</option>
                  <option value="Best">Best</option>
                  <option value="None">None</option>
                </select>
                {error.listing && (
                  <p className="pl-3 border-3 font-semibold text-red-700 text-sm">
                    {error.listing[0]}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-3 flex flex-col justify-center">
              <div className=" flex flex-col mb-3 ">
                <label>Image: </label>
                <input
                  className={` focus:outline-none focus:ring focus:ring-purple-500 border-2  border-solid ${
                    error.listing ? "border-red-700" : "border-purple-900"
                  } px-2 py-2 text-lg w-full `}
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    setError({ ...error, image: "" });
                  }}
                />
                {error.image && (
                  <p className="pl-3 border-3 font-semibold text-red-700 text-sm">
                    {error.image[0]}
                  </p>
                )}
              </div>

              <div className=" border-solid border-purple-900 border-2  p-3">
                <p className=" font-bold text-purple-900">Image Preview</p>
                <div className="flex justify-center">
                  {image && (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Product Image Preview"
                      style={{ maxWidth: "300px", maxHeight: "300px" }}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                className="px-4 py-2 bg-purple-900 text-white hover:bg-purple-500 mx-2 hover:opacity-80"
                type="button"
                onClick={handleUpdate}
              >
                Update
              </button>

              {user?.is_admin && (
                <>
                  <button
                    className="px-4 py-2 bg-red-700 text-white hover:font-bold border-solid hover:bg-red-900 mx-2"
                    type="button"
                    onClick={() => setDeleting(true)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </form>

          {deleting && (
            <div className="fixed h-full inset-0 flex items-center justify-center z-20">
              <div className=" bg-white p-5 flex flex-col items-center border-solid border-purple-900 border-2">
                <h2 className="text-purple-900 mb-3">
                  Are you sure you want to delete this product?
                </h2>
                <div>
                  <button
                    className="mx-2 px-4 py-2 border-solid bg-purple-900 border-2 font-semibold hover:bg-purple-500 text-white"
                    type="button"
                    onClick={handleDelete}
                  >
                    Yes
                  </button>
                  <button
                    className="mx-2 px-4 py-2 border-solid border-purple-900 border-2 font-semibold hover:bg-purple-900 hover:text-white"
                    type="button"
                    onClick={() => setDeleting(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
          {success && (
            <div className="fixed h-full inset-0 flex items-center justify-center z-20">
              <div className=" bg-white p-5 flex flex-col items-center border-solid border-purple-900 border-2">
                <h2 className=" mb-3">Updated Succesfully...</h2>
                <button
                  className="mx-2 px-4 py-2 border-solid bg-purple-900 border-2 font-semibold hover:bg-purple-500 text-white"
                  type="button"
                  onClick={() => navigate("/productsList")}
                >
                  Ok
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="h-20"></div>
      </div>
    </>
  );
}
