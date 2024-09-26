import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";
import axios from "axios";

const Home = () => {
  const API_URL =
    "https://shopping-website-project.onrender.com/shoppingwebsite/allitems";

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [userItems, setUserItems] = useState([]);

  const getdata = async () => {
    try {
      const token = localStorage.getItem("token"); // Assuming the token is stored in local storage
      const response = await axios.get(
        "https://shopping-website-project.onrender.com/shoppingwebsite/test",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserItems(response.data.itemsPurchased || []);
    } catch (error) {
      console.error("Failed to fetch user items:", error);
    }
  };

  async function fetchProductData() {
    setLoading(true);

    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      const dataneededtorender = data.items;
      setPosts(dataneededtorender);
    } catch (error) {
      console.error("Error occurred:", error);
      setPosts([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProductData();
    getdata();
  }, []);

  return (
    <div className="bg-white w-[100vw]  h-[100%] ">
      {loading ? (
        <Spinner />
      ) : posts.length > 0 ? (
        <div className="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh]">
          {posts.map((post) => (
            <Product key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <p>No Data Found</p>
        </div>
      )}
    </div>
  );
};

export default Home;
