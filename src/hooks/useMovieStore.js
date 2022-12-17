import { collection, deleteDoc, doc, getDocs, orderBy, setDoc } from "firebase/firestore/lite";
import { useDispatch, useSelector } from "react-redux"
import { FirebaseDB } from "../firebase/config";
import { addMovie, clearMovies, notSaving, removeMovie, saving, setFavorites } from "../store";
import { useAuthStore } from "./";


export const useMovieStore = () => {
    const { user } = useAuthStore();
    const { uid } = user;
    const { movies, isSaving } = useSelector(state => state.movies);
    const dispatch = useDispatch();

    const addToFavorites = async (movie) => {
        dispatch(saving());
        const newDoc = doc(collection(FirebaseDB, `${uid}/favorites/movies`));
        movie.id= newDoc.id;
        await setDoc(newDoc, movie);
        dispatch(addMovie(movie));
        dispatch(notSaving())
    }

    const cargarFavorites = async () => {
        if (!uid) return;
        const movies=[];
        const docs = await getDocs(collection(FirebaseDB, `${uid}/favorites/movies`), orderBy('date', 'desc'));
        docs.forEach(doc => {
            movies.push(doc.data());
        });
        dispatch(setFavorites(movies));
    }

    const borrarMovie= async(id)=>{
        dispatch(saving());
        const docRef = doc(FirebaseDB, `${uid}/favorites/movies/${id}`);
        await deleteDoc(docRef);
        dispatch(removeMovie(id));
        dispatch(notSaving());
    }

    const logutClearMovies=()=>{
        dispatch(clearMovies());
    }

    return {
        /* Propiedades */
        moviesRedux:movies,
        isSaving,

        /* Metodos */
        addToFavorites,
        cargarFavorites,
        logutClearMovies,
        borrarMovie
    }
}