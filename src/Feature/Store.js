import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./Cart/CartSlice";
import ProductsReducer from "./Products/ProductsSlice";
import SignupOrLoginReducer from "./SignupOrLogin/SignupOrLogin";

export const Store = configureStore({
  reducer: {
    products: ProductsReducer,
    cart: CartReducer,
    signupOrLogin: SignupOrLoginReducer,
  },
});
