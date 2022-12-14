import { useState } from "react";
import { Link } from "react-router-dom";
import { activadorButtons, formValidations } from "../../helpers";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useForm } from "../../hooks/useForm";
import { Loading } from "../components";
import { AuthLayout } from "../layout/AuthLayout";

const formInit = { displayName: '', email: '', password: '', password2: '' }

export const RegisterPage = () => {
  const { onInputChange,
    displayName,
    email,
    password,
    password2,
    formState
  } = useForm(formInit);

  const [show, setShow] = useState(true);
  const { status, registerWithEmailAndPassword }=useAuthStore()

  const handleShowPassword = () => {
    setShow(!show);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const { displayName, email, password, password2 } = formState;

    if (!formValidations({ str: displayName, min: 3, type: 'normal' }) || !formValidations({ str: password, min: 6, type: 'normal' }))
    return;
    if (password !== password2) return;
    if (!formValidations({str:email,type:'email'})) return;
    registerWithEmailAndPassword(formState)

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
            <div className="max-w-[450px] h-[700px] mx-auto bg-black/75 text-white">
              <div className="max-w-[320px] mx-auto py-16">
                <h1 className="text-3xl font-bold text-center">Crea una cuenta</h1>
                <p className="text-[#DC2626] text-sm font-bold my-4">
                  <span className="underline">Atencion</span>:<br /> *El nombre debe tener minimo 3 caracteres sin espacios. <br />
                  *La Contraseña debe tener como minimo 6 caracteres sin espacios.
                </p>
                <form
                  className="w-full flex flex-col py-4"
                  onSubmit={handleSubmit}
                >
                  {/* Nombre */}
                  <input
                    className="p-3 my-2 bg-gray-700 rounded"
                    type="text"
                    name="displayName"
                    onChange={onInputChange}
                    placeholder="Nombre"
                    value={displayName}
                  />
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
                    type={
                      show
                        ? 'password'
                        : 'text'
                    }
                    name="password"
                    onChange={onInputChange}
                    placeholder="Contraseña"
                    value={password}
                  />

                  <input
                    className="p-3 my-2 bg-gray-700 rounded"
                    type={
                      show
                        ? 'password'
                        : 'text'
                    }
                    name="password2"
                    onChange={onInputChange}
                    placeholder="Repita la Contraseña"
                    value={password2}
                  />
                  <div>
                    <input
                      onChange={handleShowPassword}
                      className="cursor-pointer accent-red-600"
                      type="checkbox"
                      id="checkbox1"
                    />
                    <label className="ml-3" htmlFor="checkbox1">Mostrar Contraseña</label>
                  </div>
                  {/* Botone */}
                  <button
                    className={`${activadorButtons(status)
                      ? 'bg-red-600 p-5 my-5 rounded font-bold'
                      : 'bg-[#870a0a] p-5 my-5 rounded font-bold '} `
                    }
                    disabled={!activadorButtons(status)}
                  >
                    {
                      activadorButtons(status)
                        ? 'Crear cuenta'
                        : <Loading />
                    }
                  </button>
                  <hr className="bg-gray-700" />
                  <p className="py-8 text-sm">
                    <span className="text-gray-600">Ya tienes cuenta de Fakeflix?, </span>
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
