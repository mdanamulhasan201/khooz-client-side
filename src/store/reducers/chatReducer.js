import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const add_friend = createAsyncThunk(
  "chat/add_friend",
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post(
        "/chat/customer/add-customer-friend",
        info
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const chatReducer = createSlice({
  name: "chat",
  initialState: {
    my_friends: [],
    fd_messages: [],
    currentFd: "",
    successMessage: "",
    errorMessage: "",
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },

  extraReducers: {
    // [add_friend.fulfilled]: (state, { payload }) => {
    //   state.fd_messages = payload.messages;
    //   state.currentFd = payload.currentFd;
    //   state.my_friends = payload.myFriends;
    // },
  },
});
export const { messageClear } = chatReducer.actions;
export default chatReducer.reducer;
