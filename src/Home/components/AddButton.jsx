import { FaHeart } from "react-icons/fa";
import { useMovieStore } from "../../hooks/useMovieStore";

export const AddButton = ({ movie, switchButtons, setSwitchButtons }) => {

    const { isSaving, addToFavorites } = useMovieStore();

    const movieDB = {
        id: '',
        movieId: movie.id,
        titulo: movie.title,
        desc: movie.overview,
        img: movie.backdrop_path,
    }

    const handleAdd = () => {
        addToFavorites(movieDB);
        setSwitchButtons(true)
    }


    return (
        <button className="flex items-center gap-3 border hover:text-white text-[#2b961f] border-[#2b961f] py-2 px-5 addShadow transition ease-in-out delay-50 animate__animated animate__animated animate__slow active:scale-95 hover:scale-105"
            onClick={handleAdd}
            disabled={isSaving}
        >
            <FaHeart /> Agregar a favoritos
        </button>
    )
}
