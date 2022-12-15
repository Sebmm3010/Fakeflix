import { memo } from "react";
import { Hero, Navbar, Rail } from "../components";
import { HomeLayout } from "../layout/HomeLayout";

export const Home = memo(() => {
  return (
    <>
      <HomeLayout>
        <Hero />
        <Rail rowId='1' titulo='Proximamente' options={{ opt: 'soon' }} />
        <Rail rowId='2' titulo='Populares' options={{ opt: 'popular', page: 2 }} />
        <Rail rowId='3' titulo='Lo mejor del momento' options={{ opt: 'popular', page: 1 }} />
        <Rail rowId='4' titulo='Lo mas votado' options={{ opt: 'top' }} />
        <Rail rowId='5' titulo='Acción' options={{ opt: 'categoria', type: 'action' }} />
        <Rail rowId='6' titulo='Horror' options={{ opt: 'categoria', type: 'horror' }} />
      </HomeLayout>
    </>
  )
})
