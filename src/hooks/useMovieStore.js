import { collection, deleteDoc, doc, getDocs, orderBy, setDoc } from "firebase/firestore/lite";
import { useDispatch, useSelector } from "react-redux"
import { FirebaseDB } from "../firebase/config";
import { addMovie, clearMovies, removeMovie, setMovies } from "../store";
import { useAuthStore } from "./";


export const useMovieStore = () => {
    const { user } = useAuthStore();
    const { uid } = user;
    const { movies } = useSelector(state => state.movies);
    const dispatch = useDispatch();

    const addToFavorites = async (movie) => {
        const newDoc = doc(collection(FirebaseDB, `${uid}/favorites/movies`));
        movie.id= newDoc.id;
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

    const borrarMovie= async(id)=>{

        const docRef = doc(FirebaseDB, `${uid}/favorites/movies/${id}`);
        await deleteDoc(docRef);
        dispatch(removeMovie(id));
    }

    const logutClearMovies=()=>{
        dispatch(clearMovies());
    }

    return {
        /* Propiedades */
        moviesRedux:movies,

        /* Metodos */
        addToFavorites,
        cargarFavorites,
        logutClearMovies,
        borrarMovie
    }
}