import { collection, deleteDoc, doc, getDocs, orderBy, setDoc } from "firebase/firestore/lite";
import { useDispatch, useSelector } from "react-redux"
import { FirebaseDB } from "../firebase/config";
import { addMovie, clearMovies, closeModal, notSaving, openModal, removeMovie, saving, setFavorites } from "../store";
import { useAuthStore } from "./useAuthStore";


export const useMovieStore = () => {
    const { user } = useAuthStore()
    const { uid } = user;
    const { movies, isSaving, modal } = useSelector(state => state.movies);
    const { activeMovie, showModal } = modal;
    const dispatch = useDispatch();

    const addToFavorites = async (movie) => {
        dispatch(saving());

        if (uid === '001guess') {
            dispatch(addMovie({movie,uid}));
            dispatch(notSaving());
            return;
        }
        const newDoc = doc(collection(FirebaseDB, `${uid}/favorites/movies`));
        movie.id = newDoc.id;
        await setDoc(newDoc, movie);
        dispatch(addMovie({ movie, uid }));
        dispatch(notSaving());
    }

    const cargarFavorites = async () => {
        if (!uid) return;

        if (uid === '001guess') {
            let moviesLS = [];
            localStorage.getItem('movies')
                ? moviesLS = JSON.parse(localStorage.getItem('movies'))
                : localStorage.setItem('movies', JSON.stringify([]));
            dispatch(setFavorites(moviesLS));
            return;
        }

        const moviesFB = [];
        const docs = await getDocs(collection(FirebaseDB, `${uid}/favorites/movies`), orderBy('date', 'desc'));
        docs.forEach(doc => {
            moviesFB.push(doc.data());
        });
        dispatch(setFavorites(moviesFB));
    }

    const borrarMovie = async (movie) => {
        dispatch(saving());

        if (uid === '001guess') {
            dispatch(removeMovie({ movie, uid }))
            dispatch(notSaving());
            return;
        }

        const docRef = doc(FirebaseDB, `${uid}/favorites/movies/${movie.id}`);
        await deleteDoc(docRef);
        dispatch(removeMovie(movie.id));
        dispatch(notSaving());
    }

    const logutClearMovies = () => {
        dispatch(clearMovies());
    }

    const abrirModal = (movie) => {
        dispatch(openModal(movie));
    }
    const cerrarModal = () => {
        dispatch(closeModal());
    }

    return {
        /* Propiedades */
        moviesRedux: movies,
        isSaving,
        activeMovie,
        showModal,

        /* Metodos */
        addToFavorites,
        cargarFavorites,
        logutClearMovies,
        borrarMovie,
        abrirModal,
        cerrarModal,
    }
}