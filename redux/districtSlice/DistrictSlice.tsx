import { createSlice } from "@reduxjs/toolkit";
import { DistrictState } from "../../types/districtTypes/DistrictTypes";
import { DistrictRequest } from "../../services/districtRequest/DistrictRequest";

const initialState: DistrictState = {
  districts: null,
  error: undefined,
  isDistrictsFetched: false,
};

export const DistrictSlice = createSlice({
  name: "districtData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(DistrictRequest.pending, (state) => {
        state.districts = null;
        state.error = null;
        state.isDistrictsFetched = false;
      })
      .addCase(DistrictRequest.fulfilled, (state, action) => {
        state.districts = action.payload;
        state.error = null;
        state.isDistrictsFetched = true;
      })
      .addCase(DistrictRequest.rejected, (state, action) => {
        state.districts = null;
        state.error = action.error.message;
        state.isDistrictsFetched = false;
      });
  },
});

export default DistrictSlice.reducer;
