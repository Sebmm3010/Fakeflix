import { useHomeComponents } from "../hooks/useHomeComponents";

export const RailItem = ({ movie }) => {

    const { abrirModal } = useHomeComponents();

    return (
        <>
            <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
                <img
                    className="w-full h-full block"
                    src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path || movie.img}`}
                    alt={movie.title || movie.titulo}
                />
                <div className="absolute 
                                top-0 
                                left-0 
                                w-full h-full 
                                hover:bg-black/80 
                                text-white 
                                opacity-0 
                                hover:opacity-100 
                                transition 
                                ease-in-out 
                                delay-50
                                ">
                    <p onClick={() => abrirModal(movie)}
                        className="whitespace-normal
                                text-xs
                                md:text-sm
                                font-bold
                                flex
                                justify-center
                                items-center
                                h-full
                                text-center
                                ">
                        {movie.title || movie.titulo}
                    </p>
                </div>
            </div>

        </>
    )
}
