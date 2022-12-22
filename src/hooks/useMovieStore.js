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

    // !Procesos relacionado con la seccion de favoritos
    // ? Guardar peliculas en favoritos
    const addToFavorites = async (movie) => {
        dispatch(saving());
        // ?Proceso para guardar como invitado
        if (uid === '001guess') {
            dispatch(addMovie({ movie, uid }));
            dispatch(notSaving());
            return;
        }
        // ? Proceso para guardar usando firebase
        const newDoc = doc(collection(FirebaseDB, `${uid}/favorites/movies`));
        movie.id = newDoc.id;
        await setDoc(newDoc, movie);
        dispatch(addMovie({ movie, uid }));
        dispatch(notSaving());
    }

    // ? Cargar peluculas desde alguna de las bases de datos
    const cargarFavorites = async () => {
        if (!uid) return;
        //? Cargar peluculas probenientes del localstorage 
        if (uid === '001guess') {
            let moviesLS = [];
            localStorage.getItem('movies')
                ? moviesLS = JSON.parse(localStorage.getItem('movies'))
                : localStorage.setItem('movies', JSON.stringify([]));
            dispatch(setFavorites(moviesLS));
            return;
        }
        //? Cargar peluculas desde firebase
        const moviesFB = [];
        const docs = await getDocs(collection(FirebaseDB, `${uid}/favorites/movies`), orderBy('date', 'desc'));
        docs.forEach(doc => {
            moviesFB.push(doc.data());
        });
        dispatch(setFavorites(moviesFB));
    }
    // ? Borrar peliculas de favoritos
    const borrarMovie = async (movie) => {
        dispatch(saving());
        // ? Borrar del LocalStorage
        if (uid === '001guess') {
            dispatch(removeMovie({ movie, uid }))
            dispatch(notSaving());
            return;
        }
        // ? Borrar de firebase
        const docRef = doc(FirebaseDB, `${uid}/favorites/movies/${movie.id}`);
        await deleteDoc(docRef);
        dispatch(removeMovie(movie.id));
        dispatch(notSaving());
    }
    // ? Limpiar el redux al hacer logout
    const logoutClearMovies = () => {
        dispatch(clearMovies());
    }

    // !Procesos relacionados con el modal

    // ? Abrir modal
    const abrirModal = (movie) => {
        dispatch(openModal(movie));
    }
    // ? Cerrar modal
    const cerrarModal = () => {
        dispatch(closeModal());
    }

    return {
        //* Propiedades
        moviesRedux: movies,
        isSaving,
        activeMovie,
        showModal,

        //* Metodos
        addToFavorites,
        cargarFavorites,
        logoutClearMovies,
        borrarMovie,
        abrirModal,
        cerrarModal,
    }
}