export interface Plato {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria_id: number;
  imagen?: string;

  categorias?: {
    nombre: string;
  };
}