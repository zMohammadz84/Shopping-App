import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    total: 0,
  },
  reducers: {
    AddToCart: (state, action) => {
      const selectProduct = action.payload;
      const index = state.cart.findIndex((p) => p._id === selectProduct._id);
      if (index === -1) {
        state.cart = [...state.cart, { ...selectProduct, quantity: 1 }];
        state.total += selectProduct.offPrice;
      } else {
        state.cart[index].quantity++;
        state.total += selectProduct.offPrice;
      }
    },
    RemoveProduct: (state, action) => {
      const selectProduct = action.payload;
      const index = state.cart.findIndex((p) => p._id === selectProduct._id);

      if (state.cart[index].quantity === 1) {
        const filterProduct = state.cart.filter(
          (p) => p._id !== selectProduct._id
        );

        state.cart = [...filterProduct];
        state.total -= selectProduct.offPrice;
      } else {
        state.cart[index].quantity--;
        state.total -= selectProduct.offPrice;
      }
    },
  },
});

export const { AddToCart, RemoveProduct } = CartSlice.actions;

export default CartSlice.reducer;
