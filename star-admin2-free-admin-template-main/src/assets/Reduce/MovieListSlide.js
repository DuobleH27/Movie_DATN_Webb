// src/Reduce/MovieListSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Gọi API để lấy danh sách phim
export const MovieList = createAsyncThunk(
  'movies/fetchMovies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://be-movie-sooty.vercel.app/movie/getAll');
      return response.data; // Trả về dữ liệu phim
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      return rejectWithValue(error.message); // Trả về lỗi nếu gặp
    }
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(MovieList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(MovieList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(MovieList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default movieSlice.reducer;
