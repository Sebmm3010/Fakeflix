import { createSlice } from '@reduxjs/toolkit';

export const movieSlice = createSlice({
    name: 'movie',
    initialState: {
        movies: []
    },
    reducers: {
        addMovie: (state, { payload }) => {
            state.movies.push(payload);
        },
        setMovies: (state, { payload }) => {
            state.movies = payload;
        },
        clearMovies: (state) => {
            state.movies = [];
        },
        removeMovie: (state, { payload }) => {
            state.movies = state.movies.filter(movie => movie.id !== payload);
        }
    }
});


// Action creators are generated for each case reducer function
export const { addMovie, setMovies, clearMovies, removeMovie } = movieSlice.actions;