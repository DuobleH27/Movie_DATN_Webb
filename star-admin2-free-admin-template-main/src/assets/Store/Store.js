// src/Store/Store.js
import { configureStore } from '@reduxjs/toolkit';
import movieSlice from '../Reduce/MovieListSlice.js';

export const store = configureStore({
  reducer: {
    movies: movieSlice,
  },
});
export default store;