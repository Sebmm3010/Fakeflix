import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "../../hooks";
import { useMovieStore } from "../../hooks/useMovieStore";


export const useHomeComponents = () => {
    
    // !Propiedades y metodos de uso general
    const {
        isSaving,
        moviesRedux,
        activeMovie,
        borrarMovie,
        abrirModal,
        cerrarModal,
        addToFavorites,
        logoutClearMovies
    } = useMovieStore();

    const {
        user,
        logoutFirestore,
        logoutInvitado
    } = useAuthStore();
    
    const location = useLocation();
    
    

    // !Logica del AddButton

    const handleAdd = (movie, setSwitchButtons) => {
        const movieDB = {
            id: '',
            movieId: movie.id,
            titulo: movie.title,
            desc: movie.overview,
            img: movie.backdrop_path,
        }
        addToFavorites(movieDB);
        setSwitchButtons(true)
    }

    // !Logica de DeleteButton
    const handleDelete = (movie, setSwitchButtons) => {
        if (location.pathname === '/user') {
            const movieSelected = moviesRedux.filter(movieFb => {
                if (movieFb.movieId === movie.movieId) {
                    return movieFb;
                }
            });
            borrarMovie(movieSelected[0]);
            setSwitchButtons(false);
            cerrarModal();
            return;
        }
        const movieSelected = moviesRedux.filter(movieFb => {
            if (movieFb.movieId === movie.id) {
                return movieFb;
            }
        });
        borrarMovie(movieSelected[0]);
        setSwitchButtons(false);
    }


    // !Logica del Navbar
    const handleLogout = () => {
        if (user.uid === '001guess') {
            logoutClearMovies();
            logoutInvitado();
        }
        logoutClearMovies();
        logoutFirestore();
    }

    // !Logica del Rail
    const slideLeft = (rowId) => {
        const slider = document.getElementById('slider' + rowId);
        slider.scrollLeft = slider.scrollLeft - 500;
    }
    const slideRight = (rowId) => {
        const slider = document.getElementById('slider' + rowId);
        slider.scrollLeft = slider.scrollLeft + 500;
    }
    return {
        // * Propiedades
        isSaving,
        moviesRedux,
        activeMovie,
        user,
        location,

        // * Metodos
        abrirModal,
        cerrarModal,
        handleAdd,
        handleDelete,
        handleLogout,
        slideLeft,
        slideRight
    }

}