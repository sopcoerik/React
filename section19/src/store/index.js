import { configureStore } from "@reduxjs/toolkit";
import { addMovie, removeMovie, moviesReducer } from "./slices/moviesSlice";

import { addSong, removeSong, songsReducer } from "./slices/songsSlice";
const store = configureStore({
  reducer: {
    songs: songsReducer,
    movies: moviesReducer
  }
});

export { store, addMovie, removeMovie, addSong, removeSong };
