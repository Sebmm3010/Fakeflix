import { useEffect, useState } from "react";
import { BsBoxArrowRight } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { trunckarTexto } from "../../helpers";
import { useAuthStore, useMovieStore } from "../../hooks";
import { AddButton } from "./AddButton";
import { DeleteButton } from "./DeleteButton";


export const Modal = () => {

  const { user }= useAuthStore();
  const { moviesRedux, activeMovie, cerrarModal } = useMovieStore();

  const [switchButtons, setSwitchButtons] = useState(false);

  const location=useLocation();

  useEffect(() => {

    if (location.pathname === '/user'){
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

  const handleCerrarModal = () => {
    cerrarModal();
  }

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
              {/* <button className="border text-white border-gray-300 py-2 px-5 myShadow transition ease-in-out delay-50">Ver más tarde</button> */}
              {
                switchButtons
                  ? <DeleteButton movie={activeMovie} switchButtons={switchButtons} setSwitchButtons={setSwitchButtons} />
                  : <AddButton movie={activeMovie} switchButtons={switchButtons} setSwitchButtons={setSwitchButtons} />
              }
            </div>
            <p className="w-full text-gray-200 p-5">{trunckarTexto(activeMovie.overview || activeMovie.desc, 428)}</p>
          </div>
          <button
            onClick={handleCerrarModal}
            className='absolute top-2 right-3 text-3xl hover:text-[#E50608] transition-all ease-in-out delay-50 hover:scale-110'
          >
            <BsBoxArrowRight />
          </button>
        </div>
      </div>
    </div>
  )
}
