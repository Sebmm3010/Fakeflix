import { collection, doc, getDocs, orderBy, setDoc } from "firebase/firestore/lite";
import { useDispatch, useSelector } from "react-redux"
import { FirebaseDB } from "../firebase/config";
import { addMovie, setMovies } from "../store";
import { useAuthStore } from "./";


export const useMovieStore = () => {
    const { user } = useAuthStore();
    const { uid } = user;
    const { isSaving, movies } = useSelector(state => state.movies);
    const dispatch = useDispatch();

    const addToFavorites = async (movie) => {
        const newDoc = doc(collection(FirebaseDB, `${uid}/favorites/movies`));
        await setDoc(newDoc, movie);
        dispatch(addMovie(movie));
    }

    const cargarFavorites = async () => {
        if (!uid) return;
        const movies=[];
        const docs = await getDocs(collection(FirebaseDB, `${uid}/favorites/movies`), orderBy('date', 'desc'));
        docs.forEach(doc => {
            movies.push(doc.data());
        });
        dispatch(setMovies(movies));
    }

    return {
        /* Propiedades */
        isSaving,
        movies,

        /* Metodos */
        addToFavorites,
        cargarFavorites
    }
}