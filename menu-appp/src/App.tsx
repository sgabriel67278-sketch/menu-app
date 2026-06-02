import {
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import PlatosAdmin from "./pages/PlatosAdmin";
import PlatoDetail from "./components/PlatoDetail";
import CategoriasAdmin from "./pages/CategoriasAdmin";

import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Routes>

      {/* Página principal pública */}
      <Route
        path="/"
        element={<Home />}
      />

      {/* Menú público accesible para cualquier visitante */}
      <Route
        path="/menu"
        element={<Menu />}
      />

      {/* Pantalla de autenticación del administrador */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* Pantalla de registro de administrador */}
      <Route
        path="/register"
        element={<Register />}
      />

      {/* Panel principal de administración protegido */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />

      {/* Gestión CRUD de platos */}
      <Route
        path="/admin/platos"
        element={
          <ProtectedRoute>
            <PlatosAdmin />
          </ProtectedRoute>
        }
      />

      {/* Vista detallada de un plato seleccionado */}
      <Route
        path="/menu/:id"
        element={<PlatoDetail />}
      />

      {/* Gestión CRUD de categorías */}
      <Route
        path="/admin/categorias"
        element={
          <ProtectedRoute>
            <CategoriasAdmin />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
};

export default App;