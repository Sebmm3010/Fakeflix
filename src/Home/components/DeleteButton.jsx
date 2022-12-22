import { FaTrashAlt } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "../../hooks";
import { useMovieStore } from "../../hooks/useMovieStore";

export const DeleteButton = ({ movie, setSwitchButtons }) => {
    const { isSaving, moviesRedux, borrarMovie, cerrarModal } = useMovieStore();

    const location=useLocation();
    const handleDelete = () => {
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

    return (
        <button
            onClick={handleDelete}
            className="flex items-center gap-3 border hover:text-white text-[#E50608] border-[#E50608] py-2 px-5 deleteShadow transition ease-in-out delay-50 animate__animated animate__animated animate__slow active:scale-95 hover:scale-105"
            disabled={isSaving}
        >
            <FaTrashAlt /> Eliminar de favoritos
        </button>
    )
}
