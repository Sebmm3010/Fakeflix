import { Link } from "react-router-dom"

export const Navbar = () => {
  return (
    <>
      <nav className="flex items-center justify-between p-4 z-[100] absolute w-full">
        <Link to='/'>
          <h1 className="text-red-600 text-4xl font-bold cursor-pointer logo">FAKEFLIX</h1>
        </Link>

        <div>
          <button className="text-white pr-4">Regístrate</button>
          <button className="bg-red-600 px-6 py-2 rounded">Iniciar sesión</button>
        </div>
      </nav>
    </>
  )
}
