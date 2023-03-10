import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRouter } from "../auth/routes/AuthRouter";
import { HomeRoutes } from "../Home/routes/HomeRouter";
import { useAuthStore, useMovieStore } from "../hooks";

export const AppRouter = () => {

  const { status, user, checkingAuth } = useAuthStore();

  const { cargarFavorites } = useMovieStore();

  checkingAuth();
  
  useEffect(() => {
    cargarFavorites();
  }, [user.uid]);


  return (
    <Routes>
      {
        (status === 'authenticated')
          // Principal
          ? <Route path="/*" element={<HomeRoutes />} />
          // Autenticacion
          : <Route path="auth/*" element={<AuthRouter />} />
      }
      <Route path="/*" element={<Navigate to='/auth/login' />} />
    </Routes>
  )
}
