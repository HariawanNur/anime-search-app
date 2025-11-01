import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AnimeState {
  list: any[];
  detail: any | null;
  loading: boolean;
  error: string | null;
  pagination: any | null;
}

const initialState: AnimeState = {
  list: [],
  detail: null,
  loading: false,
  error: null,
  pagination: null,
};

// Async thunk untuk list anime dengan signal (AbortController)
export const fetchAnimeList = createAsyncThunk(
  "anime/fetchList",
  async (
    { query, page, signal }: { query: string; page: number; signal?: AbortSignal },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get("https://api.jikan.moe/v4/anime", {
        params: { q: query, page },
        signal,
      });
      return {
        data: response.data.data,
        pagination: response.data.pagination,
      };
    } catch (err: any) {
      if (err.name === "CanceledError") {
        return rejectWithValue("Request dibatalkan");
      }
      return rejectWithValue(err.message || "Failed to fetch anime");
    }
  }
);

// Async thunk untuk detail anime
export const fetchAnimeDetail = createAsyncThunk(
  "anime/fetchDetail",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch detail");
    }
  }
);

const animeSlice = createSlice({
  name: "anime",
  initialState,
  reducers: {
    resetDetail(state) {
      state.detail = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch list
      .addCase(fetchAnimeList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimeList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data || [];
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAnimeList.rejected, (state, action) => {
        state.loading = false;
        if (action.payload === "Request dibatalkan") return;
        state.error = action.payload as string;
      })
      // fetch detail
      .addCase(fetchAnimeDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimeDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.detail = action.payload;
      })
      .addCase(fetchAnimeDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetDetail } = animeSlice.actions;

export default animeSlice.reducer;
