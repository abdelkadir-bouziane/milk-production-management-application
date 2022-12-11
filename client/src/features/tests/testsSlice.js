import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  testsList: [],
  isLoading: true,
};

// get the tests list
export const getTestsList = createAsyncThunk("tests/getTestsList", () => {
  return fetch("/api/tests")
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
});

const testsSlice = createSlice({
  name: "tests",
  initialState,
  reducers: {
    // set isLoading to true
    startLoading: (state) => {
      state.isLoading = true;
    },
    // add a test
    addTest: (state, { payload }) => {
      state.testsList = [payload, ...state.testsList];
      state.isLoading = false;
    },
    // update a test
    updateTest: (state, { payload }) => {
      for (let i = 0; i < state.testsList.length; i++) {
        if (state.testsList[i].id === payload.id) {
          state.testsList[i] = { ...payload };
          break;
        }
      }
      state.isLoading = false;
    },
    // delete a test
    deleteTest: (state, { payload }) => {
      state.testsList = state.testsList.filter(
        (test) => test.id !== payload.id
      );
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTestsList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTestsList.fulfilled, (state, { payload }) => {
        state.testsList = payload;
        state.isLoading = false;
      })
      .addCase(getTestsList.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { startLoading, addTest, updateTest, deleteTest } =
  testsSlice.actions;

export default testsSlice.reducer;
