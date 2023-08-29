import { createReducer, createAction } from "@reduxjs/toolkit";
import { UserProfileResponse } from "../../modules/api/me.apis";

type MeState = {
  isReady: boolean;
  userProfile: UserProfileResponse | null;
};

const initialState: MeState = {
  isReady: false,
  userProfile: null,
};

const load = createAction<UserProfileResponse>("me/user-profile/load");
const unload = createAction<UserProfileResponse>("me/user-profile/unload");

const reducer = createReducer<MeState>(initialState, (build) => {
  build.addCase(load, (state, action) => {
    return Object.assign(
      state,
      {},
      {
        isReady: true,
        userProfile: action.payload,
      }
    );
  });
  build.addCase(unload, () => initialState);
});

export const MeActions = {
  load,
  unload,
};

export default reducer;
