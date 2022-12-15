import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { movieSlice } from "./movies/movieSlice";

export const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        movies: movieSlice.reducer
    }
});