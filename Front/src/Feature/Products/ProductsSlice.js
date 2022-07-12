import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/product");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

let initialState = {
  loading: false,
  products: [],
  error: "",
};

const ProductSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: {
    [getProducts.pending]: (state, action) => {
      return {
        loading: true,
        products: [],
        error: "",
      };
    },
    [getProducts.fulfilled]: (state, action) => {
      return {
        loading: false,
        products: action.payload,
        error: "",
      };
    },
    [getProducts.rejected]: (state, action) => {
      return {
        loading: false,
        products: [],
        error: action.payload.message,
      };
    },
  },
});

export default ProductSlice.reducer;
