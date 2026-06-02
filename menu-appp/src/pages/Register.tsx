import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    setError(null);

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    const ok = await register(email, password);

    if (ok) {
      navigate("/login");
    } else {
      setError("No se pudo crear la cuenta. Revisa los datos e intenta de nuevo.");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-stone-950 via-red-950 to-amber-950 text-white">
      <Header
        titulo="Registro"
        descripcion="Crea una cuenta para acceder al panel administrativo"
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
            <div className="text-6xl mb-3">🛡️</div>
            <h2 className="text-2xl font-extrabold text-amber-100">
              Crear Cuenta
            </h2>
            <p className="text-amber-200/70 text-sm mt-2">
              Registro de administrador
            </p>
          </div>

          {error && (
            <div className="mb-5 bg-red-900/30 border border-red-700/50 rounded-2xl p-4">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          <div className="mb-5">
            <label className="block text-amber-200 text-sm mb-2 font-medium">
              Correo
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          <div className="mb-5">
            <label className="block text-amber-200 text-sm mb-2 font-medium">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          <div className="mb-8">
            <label className="block text-amber-200 text-sm mb-2 font-medium">
              Confirmar contraseña
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            onClick={handleRegister}
            className="w-full
                       bg-amber-700 hover:bg-amber-600
                       text-white font-bold
                       py-3 rounded-xl
                       shadow-lg hover:shadow-xl
                       transition-all duration-300"
          >
            Crear cuenta
          </button>

          <div className="mt-4 text-center text-amber-200/80 text-sm">
            ¿Ya tienes cuenta?{' '}
            <Link
              to="/login"
              className="text-amber-100 underline hover:text-yellow-300"
            >
              Iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
