import { Hero, Rail } from "../components";

export const Home = () => {
  return (
    <>
      <Hero />
      <Rail titulo='Proximamente' options={{opt:'soon'}} />
      <Rail titulo='Populares' options={{ opt: 'popular', page: 2 }} />
      <Rail titulo='Lo mejor del momento' options={{ opt: 'popular', page: 1 }} />
      <Rail titulo='Lo mas votado' options={{ opt: 'top' }} />
      <Rail titulo='Acción' options={{ opt: 'categoria', type: 'action' }} />
      <Rail titulo='Horror' options={{ opt: 'categoria', type: 'horror' }} />
    </>
  )
}
