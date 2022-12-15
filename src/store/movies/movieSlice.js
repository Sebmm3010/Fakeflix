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
            state.movies=payload;
        },
        removeMovie: (state) => {

        }
    }
});


// Action creators are generated for each case reducer function
export const { addMovie, setMovies, removeMovie } = movieSlice.actions;