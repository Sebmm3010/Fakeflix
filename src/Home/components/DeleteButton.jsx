import { FaTrashAlt } from "react-icons/fa";
import { useHomeComponents } from "../hooks/useHomeComponents";

export const DeleteButton = ({ movie, setSwitchButtons }) => {
    const { isSaving, handleDelete } = useHomeComponents();

    return (
        <button
            onClick={() => handleDelete(movie, setSwitchButtons)}
            className="flex items-center gap-3 border hover:text-white text-[#E50608] border-[#E50608] py-2 px-5 deleteShadow transition ease-in-out delay-50 animate__animated animate__animated animate__slow active:scale-95 hover:scale-105"
            disabled={isSaving}
        >
            <FaTrashAlt /> Eliminar de favoritos
        </button>
    )
}
