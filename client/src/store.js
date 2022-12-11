import { configureStore } from "@reduxjs/toolkit";
import birthsReducer from "./features/births/birthsSlice";
import cowsReducer from "./features/cows/cowsSlice";
import productionsReducer from "./features/productions/productionsSlice";
import testsReducer from "./features/tests/testsSlice";

export const store = configureStore({
  reducer: {
    births: birthsReducer,
    cows: cowsReducer,
    productions: productionsReducer,
    tests: testsReducer,
  },
});
