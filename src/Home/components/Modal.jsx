import { useEffect, useState } from "react";
import { BsBoxArrowRight } from "react-icons/bs";
import { trunckarTexto } from "../../helpers";
import { useHomeComponents } from "../hooks/useHomeComponents";
import { AddButton } from "./AddButton";
import { DeleteButton } from "./DeleteButton";


export const Modal = () => {

  const [switchButtons, setSwitchButtons] = useState(false);
  const { activeMovie, moviesRedux, location, cerrarModal } = useHomeComponents();

  useEffect(() => {

    if (location.pathname === '/user') {
      moviesRedux.map(movieR => {
        movieR.movieId === activeMovie.movieId
          && setSwitchButtons(true)
      });
      return;
    }

    moviesRedux.map(movieR => {
      movieR.movieId === activeMovie.id
        && setSwitchButtons(true)
    });
  }, []);

  return (
    <div className="w-full h-screen absolute">
      <div className="bg-black/80 fixed top-0 left-0 w-full h-screen z-[100]"></div>
      <div className="fixed md:top-[15%] left-0 w-full px-4 py-24 z-[100]">
        <div className=" max-w-[600px] md:h-[600px] h-[700px] mx-auto bg-black text-white animate__animated animate__fadeInUp animate__fast">
          <div className="w-full md:h-[50%] h-[40%]">
            <img
              className="w-full h-full object-cover"
              src={`https://image.tmdb.org/t/p/original/${activeMovie.backdrop_path || activeMovie.img}`}
              alt={activeMovie.title || activeMovie.titulo}
            />
            <div className="absolute w-full top-[30%] p-4 md:p-8">
              <h1 className="text-xl md:text-4xl font-bold">{activeMovie.title || activeMovie.titulo}</h1>
            </div>
          </div>
          <div className="w-full h-[50%]">
            <div className="mx-5 flex items-center justify-start my-5">
              {
                switchButtons
                  ? <DeleteButton movie={activeMovie} setSwitchButtons={setSwitchButtons} />
                  : <AddButton movie={activeMovie} setSwitchButtons={setSwitchButtons} />
              }
            </div>
            <p className="w-full text-gray-200 p-5">{trunckarTexto(activeMovie.overview || activeMovie.desc, 428)}</p>
          </div>
          <button
            onClick={cerrarModal}
            className='absolute top-2 right-3 text-3xl hover:text-[#E50608] transition-all ease-in-out delay-50 hover:scale-110'
          >
            <BsBoxArrowRight />
          </button>
        </div>
      </div>
    </div>
  )
}
