import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/templateslice";
import authReducer from "./features/cart/authslice";
export const store = configureStore({
  reducer: {
    template: cartReducer,
    auth: authReducer,
  },
});
