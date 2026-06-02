import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const ok = await login(email, password);

    if (ok) {
      navigate("/admin");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-stone-950 via-red-950 to-amber-950 text-white">
      <Header
        titulo="Iniciar Sesión"
        descripcion="Acceso administrativo"
      />

      <Navbar />

      <div className="flex justify-center px-6 py-12">

        <div
          className="w-full max-w-md
                     bg-linear-to-b from-stone-900 to-red-950
                     border border-amber-700/30
                     rounded-3xl
                     p-8
                     shadow-2xl"
        >
          <div className="text-center mb-8">

            <div className="text-6xl mb-3">
              🥩
            </div>

            <h2 className="text-2xl font-extrabold text-amber-100">
              Panel Administrativo
            </h2>

            <p className="text-amber-200/70 text-sm mt-2">
              Autenticación de administrador
            </p>

          </div>

          <div className="mb-5">
            <label className="block text-amber-200 text-sm mb-2 font-medium">
              Correo
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full bg-black/20 text-amber-100
                         border border-amber-700/30
                         rounded-xl px-4 py-3
                         placeholder:text-amber-200/40
                         focus:outline-none
                         focus:border-amber-500
                         focus:ring-2
                         focus:ring-amber-600/30"
              placeholder="admin@parrillero.com"
            />
          </div>

          <div className="mb-8">
            <label className="block text-amber-200 text-sm mb-2 font-medium">
              Contraseña
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full bg-black/20 text-amber-100
                         border border-amber-700/30
                         rounded-xl px-4 py-3
                         placeholder:text-amber-200/40
                         focus:outline-none
                         focus:border-amber-500
                         focus:ring-2
                         focus:ring-amber-600/30"
              placeholder="••••••••"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full
                       bg-amber-700 hover:bg-amber-600
                       text-white font-bold
                       py-3 rounded-xl
                       shadow-lg hover:shadow-xl
                       transition-all duration-300"
          >
            Ingresar al Panel
          </button>

          <div className="mt-4 text-center text-amber-200/80 text-sm">
            ¿No tienes cuenta?{' '}
            <Link
              to="/register"
              className="text-amber-100 underline hover:text-yellow-300"
            >
              Registrarse
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;