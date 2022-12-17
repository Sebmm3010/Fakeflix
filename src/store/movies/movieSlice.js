import { createSlice } from '@reduxjs/toolkit';

export const movieSlice = createSlice({
    name: 'movie',
    initialState: {
        isSaving:false,
        movies: []
    },
    reducers: {
        addMovie: (state, { payload }) => {
            state.movies.push(payload);
        },
        setFavorites: (state, { payload }) => {
            state.movies = payload;
        },
        clearMovies: (state) => {
            state.movies = [];
        },
        removeMovie: (state, { payload }) => {
            state.movies = state.movies.filter(movie => movie.id !== payload);
        },
        saving:(state)=>{
            state.isSaving=true;
        },
        notSaving: (state) => {
            state.isSaving = false;
        }
    }
});


// Action creators are generated for each case reducer function
export const { addMovie, setFavorites, clearMovies, removeMovie, saving, notSaving} = movieSlice.actions;