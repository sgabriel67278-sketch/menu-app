import { useState } from "react";
import type { Plato } from "../types/Plato";
import type { PlatoInput } from "../hooks/usePlato";
import useCategoria from "../hooks/useCategoria";

interface PlatoFormProps {
  plato?: Plato;
  onGuardar: (datos: PlatoInput) => void;
  onCancelar: () => void;
}

const FORMULARIO_VACIO: PlatoInput = {
  nombre: "",
  descripcion: "",
  precio: 0,
  categoria_id: 1,
  imagen: "",
};

const PlatoForm = ({
  plato,
  onGuardar,
  onCancelar,
}: PlatoFormProps) => {
  // Obtiene las categorías disponibles para llenar el selector del formulario
  const { categorias } = useCategoria();

  // Si llega un plato desde PlatosAdmin se cargan sus datos para edición,
  // caso contrario se utiliza un formulario vacío para registrar uno nuevo
  const [form, setForm] = useState<PlatoInput>(
    plato
      ? {
          nombre: plato.nombre,
          descripcion: plato.descripcion,
          precio: plato.precio,
          categoria_id: plato.categoria_id,
          imagen: plato.imagen ?? "",
        }
      : FORMULARIO_VACIO
  );

  // Permite reutilizar el mismo formulario para crear y editar registros
  const esModoEdicion = plato !== undefined;

  // Actualiza cualquier campo del formulario sin necesidad de una función por campo
  const handleCampo = (
    campo: keyof PlatoInput,
    valor: string | number
  ) => {
    setForm((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  // Realiza una validación básica antes de enviar la información al componente padre
  const handleEnviar = () => {
    if (!form.nombre.trim()) {
      alert("El nombre del plato es obligatorio.");
      return;
    }

    // La persistencia en Supabase se realiza desde PlatosAdmin mediante el hook usePlato
    onGuardar(form);
  };

  return (
    <div
      className="bg-linear-to-b from-stone-900 to-red-950
                 border border-amber-700/30
                 rounded-3xl p-8
                 w-full max-w-xl mx-auto my-6
                 shadow-2xl"
    >
      <h2 className="text-amber-100 text-2xl font-extrabold mb-6">
        {esModoEdicion ? "Editar plato" : "Nuevo plato"}
      </h2>

      {/* Campo principal utilizado para identificar el plato dentro del menú */}
      <div className="mb-4">
        <label className="block text-amber-200 text-sm mb-2 font-medium">
          Nombre <span className="text-red-400">*</span>
        </label>

        <input
          type="text"
          value={form.nombre}
          onChange={(e) =>
            handleCampo("nombre", e.target.value)
          }
          className="w-full bg-black/20 text-amber-100 rounded-xl px-4 py-3 text-sm
                     border border-amber-700/30
                     placeholder:text-amber-200/40
                     focus:outline-none
                     focus:border-amber-500
                     focus:ring-2
                     focus:ring-amber-600/30"
          placeholder="Ej: Parrillada Especial"
        />
      </div>

      {/* Datos principales utilizados en el catálogo y filtros del menú */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-amber-200 text-sm mb-2 font-medium">
            Precio
          </label>

          <input
            type="number"
            value={form.precio}
            onChange={(e) =>
              handleCampo(
                "precio",
                parseFloat(e.target.value)
              )
            }
            className="w-full bg-black/20 text-amber-100 rounded-xl px-4 py-3 text-sm
                       border border-amber-700/30
                       focus:outline-none
                       focus:border-amber-500
                       focus:ring-2
                       focus:ring-amber-600/30"
            min={0}
            step={0.01}
          />
        </div>

        <div className="flex-1">
          <label className="block text-amber-200 text-sm mb-2 font-medium">
            Categoría
          </label>

          <select
            value={form.categoria_id}
            onChange={(e) =>
              handleCampo(
                "categoria_id",
                parseInt(e.target.value)
              )
            }
            className="w-full bg-black/20 text-amber-100 rounded-xl px-4 py-3 text-sm
                       border border-amber-700/30
                       focus:outline-none
                       focus:border-amber-500
                       focus:ring-2
                       focus:ring-amber-600/30"
          >
            {/* Las opciones provienen de la tabla categorias obtenida mediante useCategoria */}
            {categorias.map((categoria) => (
              <option
                key={categoria.id}
                value={categoria.id}
              >
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* URL utilizada para mostrar la imagen en las tarjetas y detalles del plato */}
      <div className="mb-4">
        <label className="block text-amber-200 text-sm mb-2 font-medium">
          URL Imagen
        </label>

        <input
          type="text"
          value={form.imagen ?? ""}
          onChange={(e) =>
            handleCampo("imagen", e.target.value)
          }
          className="w-full bg-black/20 text-amber-100 rounded-xl px-4 py-3 text-sm
                     border border-amber-700/30
                     placeholder:text-amber-200/40
                     focus:outline-none
                     focus:border-amber-500
                     focus:ring-2
                     focus:ring-amber-600/30"
          placeholder="https://..."
        />
      </div>

      {/* Información descriptiva que se muestra en la vista detallada del plato */}
      <div className="mb-6">
        <label className="block text-amber-200 text-sm mb-2 font-medium">
          Descripción
        </label>

        <textarea
          value={form.descripcion}
          onChange={(e) =>
            handleCampo("descripcion", e.target.value)
          }
          rows={4}
          className="w-full bg-black/20 text-amber-100 rounded-xl px-4 py-3 text-sm
                     border border-amber-700/30
                     placeholder:text-amber-200/40
                     focus:outline-none
                     focus:border-amber-500
                     focus:ring-2
                     focus:ring-amber-600/30
                     resize-none"
          placeholder="Descripción del plato..."
        />
      </div>

      {/* Las acciones son delegadas al componente padre para mantener separado el CRUD */}
      <div className="flex gap-3 justify-end">
        <button
          onClick={onCancelar}
          className="px-5 py-2.5 rounded-xl text-sm
                     text-amber-100
                     bg-black/20
                     border border-amber-700/20
                     hover:bg-black/40
                     transition-all duration-300"
        >
          Cancelar
        </button>

        <button
          onClick={handleEnviar}
          className="px-5 py-2.5 rounded-xl text-sm font-bold text-white
                     bg-amber-700 hover:bg-amber-600
                     shadow-lg hover:shadow-xl
                     transition-all duration-300"
        >
          {esModoEdicion ? "Guardar cambios" : "Agregar"}
        </button>
      </div>
    </div>
  );
};

export default PlatoForm;