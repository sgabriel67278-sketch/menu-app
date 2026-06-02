import { Link } from "react-router";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

const Admin = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-stone-950 via-red-950 to-amber-950 text-white">
      <Header
        titulo="Panel Administrativo"
        descripcion="Administración de la churrasquería"
      />

      <Navbar />

      <main className="max-w-5xl mx-auto p-6 md:p-10">
        <div className="grid md:grid-cols-2 gap-8">

          <Link
            to="/admin/platos"
            className="group
                       bg-linear-to-b from-stone-900 to-red-950
                       border border-amber-700/30
                       rounded-3xl overflow-hidden
                       shadow-xl
                       hover:border-amber-500
                       hover:-translate-y-2
                       hover:shadow-2xl
                       transition-all duration-300"
          >
            <img
              src="https://st2.depositphotos.com/49592816/45937/i/450/depositphotos_459371960-stock-illustration-barbecue-restaurant-logo-icon-barbecue.jpg"
              className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
            />

            <div className="p-6">
              <h2 className="text-2xl font-extrabold text-amber-100 mb-2">
                Administración de Platos
              </h2>

              <p className="text-amber-300 font-medium mb-2">
                Administrar Platos
              </p>

              <p className="text-amber-100/70 text-sm">
                Crear, editar y eliminar platos.
              </p>
            </div>
          </Link>

          <Link
            to="/admin/categorias"
            className="group
                       bg-linear-to-b from-stone-900 to-red-950
                       border border-amber-700/30
                       rounded-3xl overflow-hidden
                       shadow-xl
                       hover:border-amber-500
                       hover:-translate-y-2
                       hover:shadow-2xl
                       transition-all duration-300"
          >
            <img
              src="https://st2.depositphotos.com/49592816/45937/i/450/depositphotos_459371960-stock-illustration-barbecue-restaurant-logo-icon-barbecue.jpg"
              className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
            />

            <div className="p-6">
              <h2 className="text-2xl font-extrabold text-amber-100 mb-2">
                Administración de Categorías
              </h2>

              <p className="text-amber-300 font-medium mb-2">
                Administrar Categorías
              </p>

              <p className="text-amber-100/70 text-sm">
                Crear, editar y eliminar categorías.
              </p>
            </div>
          </Link>

        </div>
      </main>
    </div>
  );
};

export default Admin;