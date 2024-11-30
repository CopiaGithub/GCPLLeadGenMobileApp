import { createSlice } from "@reduxjs/toolkit";
import { GetUserDataState } from "../../types/userTypes/GetUserTypes";
import { GetUsersRequest } from "../../services/userRequest/GetUserRequest";

const initialState: GetUserDataState = {
  getUsers: null,
  error: undefined,
  isUserDetailsFetched: false,
};

export const GetUserSlice = createSlice({
  name: "getUserData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetUsersRequest.pending, (state) => {
        state.getUsers = null;
        state.error = null;
        state.isUserDetailsFetched = false;
      })
      .addCase(GetUsersRequest.fulfilled, (state, action) => {
        state.getUsers = action.payload;
        state.error = null;
        state.isUserDetailsFetched = true;
      })
      .addCase(GetUsersRequest.rejected, (state, action) => {
        state.getUsers = null;
        state.error = action.error.message;
        state.isUserDetailsFetched = false;
      });
  },
});

export default GetUserSlice.reducer;
