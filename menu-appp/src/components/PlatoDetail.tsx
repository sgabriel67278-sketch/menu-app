import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { supabase } from "../lib/supabaseClient";
import type { Plato } from "../types/Plato";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

const PlatoDetail = () => {
  
  // Obtiene el id enviado por la ruta para cargar el plato seleccionado
  const { id } = useParams<{ id: string }>();

  // Permite volver a la página anterior desde el detalle
  const navigate = useNavigate();

  // Almacena la información completa del plato consultado
  const [plato, setPlato] = useState<Plato | null>(null);

  // Controla el estado de carga mientras se consulta Supabase
  const [cargando, setCargando] = useState<boolean>(true);

  // Guarda mensajes de error si ocurre algún problema durante la consulta
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    // Consulta el plato seleccionado utilizando el id recibido por la URL
    const cargarPlato = async () => {
      if (!id) return;

      setCargando(true);
      setError(null);

      // Se obtiene el plato junto con el nombre de la categoría relacionada
      const { data, error: supabaseError } = await supabase
        .from("platos")
        .select(`
          *,
          categorias (
            nombre
          )
        `)
        .eq("id", parseInt(id))
        .single();

      if (supabaseError) {
        setError("Plato no encontrado.");
      } else {
        setPlato(data as Plato);
      }

      setCargando(false);
    };

    cargarPlato();

    // Se vuelve a ejecutar si cambia el id de la ruta
  }, [id]);

  return (
    <div className="min-h-screen bg-linear-to-b from-stone-950 via-red-950 to-amber-950">

      {/* Encabezado principal utilizado en las páginas públicas */}
      <Header
        titulo='Churrasquería "El Parrillero"'
        descripcion="Explora nuestro menú completo"
      />

      {/* Barra de navegación compartida por toda la aplicación */}
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Indicador mostrado mientras se carga la información */}
        {cargando && (
          <p className="text-amber-200/70 text-center text-lg">
            Cargando...
          </p>
        )}

        {/* Mensaje mostrado cuando ocurre algún error en la consulta */}
        {error && (
          <div className="bg-red-900/40 border border-red-700 rounded-2xl p-4 text-red-200 text-sm">
            {error}
          </div>
        )}

        {/* Muestra el detalle únicamente cuando existe información del plato */}
        {plato && (
          <div
            className="bg-linear-to-b from-stone-900 to-red-950
                       border border-amber-700/30
                       rounded-3xl overflow-hidden
                       shadow-2xl"
          >
            {/* Imagen asociada al plato si existe una URL registrada */}
            {plato.imagen && (
              <img
                src={plato.imagen}
                alt={plato.nombre}
                className="w-full h-72 md:h-112.5 object-cover"
              />
            )}

            <div className="p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">

                <h1 className="text-4xl md:text-5xl font-extrabold text-amber-100">
                  {plato.nombre}
                </h1>

                {/* Precio registrado en la base de datos */}
                <p className="text-3xl font-bold text-amber-400">
                  Bs. {plato.precio.toFixed(2)}
                </p>
              </div>

              {/* Muestra el nombre de la categoría obtenida mediante la relación */}
              <div className="mb-6">
                <span
                  className="inline-block px-4 py-2 rounded-full
                             bg-amber-700/20 border border-amber-700/40
                             text-amber-200 text-sm font-medium"
                >
                  {plato.categorias?.nombre}
                </span>
              </div>

              {/* Descripción completa del plato */}
              {plato.descripcion && (
                <p
                  className="text-amber-100/80 text-base md:text-lg
                             leading-relaxed"
                >
                  {plato.descripcion}
                </p>
              )}

              {/* Regresa a la página desde donde el usuario abrió el detalle */}
              <button
                onClick={() => navigate(-1)}
                className="mt-8 px-5 py-3 rounded-xl
                           bg-black/20 border border-amber-700/30
                           text-amber-100
                           hover:bg-amber-700
                           hover:text-white
                           transition-all duration-300"
              >
                ← Volver
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlatoDetail;