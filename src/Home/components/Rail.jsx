import { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { getMovies } from "../../services/getMovies";
import { RailItem } from "./";

export const Rail = ({ titulo = '', options = {}, rowId='' }) => {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    (async () => {
      setMovies(await getMovies(options));
    })();
  }, [options]);

  const slideLeft = () => {
    const slider = document.getElementById('slider'+rowId);
    slider.scrollLeft = slider.scrollLeft - 500;
  }
  const slideRight = () => {
    const slider = document.getElementById('slider'+rowId);
    slider.scrollLeft = slider.scrollLeft + 500;
  }

  const sliders = "bg-white rounded-full absolute opacity-50 hove:opacity-100 cursor-pointer z-10 hidden group-hover:block"
  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{titulo}</h2>
      <div className="relative flex items-center group animate__animated animate__fadeIn animate__slow">
        <MdChevronLeft
          onClick={ slideLeft }
          className={sliders + ' left-0'}
          size={40}
        />
        <div id={`slider${rowId}`} className="w-full h-full overflow-x-scroll whitespace-nowrap scrollbar-hide scroll-smooth relative">
          {
            movies?.map((movie) => (
              <RailItem key={movie.id} movie={movie} />
            ))}
        </div>
        <MdChevronRight
          className={sliders + ' right-0'}
          size={40}
          onClick={ slideRight }
        />
      </div>
    </>
  )
}
