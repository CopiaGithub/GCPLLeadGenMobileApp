import { createSlice } from "@reduxjs/toolkit";
import { StateState } from "../../types/stateTypes/StateTypes";
import { StateRequest } from "../../services/stateRequest/StateRequest";

const initialState: StateState = {
  states: null,
  error: undefined,
  isStatesFetched: false,
};

export const StateSlice = createSlice({
  name: "stateData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(StateRequest.pending, (state) => {
        state.states = null;
        state.error = null;
        state.isStatesFetched = false;
      })
      .addCase(StateRequest.fulfilled, (state, action) => {
        state.states = action.payload;
        state.error = null;
        state.isStatesFetched = true;
      })
      .addCase(StateRequest.rejected, (state, action) => {
        state.states = null;
        state.error = action.error.message;
        state.isStatesFetched = false;
      });
  },
});

export default StateSlice.reducer;
