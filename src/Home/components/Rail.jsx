import { useMemo, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { getMovies } from "../../services/getMovies";
import { useHomeComponents } from "../hooks/useHomeComponents";
import { RailItem } from "./";

export const Rail = ({ titulo = '', options = {}, rowId = '' }) => {

  const [movies, setMovies] = useState([]);
  useMemo(async () => setMovies(await getMovies(options)), [options]);
  const { slideLeft, slideRight } = useHomeComponents();

  const sliders = "bg-white rounded-full absolute opacity-50 hove:opacity-100 cursor-pointer z-10 hidden group-hover:block"
  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{titulo}</h2>
      <div className="relative flex items-center group animate__animated animate__fadeIn animate__slow">
        <MdChevronLeft
          onClick={() => slideLeft(rowId)}
          className={sliders + ' left-0'}
          size={40}
        />
        <div id={`slider${rowId}`} className="w-full h-full overflow-x-scroll overflow-y-hidden whitespace-nowrap scrollbar-hide scroll-smooth relative">
          {
            movies?.map((movie) => (
              <RailItem key={movie.id} movie={movie} />
            ))
          }
        </div>
        <MdChevronRight
          className={sliders + ' right-0'}
          size={40}
          onClick={() => slideRight(rowId)}
        />
      </div>
    </>
  )
}
