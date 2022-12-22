import { createSlice } from '@reduxjs/toolkit';

export const movieSlice = createSlice({
    name: 'movie',
    initialState: {
        isSaving: false,
        modal:{
            activeMovie:{},
            showModal:false
        },
        movies: []
    },
    reducers: {
        addMovie: (state, { payload }) => {
            state.movies.push(payload.movie);
            if (payload.uid === '001guess') {
                localStorage.setItem('movies', JSON.stringify(state.movies));
            }
        },
        setFavorites: (state, { payload }) => {
            state.movies = payload;
        },
        clearMovies: (state) => {
            state.movies = [];
        },
        removeMovie: (state, { payload }) => {
            if (payload.uid === '001guess') {
                state.movies = state.movies.filter(movie => movie.movieId !== payload.movie.movieId);
                localStorage.setItem('movies', JSON.stringify(state.movies));
                return;
            }
            state.movies = state.movies.filter(movie => movie.id !== payload);
        },
        saving: (state) => {
            state.isSaving = true;
        },
        notSaving: (state) => {
            state.isSaving = false;
        },
        openModal: (state, {payload})=>{
            state.modal.activeMovie=payload;
            state.modal.showModal = true;

        },
        closeModal: (state) => {
            state.modal.activeMovie = {};
            state.modal.showModal = false;
        }
    }
});


// Action creators are generated for each case reducer function
export const { addMovie, setFavorites, clearMovies, removeMovie, saving, notSaving, openModal, closeModal } = movieSlice.actions;