import { createSlice } from "@reduxjs/toolkit";
import { RoleMasterState } from "../../types/roleMasterTypes/RoleMasterTypes";
import { RoleMasterRequest } from "../../services/roleMasterRequest/RoleMasterRequest";

const initialState: RoleMasterState = {
  roleMaster: null,
  error: undefined,
  isRoleMastersFetched: false,
};

export const RoleMasterSlice = createSlice({
  name: "roleMasterData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(RoleMasterRequest.pending, (state) => {
        state.roleMaster = null;
        state.error = null;
        state.isRoleMastersFetched = false;
      })
      .addCase(RoleMasterRequest.fulfilled, (state, action) => {
        state.roleMaster = action.payload;
        state.error = null;
        state.isRoleMastersFetched = true;
      })
      .addCase(RoleMasterRequest.rejected, (state, action) => {
        state.roleMaster = null;
        state.error = action.error.message;
        state.isRoleMastersFetched = false;
      });
  },
});

export default RoleMasterSlice.reducer;
