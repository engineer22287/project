import { FcDeleteDatabase } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { remove } from "../redux/Slices/CartSlice";
import { toast } from "react-hot-toast";
import { MdDelete } from "react-icons/md";

const CartItem = ({ item, itemIndex }) => {
  const dispatch = useDispatch();

  const removeFromCart = () => {
    dispatch(remove(item.id));
    toast.success("Item Removed");
  };
  const integerPrice = Math.floor(item.price);

  return (
    <div className=" flex flex border-b-[0.3vw] mt-[5vh]  border-black ">
      <div className="flex ">
        <div className="h-[20vw] w-[18vw]  mb-[4vh] mr-6 ">
          <img src={item.image} className="h-[18vw] w-[15vw] " />
        </div>
        <div className="ml-[4vw]">
          <h1 className="text-[2.5vmax] w-[40vw] ">{item.title}</h1>
          <h1 className="text-sm w-[38vw] mt-[1vw] ">
            {/* {item.description.split(" ").slice(0, 10).join(" ") + "..."} */}
          </h1>
          <div className=" flex justify-between mt-[5vh]  ">
            <p className="text-green-600  text-[2.5vmax] font-semibold">
              {" "}
              {`INR${integerPrice}`}
            </p>
            <div
              onClick={removeFromCart}
              className=" text-[2.9vmax] mr-5  text-black hover:text-red-800"
            >
              <MdDelete />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
