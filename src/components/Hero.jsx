import { useState, useEffect } from "react"
import { getMovies } from "../services/getmovies";

export const Hero = () => {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        (async () => {
            setMovies(await getMovies({ opt: 'popular', page: 1 }));
        })()
    }, []);
    const movie= movies[Math.floor(Math.random()* movies.length)];
    console.log(movie);
    return (
        <div className="w-full h-[550px] text-white">
            <div className="w-full h-full">
                <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
                <img
                    className="w-full h-full object-cover" 
                    src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} 
                    alt={movie?.title}
                />
            </div>
        </div>
    )
}
