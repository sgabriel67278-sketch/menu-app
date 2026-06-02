import { useState } from "react";

import Header from "../components/Header";
import Navbar from "../components/Navbar";

import CategoriaForm from "../components/CategoriaForm";
import CategoriaList from "../components/CategoriaList";

import useCategoria from "../hooks/useCategoria";

import type { Categoria } from "../types/Categoria";
import type { CategoriaInput } from "../hooks/useCategoria";

const CategoriasAdmin = () => {
  // Hook encargado de toda la lógica CRUD de categorías
  const {
    categorias,
    cargando,
    error,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria,
  } = useCategoria();

  // Controla si el formulario debe mostrarse o permanecer oculto
  const [mostrarFormulario, setMostrarFormulario] =
    useState(false);

  // Guarda la categoría seleccionada cuando se edita una existente
  const [categoriaEditando, setCategoriaEditando] =
    useState<Categoria | null>(null);

  // Prepara el formulario para registrar una nueva categoría
  const handleNuevo = () => {
    setCategoriaEditando(null);
    setMostrarFormulario(true);
  };

  // Envía la categoría seleccionada al formulario para editarla
  const handleEditar = (
    categoria: Categoria
  ) => {
    setCategoriaEditando(categoria);
    setMostrarFormulario(true);
  };

  // Solicita confirmación antes de eliminar una categoría
  const handleEliminar = async (
    id: number
  ) => {
    const confirmar = confirm(
      "¿Deseas eliminar esta categoría?"
    );

    if (!confirmar) return;

    await eliminarCategoria(id);
  };

  // Decide si se crea una categoría nueva o se actualiza una existente
  const handleGuardar = async (
    datos: CategoriaInput
  ) => {
    const ok = categoriaEditando
      ? await actualizarCategoria(
          categoriaEditando.id,
          datos
        )
      : await crearCategoria(datos);

    // Si la operación fue exitosa se cierra el formulario
    if (ok) {
      setMostrarFormulario(false);
      setCategoriaEditando(null);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-stone-950 via-red-950 to-amber-950 text-white">
      {/* Encabezado principal de la página */}
      <Header
        titulo="Administración de Categorías"
        descripcion="CRUD completo de categorías"
      />

      {/* Barra de navegación compartida con el resto del sistema */}
      <Navbar />

      <main className="max-w-7xl mx-auto p-6">

        {/* Encabezado de la sección y botón para registrar categorías */}
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">

          <div>
            <h2 className="text-3xl font-extrabold text-amber-100">
              Categorías
            </h2>

            <p className="text-amber-200/70 text-sm mt-1">
              Gestiona las categorías del menú de la churrasquería
            </p>
          </div>

          <button
            onClick={handleNuevo}
            className="px-6 py-3 rounded-xl
                       bg-amber-700 hover:bg-amber-600
                       text-white font-bold
                       shadow-lg hover:shadow-xl
                       transition-all duration-300"
          >
            + Nueva Categoría
          </button>
        </div>

        {/* Formulario reutilizable para crear o editar categorías */}
        {mostrarFormulario && (
          <CategoriaForm
            categoria={categoriaEditando ?? undefined}
            onGuardar={handleGuardar}
            onCancelar={() =>
              setMostrarFormulario(false)
            }
          />
        )}

        {/* Mensaje mostrado mientras se cargan los datos desde Supabase */}
        {cargando && (
          <div
            className="bg-black/20
                       border border-amber-700/20
                       rounded-2xl p-6 text-center"
          >
            <p className="text-amber-100/70">
              Cargando categorías...
            </p>
          </div>
        )}

        {/* Muestra errores provenientes de consultas o modificaciones */}
        {error && (
          <div
            className="bg-red-900/30
                       border border-red-700/50
                       rounded-2xl p-4"
          >
            <p className="text-red-200">
              {error}
            </p>
          </div>
        )}

        {/* Lista principal de categorías con acciones de administración */}
        {!cargando && (
          <CategoriaList
            categorias={categorias}
            onEditar={handleEditar}
            onEliminar={handleEliminar}
            esAdmin={true}
          />
        )}
      </main>
    </div>
  );
};

export default CategoriasAdmin;