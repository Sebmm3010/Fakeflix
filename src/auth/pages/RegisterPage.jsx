import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { AuthLayout } from "../layout/AuthLayout";

export const RegisterPage = () => {
  const { onInputChange, email, password, password2 } = useForm({ email: '', password: '', password2:'' });

  const handleSubmit = (event) => {
    event.preventDefault();
  }
  return (
    <>
      <AuthLayout>
        <div className="w-full h-screen">
          <img
            className="hidden sm:block absolute w-full h-full object-cover"
            src="https://assets.nflxext.com/ffe/siteui/vlv3/ac9aedf1-a687-4c5d-965c-2fc3eac84aea/cd5501f9-6c52-48c6-8689-b974bb69bc90/CO-es-20221206-popsignuptwoweeks-perspective_alpha_website_large.jpg"
            alt="bg"
          />
          <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
          <div className="fixed w-full px-4 py-24 z-50">
            <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
              <div className="max-w-[320px] mx-auto py-16">
                <h1 className="text-3xl font-bold text-center">Crea una cuenta</h1>
                <p className="text-[#DC2626] text-sm font-bold my-4">
                  <span className="underline">Atencion</span>: Esta es una página copia de Netflix, no use sus credenciales reales.
                </p>
                <form
                  className="w-full flex flex-col py-4"
                  onSubmit={handleSubmit}
                >
                  {/* Email */}
                  <input
                    autoComplete="email"
                    className="p-3 my-2 bg-gray-700 rounded"
                    type="email"
                    name="email"
                    onChange={onInputChange}
                    placeholder="Email@email.com"
                    value={email}
                  />

                  {/* Contraseñas */}
                  <input
                    className="p-3 my-2 bg-gray-700 rounded"
                    type="password"
                    name="password"
                    onChange={onInputChange}
                    placeholder="Contraseña"
                    value={password}
                  />

                  <input
                    className="p-3 my-2 bg-gray-700 rounded"
                    type="password"
                    name="password2"
                    onChange={onInputChange}
                    placeholder="Contraseña"
                    value={password2}
                  />
                  <div>
                    <input className="cursor-pointer accent-red-600" type="checkbox" id="checkbox1" />
                    <label className="ml-3" htmlFor="checkbox1">Mostrar Contraseña</label>
                  </div>
                  <button className="bg-red-600 py-3 my-6 rounded font-bold">
                    Crear cuenta
                  </button>
                  <hr className="bg-gray-700" />
                  <p className="py-8 text-sm">
                    <span className="text-gray-600">Ya cuentas con una cuenta de Fakeflix?, </span>
                    <Link className="text-red-600 hover:underline" to='/auth/registro'>Iniciar sesión</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  )
}
