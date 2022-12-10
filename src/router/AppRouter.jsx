import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRouter } from "../auth/routes/AuthRouter";
import { Home } from "../Home/pages";
import { HomeRoutes } from "../Home/routes/HomeRouter";

export const AppRouter = () => {
  const { status } = useSelector(state => state.auth);
  return (
    <Routes>
      {
        (status === 'authenticated')
          ? <Route path="/*" element={<HomeRoutes/>}/>
          : <Route path="auth/*" element={<AuthRouter/>} />
      }
      <Route path="/*" element={<Navigate to='/auth/login' />} />
    </Routes>
  )
}
