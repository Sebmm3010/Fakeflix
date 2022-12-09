import { useEffect, useState } from "react"
import { getMovies } from "../services/getmovies";
import { RailItem } from "./";

export const Rail = ({ titulo = '', options = {} }) => {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    (async () => {
      setMovies(await getMovies(options));
    })();
  }, [options]);

  

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{titulo}</h2>
      <div className="relative flex items-center">
        <div id="slider">
          {
            movies?.map((movie) => (
              <RailItem key={movie.id} movie={movie}/>
            ))
          }
        </div>
      </div>
    </>
  )
}
