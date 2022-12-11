import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cowsList: [],
  isLoading: true,
};

// get the cows list
export const getCowsList = createAsyncThunk("cows/getCowsList", () => {
  return fetch("/api/cows")
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
});

const cowsSlice = createSlice({
  name: "cows",
  initialState,
  reducers: {
    // set isLoading to true
    startLoading: (state) => {
      state.isLoading = true;
    },
    // add a cow
    addCow: (state, { payload }) => {
      state.cowsList = [payload, ...state.cowsList];
      state.isLoading = false;
    },
    // update a cow
    updateCow: (state, { payload }) => {
      for (let i = 0; i < state.cowsList.length; i++) {
        if (state.cowsList[i].id === payload.id) {
          state.cowsList[i] = { ...payload };
          break;
        }
      }
      state.isLoading = false;
    },
    // delete a cow
    deleteCow: (state, { payload }) => {
      state.cowsList = state.cowsList.filter((cow) => cow.id !== payload.id);
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCowsList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCowsList.fulfilled, (state, { payload }) => {
        state.cowsList = payload;
        state.isLoading = false;
      })
      .addCase(getCowsList.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { startLoading, addCow, updateCow, deleteCow } = cowsSlice.actions;

export default cowsSlice.reducer;
