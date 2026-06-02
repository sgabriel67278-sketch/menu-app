import type { Plato } from "../types/Plato";

interface PlatoCardProps {
  plato: Plato;

  // Función que permite cargar un plato para edición
  onEditar: (plato: Plato) => void;

  // Función que elimina un plato mediante su id
  onEliminar: (id: number) => void;

  // Función que navega a la vista de detalle
  onVerDetalle: (id: number) => void;

  // Determina si se muestran acciones administrativas
  esAdmin?: boolean;
}

const PlatoCard = ({
  plato,
  onEditar,
  onEliminar,
  onVerDetalle,
  esAdmin = false,
}: PlatoCardProps) => {
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
      {/* Imagen principal del plato si existe una URL registrada */}
      {plato.imagen && (
        <img
          src={plato.imagen}
          alt={plato.nombre}
          className="w-full h-52 object-cover rounded-xl mb-3"
        />
      )}

      {/* Encabezado con nombre y precio */}
      <div className="flex justify-between items-start gap-2">
        <h3 className="text-amber-100 font-bold text-lg leading-tight">
          {plato.nombre}
        </h3>

        <span className="text-amber-400 text-lg font-bold whitespace-nowrap">
          Bs. {plato.precio.toFixed(2)}
        </span>
      </div>

      {/* Nombre de la categoría obtenido mediante la relación con Supabase */}
      <p className="text-amber-200/70 text-xs uppercase tracking-wide">
        Categoría: {plato.categorias?.nombre}
      </p>

      {/* Se muestra una versión resumida de la descripción */}
      {plato.descripcion && (
        <p className="text-amber-100/70 text-sm line-clamp-2">
          {plato.descripcion}
        </p>
      )}

      {/* Acciones disponibles sobre el plato */}
      <div className="flex gap-2 mt-auto pt-2">

        {/* Los botones administrativos solo aparecen para usuarios autenticados */}
        {esAdmin && (
          <>
            <button
              onClick={() => onEditar(plato)}
              className="flex-1 py-2 rounded-xl text-xs font-semibold
                         bg-amber-800/30 text-amber-100
                         hover:bg-amber-700 hover:text-white
                         transition-all duration-300"
            >
              Editar
            </button>

            <button
              onClick={() => onEliminar(plato.id)}
              className="flex-1 py-2 rounded-xl text-xs font-semibold
                         bg-red-900/40 text-red-200
                         hover:bg-red-700 hover:text-white
                         transition-all duration-300"
            >
              Eliminar
            </button>
          </>
        )}

        {/* Disponible tanto para visitantes como para administradores */}
        <button
          onClick={() => onVerDetalle(plato.id)}
          className="flex-1 py-2 rounded-xl text-xs font-semibold
                     bg-amber-700 text-white
                     hover:bg-amber-600
                     hover:shadow-lg
                     transition-all duration-300"
        >
          Ver detalle
        </button>
      </div>
    </div>
  );
};

export default PlatoCard;