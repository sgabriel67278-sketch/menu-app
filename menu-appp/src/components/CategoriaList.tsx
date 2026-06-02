import type { Categoria } from "../types/Categoria";
import CategoriaCard from "./CategoriaCard";

// Recibe la lista de categorías y las funciones que vienen desde CategoriasAdmin
interface CategoriaListProps {
  categorias: Categoria[];
  onEditar: (categoria: Categoria) => void;
  onEliminar: (id: number) => void;
  esAdmin?: boolean;
}

const CategoriaList = ({
  categorias,
  onEditar,
  onEliminar,
  esAdmin = false,
}: CategoriaListProps) => {
  return (
    // Contenedor grid que distribuye las tarjetas de categorías
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {/* Se genera una tarjeta por cada categoría obtenida desde Supabase */}
      {categorias.map((c) => (
        <CategoriaCard
          // Clave única para que React identifique cada elemento
          key={c.id}
          // Datos de la categoría que se mostrarán en la tarjeta
          categoria={c}
          // Se pasa la función de edición al componente hijo
          onEditar={onEditar}
          // Se pasa la función de eliminación al componente hijo
          onEliminar={onEliminar}
          // Permite mostrar u ocultar acciones administrativas
          esAdmin={esAdmin}
        />
      ))}
    </div>
  );
};

export default CategoriaList;