import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import PlatoList from "../components/PlatoList";

import usePlato from "../hooks/usePlato";
import useCategoria from "../hooks/useCategoria";

const Menu = () => {
  // Hook para navegar entre rutas
  const navigate = useNavigate();

  // Navega al detalle del plato seleccionado
  const handleVerDetalle = (id: number) => {
    navigate(`/menu/${id}`);
  };

  // Obtiene los platos desde Supabase
  const { platos, cargando } = usePlato();

  // Obtiene las categorías desde Supabase
  const { categorias } = useCategoria();

  // Estado para el texto del buscador
  const [busqueda, setBusqueda] = useState("");

  // Estado para almacenar la categoría seleccionada
  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState<number | null>(null);

  // Restablece todos los filtros
  const handleRestablecer = () => {
    setBusqueda("");
    setCategoriaSeleccionada(null);
  };

  // Filtra los platos por nombre y categoría
  const platosFiltrados = useMemo(() => {
    return platos.filter((plato) => {
      // Busca la categoría correspondiente al plato
      const categoria = categorias.find(
        (c) => c.id === plato.categoria_id
      );

      // Verifica si coincide con el texto de búsqueda
      const coincideBusqueda =
        plato.nombre
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        categoria?.nombre
          .toLowerCase()
          .includes(busqueda.toLowerCase());

      // Verifica si coincide con la categoría seleccionada
      const coincideCategoria =
        categoriaSeleccionada === null ||
        plato.categoria_id === categoriaSeleccionada;

      // Debe cumplir ambos filtros
      return coincideBusqueda && coincideCategoria;
    });
  }, [
    platos,
    categorias,
    busqueda,
    categoriaSeleccionada,
  ]);

  return (
    <div className="min-h-screen bg-linear-to-b from-stone-950 via-red-950 to-amber-950 text-white">
      {/* Encabezado principal */}
      <Header
        titulo='Churrasquería "El Parrillero"'
        descripcion="Explora nuestro menú completo"
      />

      {/* Barra de navegación */}
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Título de la sección */}
        <h2 className="text-4xl font-extrabold text-amber-100 mb-8">
          Nuestro Menú
        </h2>

        {/* Buscador */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar plato o categoría..."
            value={busqueda}
            onChange={(e) =>
              setBusqueda(e.target.value)
            }
            className="w-full bg-black/20
                       border border-amber-700/30
                       rounded-xl px-4 py-3
                       text-amber-100
                       placeholder:text-amber-200/40
                       focus:outline-none
                       focus:border-amber-500
                       focus:ring-2
                       focus:ring-amber-600/30"
          />
        </div>

        {/* Filtro por categorías */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {/* Botón para mostrar todas las categorías */}
          <button
            onClick={() =>
              setCategoriaSeleccionada(null)
            }
            className={`px-4 py-2 rounded-xl text-sm transition-all duration-300
            ${
              categoriaSeleccionada === null
                ? "bg-amber-700 text-white"
                : "bg-black/20 text-amber-100 border border-amber-700/20"
            }`}
          >
            Todas
          </button>

          {/* Lista dinámica de categorías */}
          {categorias.map((categoria) => (
            <button
              key={categoria.id}
              onClick={() =>
                setCategoriaSeleccionada(categoria.id)
              }
              className={`px-4 py-2 rounded-xl text-sm transition-all duration-300
              ${
                categoriaSeleccionada === categoria.id
                  ? "bg-amber-700 text-white"
                  : "bg-black/20 text-amber-100 border border-amber-700/20"
              }`}
            >
              {categoria.nombre}
            </button>
          ))}

          {/* Limpia todos los filtros */}
          <button
            onClick={handleRestablecer}
            className="px-4 py-2 rounded-xl text-sm
                       bg-red-800 hover:bg-red-700
                       text-white transition-all duration-300"
          >
            Restablecer
          </button>
        </div>

        {/* Muestra la cantidad de platos encontrados */}
        <p className="text-amber-200/70 text-sm mb-6">
          Se encontraron {platosFiltrados.length} plato
          {platosFiltrados.length !== 1 ? "s" : ""}
        </p>

        {/* Estado de carga o listado de platos */}
        {cargando ? (
          <p className="text-amber-200/70">
            Cargando platos...
          </p>
        ) : (
          <PlatoList
            platos={platosFiltrados}
            onEditar={() => {}}
            onEliminar={() => {}}
            onVerDetalle={handleVerDetalle}
          />
        )}
      </main>
    </div>
  );
};

export default Menu;