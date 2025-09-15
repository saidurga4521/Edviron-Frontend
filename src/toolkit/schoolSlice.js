import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSchools } from "../services/schools";
const initialState = {
  schools: [],
  isLoading: false,
};

export const fetchSchools = createAsyncThunk("schools/getSchools", async () => {
  const response = await getSchools();
  return response.data.data;
});

const schoolSlice = createSlice({
  name: "schools",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchools.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSchools.fulfilled, (state, action) => {
        state.schools = action.payload;
        state.isLoading = false;
      });
  },
});
export default schoolSlice.reducer;
