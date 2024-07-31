// src/slices/priceSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface PriceState {
  prices: any[];
  loading: boolean;
  error: string | null;
}

const initialState: PriceState = {
  prices: [],
  loading: false,
  error: null,
};

export const fetchPrices = createAsyncThunk("prices/fetchPrices", async () => {
  const response = await axios.get("http://localhost:5000/api/prices"); // Adjust the URL as needed
  return response.data;
});

const priceSlice = createSlice({
  name: "prices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPrices.fulfilled, (state, action) => {
        state.prices = action.payload;
        state.loading = false;
      })
      .addCase(fetchPrices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default priceSlice.reducer;
