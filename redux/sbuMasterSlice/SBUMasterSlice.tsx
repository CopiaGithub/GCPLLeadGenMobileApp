import { createSlice } from "@reduxjs/toolkit";
import { SBUMasterState } from "../../types/sbuMasterTypes/SBUMasterTypes";
import { SBUMasterRequest } from "../../services/sbuMasterRequest.tsx/SBUMasterRequest";

const initialState: SBUMasterState = {
  sbuMaster: null,
  error: undefined,
  isSBUMasterDataFetched: false,
};

export const SBUMasterSlice = createSlice({
  name: "sbuMasterData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(SBUMasterRequest.pending, (state) => {
        state.sbuMaster = null;
        state.error = null;
        state.isSBUMasterDataFetched = false;
      })
      .addCase(SBUMasterRequest.fulfilled, (state, action) => {
        state.sbuMaster = action.payload;
        state.error = null;
        state.isSBUMasterDataFetched = true;
      })
      .addCase(SBUMasterRequest.rejected, (state, action) => {
        state.sbuMaster = null;
        state.error = action.error.message;
        state.isSBUMasterDataFetched = false;
      });
  },
});

export default SBUMasterSlice.reducer;
