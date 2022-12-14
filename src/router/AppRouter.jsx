import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRouter } from "../auth/routes/AuthRouter";
import { HomeRoutes } from "../Home/routes/HomeRouter";
import { useAuthStore } from "../hooks";

export const AppRouter = () => {
  const { status, checkingAuth } = useAuthStore();
  checkingAuth();
  return (
    <Routes>
      {
        (status === 'authenticated')
          // Principal
          ? <Route path="/*" element={<HomeRoutes/>}/>
          // Autenticacion
          : <Route path="auth/*" element={<AuthRouter/>} />
      }
      <Route path="/*" element={<Navigate to='/auth/login' />} />
    </Routes>
  )
}
