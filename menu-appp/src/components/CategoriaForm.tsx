import { useState } from "react";
import type { Categoria } from "../types/Categoria";

export type CategoriaInput = {
  nombre: string;
  descripcion: string;
  imagen: string;
};

interface CategoriaFormProps {
  categoria?: Categoria;
  onGuardar: (datos: CategoriaInput) => void;
  onCancelar: () => void;
}

const FORMULARIO_VACIO: CategoriaInput = {
  nombre: "",
  descripcion: "",
  imagen: "",
};

const CategoriaForm = ({
  categoria,
  onGuardar,
  onCancelar,
}: CategoriaFormProps) => {
  // Si se recibe una categoría desde CategoriasAdmin se cargan sus datos,
  // de lo contrario se utiliza el formulario vacío para crear una nueva
  const [form, setForm] = useState<CategoriaInput>(
    categoria
      ? {
          nombre: categoria.nombre,
          descripcion: categoria.descripcion ?? "",
          imagen: categoria.imagen ?? "",
        }
      : FORMULARIO_VACIO
  );

  // Permite reutilizar el mismo formulario para registrar o editar categorías
  const esEdicion = Boolean(categoria);

  // Actualiza dinámicamente cualquier propiedad del formulario
  const handleCampo = (
    campo: keyof CategoriaInput,
    valor: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  // Validación mínima antes de enviar la información al componente padre
  const handleEnviar = () => {
    if (!form.nombre.trim()) {
      alert("El nombre es obligatorio");
      return;
    }

    // El guardado real se realiza desde CategoriasAdmin mediante useCategoria
    onGuardar(form);
  };

  return (
    <div
      className="bg-linear-to-b from-stone-900 to-red-950
                 border border-amber-700/30
                 rounded-3xl p-8
                 w-full max-w-lg mx-auto my-6
                 shadow-2xl"
    >
      <h2 className="text-amber-100 text-2xl font-extrabold mb-6">
        {esEdicion ? "Editar categoría" : "Nueva categoría"}
      </h2>

      {/* Nombre principal utilizado para identificar la categoría en todo el sistema */}
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
          placeholder="Ej: Parrillas, Ensaladas, Bebidas"
        />
      </div>

      {/* Descripción utilizada para complementar la información mostrada al usuario */}
      <div className="mb-6">
        <label className="block text-amber-200 text-sm mb-2 font-medium">
          Descripción
        </label>

        <textarea
          value={form.descripcion}
          onChange={(e) =>
            handleCampo("descripcion", e.target.value)
          }
          rows={3}
          className="w-full bg-black/20 text-amber-100 rounded-xl px-4 py-3 text-sm
                     border border-amber-700/30
                     placeholder:text-amber-200/40
                     focus:outline-none
                     focus:border-amber-500
                     focus:ring-2
                     focus:ring-amber-600/30
                     resize-none"
          placeholder="Descripción de la categoría..."
        />
      </div>

      {/* Imagen representativa que se muestra en las tarjetas de categorías */}
      <div className="mb-6">
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

      {/* Las acciones son manejadas por el componente padre para mantener separado el CRUD */}
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
          {esEdicion ? "Guardar cambios" : "Agregar"}
        </button>
      </div>
    </div>
  );
};

export default CategoriaForm;