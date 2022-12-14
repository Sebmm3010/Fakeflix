import { Link } from "react-router-dom"
import { useAuthStore } from "../../hooks";
import { IoExitOutline } from "react-icons/io5";

export const Navbar = () => {
  const { user }= useAuthStore();
  return (
    <>
      <nav className="flex items-center justify-between p-4 z-[100] absolute w-full">
        <Link to='/'>
          <h1 className="text-red-600 text-4xl font-bold cursor-pointer logo">FAKEFLIX</h1>
        </Link>

        <div className="flex">
          <button className="text-white pr-4">
            {user.displayName}
          </button>
          <button className="bg-red-600 px-6 py-2 rounded flex items-center">
           <IoExitOutline className="mr-2"/> Salir
          </button>
        </div>
      </nav>
    </>
  )
}
