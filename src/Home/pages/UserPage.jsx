import { useMovieStore } from '../../hooks';
import { Modal, RailItem } from '../components';
import { HomeLayout } from '../layout/HomeLayout';

export const UserPage = () => {
  const { moviesRedux: movies, showModal } = useMovieStore();
  return (
    <>
      <HomeLayout>
        <div className='w-full text-white'>
          <img
            className="w-full h-[400px] object-cover"
            src="https://assets.nflxext.com/ffe/siteui/vlv3/ac9aedf1-a687-4c5d-965c-2fc3eac84aea/cd5501f9-6c52-48c6-8689-b974bb69bc90/CO-es-20221206-popsignuptwoweeks-perspective_alpha_website_large.jpg"
            alt="bg"
          />
          <div className="bg-black/60 fixed top-0 left-0 w-full h-[400px]"></div>
          <div className='absolute top-[30%] p-4 md:p-8'>
            <h1 className='text-3xl md:5xl font-bold'>Tu lista</h1>
          </div>
        </div>
        <div className="relative flex items-center group animate__animated animate__fadeIn animate__slow my-5 h-[100%]">
          <div className="w-full h-full relative">
            {
              movies.map((movie) => (
                <RailItem key={movie.movieId} movie={movie} />
              ))
            }
          </div>
        </div>
        {
          showModal
            ? <Modal />
            : <></>
        }
      </HomeLayout>
    </>
  )
}
