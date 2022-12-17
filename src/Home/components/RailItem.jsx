import { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useMovieStore } from '../../hooks';
export const RailItem = ({ movie }) => {


    const [like, setLike] = useState(false);

    const { moviesRedux, addToFavorites, borrarMovie } = useMovieStore();

    const handleAdd = () => {
        setLike(true);
        const movieDB = {
            id: '',
            movieId: movie.id,
            titulo: movie.title,
            img: movie.backdrop_path
        }
        addToFavorites(movieDB);
    }

    const handleDelete = () => {
        const movieSelected = moviesRedux.filter(movieFb => {
            if (movieFb.movieId === movie.id) {
                return movieFb;
            }
        });
        borrarMovie(movieSelected[0].id);
        setLike(false);
    }

    useEffect(() => {
        moviesRedux?.map(movieR => {
            movieR.movieId === movie.id
                && setLike(true)
        });
    }, [moviesRedux]);


    const likes = 'absolute top-4 left-4 text-gray-300';
    return (
        <>
            <div key={movie.id} className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
                <img
                    className="w-full h-full block"
                    src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                    alt={movie.title}
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
                    <p className="whitespace-normal
                                text-xs
                                md:text-sm
                                font-bold
                                flex
                                justify-center
                                items-center
                                h-full
                                text-center
                                ">
                        {movie.title}
                    </p>
                    <p>
                        {
                            like ? <FaHeart onClick={handleDelete} className={likes} /> : <FaRegHeart onClick={handleAdd} className={likes} />
                        }
                    </p>
                </div>
            </div>
        </>
    )
}
