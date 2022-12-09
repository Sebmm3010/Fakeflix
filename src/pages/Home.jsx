import { Hero, Rail } from "../components";
import { getMovies } from "../services/getmovies";

export const Home = () => {
  return (
    <>
      <Hero/>
      <Rail titulo='Proxmamente' info={getMovies({ opt: 'coming' })} />
      <Rail titulo='Populares' info={getMovies({ opt: 'popular', page:2 })} />
      <Rail titulo='Lo mejor del momento' info={getMovies({ opt: 'popular', page:1 })} />
      <Rail titulo='Lo mas votado' info={getMovies({ opt: 'top' })} />
      <Rail titulo='Acción' info={getMovies({ opt: 'categoria', type: 'action' })} />
      <Rail titulo='Horror' info={getMovies({ opt: 'categoria', type: 'horror' })}/>
    </>
  )
}
