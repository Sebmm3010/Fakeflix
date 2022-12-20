import { collection, deleteDoc, doc, getDocs, orderBy, setDoc } from "firebase/firestore/lite";
import { useDispatch, useSelector } from "react-redux"
import { FirebaseDB } from "../firebase/config";
import { addMovie, clearMovies, notSaving, removeMovie, saving, setFavorites } from "../store";


export const useMovieStore = () => {
    const { user } = useSelector(state=>state.auth);
    const { uid } = user;
    const { movies, isSaving } = useSelector(state => state.movies);
    const dispatch = useDispatch();

    const addToFavorites = async (movie) => {
        dispatch(saving());

        if (uid === '001guess') {
            dispatch(addMovie(movie));
            dispatch(notSaving());
            return;
        }
        const newDoc = doc(collection(FirebaseDB, `${uid}/favorites/movies`));
        movie.id = newDoc.id;
        await setDoc(newDoc, movie);
        dispatch(addMovie({movie, uid}));
        dispatch(notSaving());
    }

    const cargarFavorites = async () => {
        if (!uid) return;

        if (uid === '001guess') {
            let moviesLS=[];
            localStorage.getItem('movies')
                ? moviesLS=JSON.parse(localStorage.getItem('movies'))
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
            dispatch(removeMovie({movie, uid}))
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

    return {
        /* Propiedades */
        moviesRedux: movies,
        isSaving,

        /* Metodos */
        addToFavorites,
        cargarFavorites,
        logutClearMovies,
        borrarMovie
    }
}