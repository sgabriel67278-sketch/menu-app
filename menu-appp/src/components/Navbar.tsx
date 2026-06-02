import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav
      className="bg-linear-to-r from-amber-950 via-red-950 to-stone-950
                 border-b border-amber-700/40 px-6 py-4
                 flex items-center justify-between
                 shadow-lg backdrop-blur-sm sticky top-0 z-50"
    >
      <Link
        to="/"
        className="text-amber-100 text-2xl font-extrabold tracking-wider
                   hover:text-amber-300 transition-colors duration-300"
      >
      </Link>

      <div className="flex items-center gap-6">
        <Link
          to="/"
          className="text-amber-100 hover:text-yellow-300 text-sm md:text-base
                     font-medium transition-all duration-300
                     hover:scale-105"
        >
          Inicio
        </Link>

        <Link
          to="/menu"
          className="text-amber-100 hover:text-yellow-300 text-sm md:text-base
                     font-medium transition-all duration-300
                     hover:scale-105"
        >
          Menú
        </Link>

        {usuario ? (
          <>
            <Link
              to="/admin"
              className="text-amber-100 hover:text-yellow-300 text-sm md:text-base
                         font-medium transition-all duration-300
                         hover:scale-105"
            >
              Administración
            </Link>

            <span
              className="text-amber-300/70 text-xs hidden sm:block
                         bg-black/20 px-3 py-1 rounded-full"
            >
              {usuario.email}
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-900 hover:bg-red-800
                         text-white text-sm font-semibold
                         px-5 py-2 rounded-xl
                         shadow-md hover:shadow-lg
                         transition-all duration-300
                         hover:scale-105"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-amber-700 hover:bg-amber-600
                       text-white text-sm font-bold
                       px-5 py-2 rounded-xl
                       shadow-md hover:shadow-lg
                       transition-all duration-300
                       hover:scale-105"
          >
            Admin
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;