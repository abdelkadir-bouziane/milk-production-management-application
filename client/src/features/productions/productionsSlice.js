import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  productionsList: [],
  isLoading: true,
};

// get the productions list
export const getProductionsList = createAsyncThunk(
  "productions/getProductionsList",
  () => {
    return fetch("/api/productions")
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
  }
);

const productionsSlice = createSlice({
  name: "productions",
  initialState,
  reducers: {
    // set isLoading to true
    startLoading: (state) => {
      state.isLoading = true;
    },
    // add a production
    addProduction: (state, { payload }) => {
      state.productionsList = [payload, ...state.productionsList];
      state.isLoading = false;
    },
    // update a production
    updateProduction: (state, { payload }) => {
      for (let i = 0; i < state.productionsList.length; i++) {
        if (state.productionsList[i].id === payload.id) {
          state.productionsList[i] = { ...payload };
          break;
        }
      }
      state.isLoading = false;
    },
    // delete a production
    deleteProduction: (state, { payload }) => {
      state.productionsList = state.productionsList.filter(
        (production) => production.id !== payload.id
      );
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductionsList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductionsList.fulfilled, (state, { payload }) => {
        state.productionsList = payload;
        state.isLoading = false;
      })
      .addCase(getProductionsList.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
  startLoading,
  addProduction,
  updateProduction,
  deleteProduction,
} = productionsSlice.actions;

export default productionsSlice.reducer;
