import { FaHeart } from "react-icons/fa";
import { useHomeComponents } from "../hooks/useHomeComponents";

export const AddButton = ({ movie, setSwitchButtons }) => {

    const { isSaving, handleAdd }= useHomeComponents();


    return (
        <button className="flex items-center gap-3 border hover:text-white text-[#2b961f] border-[#2b961f] py-2 px-5 addShadow transition ease-in-out delay-50 animate__animated animate__animated animate__slow active:scale-95 hover:scale-105"
            onClick={()=>handleAdd(movie, setSwitchButtons)}
            disabled={isSaving}
        >
            <FaHeart /> Agregar a favoritos
        </button>
    )
}
