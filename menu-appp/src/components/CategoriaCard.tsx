import type { Categoria } from "../types/Categoria";

interface CategoriaCardProps {
  categoria: Categoria;

  // Envía la categoría seleccionada al formulario de edición
  onEditar: (categoria: Categoria) => void;

  // Elimina una categoría mediante su id
  onEliminar: (id: number) => void;

  // Controla la visualización de acciones administrativas
  esAdmin?: boolean;
}

const CategoriaCard = ({
  categoria,
  onEditar,
  onEliminar,
  esAdmin = false,
}: CategoriaCardProps) => {
  return (
    <div
      className="bg-linear-to-b from-stone-900 to-red-950
                 rounded-2xl p-4 flex flex-col gap-3
                 border border-amber-700/30
                 hover:border-amber-500
                 hover:-translate-y-1
                 hover:shadow-2xl
                 transition-all duration-300"
    >
      {/* Imagen asociada a la categoría */}
      {categoria.imagen && (
        <img
          src={categoria.imagen}
          className="w-full h-52 object-cover rounded-xl mb-3"
        />
      )}

      {/* Nombre principal de la categoría */}
      <h3 className="text-amber-100 font-bold text-lg">
        {categoria.nombre}
      </h3>

      {/* Descripción utilizada para identificar el tipo de categoría */}
      <p className="text-amber-100/70 text-sm">
        {categoria.descripcion}
      </p>

      {/* Opciones de administración disponibles solo para el administrador */}
      {esAdmin && (
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => onEditar(categoria)}
            className="flex-1 py-2 rounded-xl text-xs font-semibold
                       bg-amber-800/30 text-amber-100
                       hover:bg-amber-700 hover:text-white
                       transition-all duration-300"
          >
            Editar
          </button>

          <button
            onClick={() => onEliminar(categoria.id)}
            className="flex-1 py-2 rounded-xl text-xs font-semibold
                       bg-red-900/40 text-red-200
                       hover:bg-red-700 hover:text-white
                       transition-all duration-300"
          >
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoriaCard;