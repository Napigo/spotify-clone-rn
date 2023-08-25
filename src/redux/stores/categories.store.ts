import { createAction, createReducer } from "@reduxjs/toolkit";
import { find, findIndex } from "lodash";

export type CategoryItem = {
  id: string;
  name: string;
  coverPhoto: string | null;
};

interface CategoriesState {
  isReady: boolean;
  categories: CategoryItem[];
}

const initialState: CategoriesState = {
  isReady: false,
  categories: [],
};

const load = createAction<CategoryItem[]>("categories/load");
const unload = createAction<void>("categories/unload");

const reducer = createReducer<CategoriesState>(initialState, (build) => {
  build.addCase(load, (state, action) => {
    return Object.assign(
      state,
      {},
      {
        isReady: true,
        categories: [...action.payload],
      }
    );
  });
  build.addCase(unload, () => initialState);
});

export const categoriesAction = {
  load,
  unload,
};
export default reducer;
