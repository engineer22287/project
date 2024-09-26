import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import "./Cart.css";
import axios from "axios";
import { clearCart } from "../redux/Slices/CartSlice";
import { toast } from "react-hot-toast";

const Cart = () => {
  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cart.items);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [totalAmount, setTotalAmount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    // Calculate total amount whenever the cart changes
    const amount = cart.reduce((acc, curr) => acc + Math.floor(curr.price), 0);
    setTotalAmount(amount); // Set only the integer part
  }, [cart]);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      alert("You need to log in to checkout");
      return;
    }

    try {
      const res = await loadRazorpay();
      if (!res) {
        toast.error("Razorpay SDK failed to load. Are you online?");
        return;
      }

      // Create order on the server
      const orderResponse = await axios.post(
        "https://shopping-website-project.onrender.com/shoppingwebsite/capturepayment",
        {
          cart,
          email: user.email,
        }
      );

      if (orderResponse.status !== 200) {
        toast.error("Server error. Please try again.");
        return;
      }

      const { amount, currency, orderId } = orderResponse.data;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: "Shopping Website",
        description: "Test Transaction",
        order_id: orderId,
        handler: async function (response) {
          const paymentId = response.razorpay_payment_id;
          const orderId = response.razorpay_order_id;
          const signature = response.razorpay_signature;

          // Verify payment on the server
          const verificationResponse = await axios.post(
            "https://shopping-website-project.onrender.com/shoppingwebsite/verifysignature",
            {
              razorpay_order_id: orderId,
              razorpay_payment_id: paymentId,
              razorpay_signature: signature,
            }
          );

          if (verificationResponse.status === 200) {
            // Call the purchaseItem route to update the backend
            const purchaseResponse = await axios.post(
              "https://shopping-website-project.onrender.com/shoppingwebsite/purchaseitem",
              {
                email: user.email,
                cart,
              }
            );

            if (purchaseResponse.status === 200) {
              toast.success("Checkout successful!");
              dispatch(clearCart());
            } else {
              toast.error("Purchase failed. Please try again.");
            }
          } else {
            toast.error("Payment verification failed. Please try again.");
          }
        },
        prefill: {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Checkout error", error);
      toast.error("Checkout failed. Please try again.");
    }
  };

  return (
    <div className="w-[100vw] min-h-screen h-auto bg-white">
      {cart.length > 0 ? (
        <div className="maincart  ">
          <div className="flex justify-center leftside">
            <div>
              {cart.map((item, index) => (
                <CartItem key={item.id} item={item} itemIndex={index} />
              ))}
            </div>

            <div className="flex flex-col h-[80vh] rightpart">
              <div>
                <div className="mt-[4vw] ml-[1vw]">
                  <div className="text-[2vmax] text-green-600 font-semibold">
                    Your Cart
                  </div>
                  <div className="text-[3vmax] bold text-green-600 font-semibold">
                    SUMMARY
                  </div>
                  <p className="mt-[1vmax] font-bold text-[2vmax]">
                    <span>Total Items: {cart.length}</span>
                  </p>
                </div>

                <div className="border-t pt-[4vh] border-black ml-4 mt-[24vh] flex justify-center fixed m flex-col">
                  <p className="font-bold text-[1.7vmax] text-red-600">
                    Total Amount: {totalAmount} INR
                  </p>
                  <button
                    onClick={handleCheckout}
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-[1vmax] px-[1.1vmax] py-[1.1vmax] mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    CheckOut Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-screen">
          <h1 className="mb-10 text-4xl border-solid">Cart is Empty!</h1>
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

export default Cart;
