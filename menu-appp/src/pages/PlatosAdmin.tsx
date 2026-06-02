import { useState } from "react";
import { useNavigate } from "react-router";

import Header from "../components/Header";
import Navbar from "../components/Navbar";

import PlatoList from "../components/PlatoList";
import PlatoForm from "../components/PlatoForm";

import usePlato from "../hooks/usePlato";

import type { Plato } from "../types/Plato";
import type { PlatoInput } from "../hooks/usePlato";

const PlatosAdmin = () => {
  // Permite navegar hacia otras rutas desde código
  const navigate = useNavigate();

  // Hook encargado de cargar y administrar todas las operaciones CRUD de platos
  const {
    platos,
    cargando,
    error,
    crearPlato,
    actualizarPlato,
    eliminarPlato,
  } = usePlato();

  // Controla la visualización del formulario
  const [mostrarFormulario, setMostrarFormulario] =
    useState(false);

  // Guarda el plato seleccionado cuando se edita
  const [platoEditando, setPlatoEditando] =
    useState<Plato | null>(null);

  // Prepara el formulario para registrar un nuevo plato
  const handleNuevo = () => {
    setPlatoEditando(null);
    setMostrarFormulario(true);
  };

  // Carga los datos del plato seleccionado en el formulario
  const handleEditar = (plato: Plato) => {
    setPlatoEditando(plato);
    setMostrarFormulario(true);
  };

  // Solicita confirmación antes de eliminar un registro
  const handleEliminar = async (id: number) => {
    const confirmar = confirm(
      "¿Deseas eliminar este plato?"
    );

    if (!confirmar) return;

    await eliminarPlato(id);
  };

  // Abre la vista pública de detalle del plato
  const handleVerDetalle = (id: number) => {
    navigate(`/menu/${id}`);
  };

  // Decide si se crea o actualiza un plato según el contexto actual
  const handleGuardar = async (
    datos: PlatoInput
  ) => {
    const ok = platoEditando
      ? await actualizarPlato(
          platoEditando.id,
          datos
        )
      : await crearPlato(datos);

    // Si la operación fue exitosa se cierra el formulario
    if (ok) {
      setMostrarFormulario(false);
      setPlatoEditando(null);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-stone-950 via-red-950 to-amber-950 text-white">
      {/* Encabezado principal de la página */}
      <Header
        titulo="Administración de Platos"
        descripcion="CRUD completo de platos"
      />

      {/* Navegación principal compartida */}
      <Navbar />

      <main className="max-w-7xl mx-auto p-6">

        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">

          <div>
            <h2 className="text-3xl font-extrabold text-amber-100">
              Platos del Menú
            </h2>

            <p className="text-amber-200/70 text-sm mt-1">
              Gestiona los platos disponibles en la churrasquería
            </p>
          </div>

          {/* Botón para registrar nuevos platos */}
          <button
            onClick={handleNuevo}
            className="px-6 py-3 rounded-xl
                       bg-amber-700 hover:bg-amber-600
                       text-white font-bold
                       shadow-lg hover:shadow-xl
                       transition-all duration-300"
          >
            + Nuevo Plato
          </button>

        </div>

        {/* Formulario reutilizado para crear o editar */}
        {mostrarFormulario && (
          <PlatoForm
            plato={platoEditando ?? undefined}
            onGuardar={handleGuardar}
            onCancelar={() =>
              setMostrarFormulario(false)
            }
          />
        )}

        {/* Estado de carga mientras llegan los datos */}
        {cargando && (
          <div
            className="bg-black/20
                       border border-amber-700/20
                       rounded-2xl p-6 text-center"
          >
            <p className="text-amber-100/70">
              Cargando platos...
            </p>
          </div>
        )}

        {/* Muestra errores provenientes de Supabase */}
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

        {/* Lista principal de platos */}
        {!cargando && (
          <PlatoList
            platos={platos}
            onEditar={handleEditar}
            onEliminar={handleEliminar}
            onVerDetalle={handleVerDetalle}
            esAdmin={true}
          />
        )}
      </main>
    </div>
  );
};

export default PlatosAdmin;