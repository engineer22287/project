import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";
import { Link } from "react-router-dom";
import axios from "axios";

const MyItems = () => {
  const API_URL =
    "https://shopping-website-project.onrender.com/shoppingwebsite/test";

  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const [posts, setPosts] = useState([]);
  const [userItems, setUserItems] = useState([]);

  const getdata = async () => {
    try {
      console.log("Inside the user ki detail wala func");
      const token = localStorage.getItem("token"); // Assuming the token is stored in local storage
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("The items I got of the logged-in user is ");
      console.log(response.data.data);
      setUserItems(response.data.data || []);
      setPosts(response.data.data);
    } catch (error) {
      console.error("Failed to fetch user items:", error);
    } finally {
      setLoading(false); // Set loading to false after the data is fetched
    }
  };

  // Fetch data only on the first render
  useEffect(() => {
    getdata();
  }, []);

  let purchaseditem = true;

  return (
    <div className="bg-white w-[100vw] min-h-screen h-auto">
      {loading ? (
        <Spinner />
      ) : posts.length > 0 ? (
        <div className="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh]">
          {posts.map((post) => (
            <Product ispurchased={purchaseditem} key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-screen">
          <h1 className="mb-10 text-4xl border-solid">No Items Purchased !</h1>
          <Link to={"/home"}>
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-800 rounded-md group-hover:bg-opacity-0">
                Shop Now
              </span>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyItems;
