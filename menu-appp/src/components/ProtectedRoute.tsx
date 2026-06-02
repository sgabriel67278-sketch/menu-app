import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({
  children,
}: ProtectedRouteProps) => {
  const { usuario, cargando } = useAuth();

  if (cargando) {
    return (
      <div
        className="min-h-screen
                   bg-linear-to-b from-stone-950 via-red-950 to-amber-950
                   text-amber-100
                   flex items-center justify-center"
      >
        <div
          className="bg-linear-to-b from-stone-900 to-red-950
                     border border-amber-700/30
                     rounded-3xl px-10 py-8
                     shadow-2xl"
        >
          <p className="text-xl font-bold tracking-wide">
            Cargando...
          </p>
        </div>
      </div>
    );
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;