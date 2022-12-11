import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  birthsList: [],
  isLoading: true,
};

// get the births list
export const getBirthsList = createAsyncThunk("births/getBirthsList", () => {
  return fetch("/api/births")
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
});

const birthsSlice = createSlice({
  name: "births",
  initialState,
  reducers: {
    // set isLoading to true
    startLoading: (state) => {
      state.isLoading = true;
    },
    // add a birth
    addBirth: (state, { payload }) => {
      state.birthsList = [payload, ...state.birthsList];
      state.isLoading = false;
    },
    // update a birth
    updateBirth: (state, { payload }) => {
      for (let i = 0; i < state.birthsList.length; i++) {
        if (state.birthsList[i].id === payload.id) {
          state.birthsList[i] = { ...payload };
          break;
        }
      }
      state.isLoading = false;
    },
    // delete a birth
    deleteBirth: (state, { payload }) => {
      state.birthsList = state.birthsList.filter(
        (birth) => birth.id !== payload.id
      );
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBirthsList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBirthsList.fulfilled, (state, { payload }) => {
        state.birthsList = payload;
        state.isLoading = false;
      })
      .addCase(getBirthsList.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { startLoading, addBirth, updateBirth, deleteBirth } =
  birthsSlice.actions;

export default birthsSlice.reducer;
