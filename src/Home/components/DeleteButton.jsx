import { FaTrashAlt } from "react-icons/fa";
import { useMovieStore } from "../../hooks/useMovieStore";

export const DeleteButton = ({ movie, switchButtons, setSwitchButtons }) => {
    const { isSaving, moviesRedux, borrarMovie } = useMovieStore();

    const handleDelete = () => {
        const movieSelected = moviesRedux.filter(movieFb => {
            if (movieFb.movieId === movie.id) {
                return movieFb;
            }
        });
        borrarMovie(movieSelected[0]);
        setSwitchButtons(false)
    }

    return (
        <button
            onClick={handleDelete}
            className="flex items-center gap-3 border hover:text-white text-[#E50608] border-[#E50608] py-2 px-5 deleteShadow transition ease-in-out delay-50"
            disabled={isSaving}
        >
            <FaTrashAlt/> Eliminar de favoritos
        </button>
    )
}
