import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../api/apii";
import api from "../../api/api";
// seller request get
export const get_provider_request = createAsyncThunk(
  "provider/get_provider_request",
  // admin_login function j khan theke call korbo shy khane para meter akare info (information pathabo)
  async ({ searchValue }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/get-provider-request?searchValue=${searchValue}`,
        {
          // response to distructure data
          withCredentials: true,
        }
      );
        // console.log(data);

      return fulfillWithValue(data); //token and success message pass
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_provider_details = createAsyncThunk(
  "seller/get_provider_details",
  // admin_login function j khan theke call korbo shy khane para meter akare info (information pathabo)
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get-provider-details/${sellerId}`, {
        // response to distructure data
        withCredentials: true,
      });
    //   console.log(data);

      return fulfillWithValue(data); //token and success message pass
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const providerReducer = createSlice({
  name: "category",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    sellers: [],
    seller: "",
    totalSeller: 0,
  },
  reducers: {
    // clear message
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: {
    
    [get_provider_request.fulfilled]: (state, { payload }) => {
      state.sellers = payload.sellers;
      state.totalSeller = payload.totalSeller;
    },
    [get_provider_details.fulfilled]: (state, { payload }) => {
        state.seller = payload.seller;
      },
  },
});
export const { messageClear } = providerReducer.actions;
export default providerReducer.reducer;
