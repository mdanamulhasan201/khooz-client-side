import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const add_to_cart = createAsyncThunk(
  "cart/add_to_cart",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/home/product/add-to-cart", info);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_cart_products = createAsyncThunk(
  "cart/get_cart_products",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/product/get-cart-products/${userId}`
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const delete_cart_product = createAsyncThunk(
  "cart/delete_cart_product",
  async (cartId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(
        `/home/product/delete-cart-product/${cartId}`
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const quantity_increment = createAsyncThunk(
  "cart/quantity_increment",
  async (cartId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(
        `/home/product/quantity-increment/${cartId}`
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const quantity_decrement = createAsyncThunk(
  "cart/quantity_decrement",
  async (cartId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(
        `/home/product/quantity-decrement/${cartId}`
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// wishlist start

export const add_to_wishlist = createAsyncThunk(
  "wishlist/add_to_wishlist",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/home/product/add-to-wishlist", info);
      console.log(data);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const cartReducer = createSlice({
  name: "cart",
  initialState: {
    cart_products: [],
    cart_product_count: 0,
    buy_product_item: 0,
    price: 0,
    errorMessage: "",
    successMessage: "",
    delivery_cost: 0,
    outofstock_products: [],
    wishlist_count: 0,
    wishlist: [],
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },

  extraReducers: {
    [add_to_cart.rejected]: (state, { payload }) => {
      state.errorMessage = payload.error;
    },
    [add_to_cart.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
      state.cart_product_count = state.cart_product_count + 1;
    },
    [get_cart_products.fulfilled]: (state, { payload }) => {
      state.cart_products = payload.cart_products;
      state.price = payload.price;
      state.cart_product_count = payload.cart_product_count;
      state.delivery_cost = payload.delivery_cost;
      state.outofstock_products = payload.outOfStockProducts;
      state.buy_product_item = payload.buy_product_item;
    },
    [delete_cart_product.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
    },
    [quantity_increment.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
    },
    [quantity_decrement.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
    },
  },
});
export const { messageClear } = cartReducer.actions;
export default cartReducer.reducer;
