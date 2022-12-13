import { Link } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { FcGoogle } from "react-icons/fc";
import { useAuthStore, useForm } from "../../hooks";
import { Loading } from "../components";

export const LoginPage = () => {

  const { onInputChange, email, password } = useForm({ email: '', password: '' });

  const { signInWithGoogle, status } = useAuthStore();

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  const handleGoogleSignIn = () => {
    signInWithGoogle();
  }
  const activadorButtons = (status) => {
    if (status === 'checking') {
      return false;
    }
    return true;
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
          <div className="absolute w-full px-4 py-24 z-50">
            <div className="max-w-[600px] h-[680px] mx-auto bg-black/75 text-white">
              <div className="max-w-[400px] mx-auto py-16">
                <h1 className="text-3xl font-bold text-center">Iniciar sesión</h1>
                <p className="text-[#E50608] text-sm font-extrabold my-4 text-center hover:cursor-help">
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

                  {/* Contraseña */}
                  <input
                    className="p-3 my-2 bg-gray-700 rounded"
                    type="password"
                    name="password"
                    onChange={onInputChange}
                    placeholder="Contraseña"
                    value={password}
                  />
                  <div>
                    <input className="cursor-pointer accent-red-600" type="checkbox" id="checkbox1" />
                    <label className="ml-3" htmlFor="checkbox1">Mostrar Contraseña</label>
                  </div>
                  {/* Botones */}
                  <button
                    className={`${activadorButtons(status) 
                      ?'bg-red-600 p-5 my-5 rounded font-bold' 
                      :'bg-[#870a0a] p-5 my-5 rounded font-bold '} `
                    }
                    disabled={!activadorButtons(status)}
                  >
                    {
                      activadorButtons(status)
                        ? 'Iniciar sesión'
                        : <Loading />
                    }
                  </button>
                  <button
                    onClick={handleGoogleSignIn}
                    className="bg-white text-black p-5 mb-4 rounded font-bold flex items-center border-white hover:border-[#E50608] justify-center min-w-[136.2px]"
                  >
                    {activadorButtons(status) && 'Iniciar con'}
                    <FcGoogle className={`${activadorButtons(status) ? 'ml-1':'hidden'}`} />
                    {activadorButtons(status) && 'oogle'}
                    {!activadorButtons(status) && <Loading/>}
                  </button>
                  <button className="bg-transparent border border-white hover:border-[#E50608] p-5 rounded font-bold">
                    {
                      activadorButtons(status)
                        ? 'Entrar como invitado'
                        : <Loading />
                    }
                  </button>
                  <hr className="bg-gray-700 mt-3" />
                  <p className="py-8 text-sm">
                    <span className="text-gray-600">Aún no tienes una cuenta de Fakeflix?, </span>
                    <Link className="text-[#E50608] hover:underline" to='/auth/registro'>Registrate!</Link>
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
