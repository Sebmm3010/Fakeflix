import { Link } from "react-router-dom"
import { IoExitOutline } from "react-icons/io5";
import { separaStrings } from "../../helpers";
import { useHomeComponents } from "../hooks/useHomeComponents";

export const Navbar = () => {
  const { user, handleLogout }= useHomeComponents();
  const name = separaStrings(user.displayName);
  return (
    <>
      <nav className="flex items-center justify-between p-4 z-[100] absolute w-full">
        <Link to='/'>
          <h1 className="text-red-600 text-4xl font-bold cursor-pointer logo">FAKEFLIX</h1>
        </Link>

        <div className="flex items-center">
          <Link to='/user'>
            <button className="text-white pr-4 capitalize">
              {name ? name : user.displayName}
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 px-6 py-2 rounded flex items-center"
          >
            <IoExitOutline className="mr-2" /> Salir
          </button>
        </div>
      </nav>
    </>
  )
}
