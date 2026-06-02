import type { Plato } from "../types/Plato";
import PlatoCard from "./PlatoCard";

// Recibe la lista de platos y las acciones definidas en Menu o PlatosAdmin
interface PlatoListProps {
  platos: Plato[];
  onEditar: (plato: Plato) => void;
  onEliminar: (id: number) => void;
  onVerDetalle: (id: number) => void;
  esAdmin?: boolean;
}

const PlatoList = ({
  platos,
  onEditar,
  onEliminar,
  onVerDetalle,
  esAdmin = false,
}: PlatoListProps) => {
  return (
    // Grid responsivo para mostrar los platos en tarjetas
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {/* Recorre todos los platos obtenidos desde Supabase */}
      {platos.map((p) => (
        <PlatoCard
          // Identificador único de cada plato
          key={p.id}
          // Datos completos del plato
          plato={p}
          // Función para abrir edición desde administración
          onEditar={onEditar}
          // Función para eliminar un plato
          onEliminar={onEliminar}
          // Función para navegar al detalle del plato
          onVerDetalle={onVerDetalle}
          // Controla si se muestran botones de administración
          esAdmin={esAdmin}
        />
      ))}
    </div>
  );
};

export default PlatoList;