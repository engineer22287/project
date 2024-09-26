import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Slices/CartSlice"; // Adjust path based on your actual directory structure
import authReducer from "./Slices/AuthSlice"; // Example name, adjust as per your slice file

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer, // Ensure this matches your slice name
    // Add other reducers as needed
  },
});
