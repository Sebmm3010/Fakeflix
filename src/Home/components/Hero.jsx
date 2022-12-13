import { useState, useEffect } from "react"
import { trunckarTexto } from "../../helpers";
import { getMovies } from "../../services/getmovies";

export const Hero = () => {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        (async () => {
            setMovies(await getMovies({ opt: 'popular', page: 1 }));
        })()
    }, []);
    const peli = movies[Math.floor(Math.random() * movies.length)];


    return (
        <div className="w-full h-[550px] text-white">
            <div className="w-full h-full">
                <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
                <img
                    className="w-full h-full object-cover"
                    src={`https://image.tmdb.org/t/p/original/${peli?.backdrop_path}`}
                    alt={peli?.title}
                />
                <div className="absolute w-full top-[20%] p-4 md:p-8">
                    <h1 className="text-3xl md:text-5xl font-bold">{peli?.title}</h1>
                    <div className="my-5">
                        <button className=" border bg-gray-300 text-black border-gray-300 py-2 px-5">Play</button>
                        <button className="border ml-4 text-white border-gray-300 py-2 px-5 myShadow transition ease-in-out delay-50">Ver más tarde</button>
                    </div>
                    <p className="w-full md:max-w-[50%] xl:max-w-[35%] text-gray-200">{trunckarTexto(peli?.overview,150)}</p>
                </div>
            </div>
        </div>
    )
}
