import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const place_order = createAsyncThunk(
  "order/place_order",
  async ({
    price,
    products,
    delivery_cost,
    shippingInfo,
    userId,
    navigate,
    items,
  }) => {
    try {
      const { data } = await api.post("/home/order/place-order", {
        price,
        products,
        delivery_cost,
        shippingInfo,
        userId,
        navigate,
        items,
      });
      navigate("/payment", {
        state: {
          price: price + delivery_cost,
          items,
          orderId: data.orderId,
        },
      });
      console.log(data);
      return true;
    } catch (error) {
      console.log(error.response);
    }
  }
);

//  get orders
export const get_orders = createAsyncThunk(
  "order/get_orders",
  async ({ customerId, status }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `home/customer/get-orders/${customerId}/${status}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error);
    }
  }
);

export const get_order_details = createAsyncThunk(
  "order/get_order_details",
  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `home/customer/get-order-details/${orderId}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error);
    }
  }
);

export const orderReducer = createSlice({
  name: "order",
  initialState: {
    myOrders: [],
    errorMessage: "",
    successMessage: "",
    myOrder: {},
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: {
    [get_orders.fulfilled]: (state, { payload }) => {
      state.myOrders = payload.orders;
    },
    [get_order_details.fulfilled]: (state, { payload }) => {
      state.myOrder = payload.order;
    },
  },
});
export const { messageClear } = orderReducer.actions;
export default orderReducer.reducer;
