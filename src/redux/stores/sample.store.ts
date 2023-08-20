import { createReducer, createAction } from "@reduxjs/toolkit";

const sampleAction = createAction<void>("sample");

type SampleType = {};
const initialState: SampleType = {};
const reducer = createReducer(initialState, (build) => {
  build.addCase(sampleAction, () => {
    return initialState;
  });
});

export default reducer;
