import { useEffect, useState } from "react";
import type { Plato } from "../types/Plato";
import { supabase } from "../lib/supabaseClient";

export type PlatoInput = Omit<Plato, "id">;

const usePlato = () => {
  // Almacena todos los platos obtenidos desde Supabase
  const [platos, setPlatos] = useState<Plato[]>([]);

  // Controla la carga de datos
  const [cargando, setCargando] = useState<boolean>(true);

  // Guarda errores de consultas o modificaciones
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Carga inicial de platos junto con el nombre de su categoría
    const cargarPlatos = async () => {
      setCargando(true);
      setError(null);

      const { data, error: supabaseError } = await supabase
        .from("platos")
        .select(`
          *,
          categorias (
            nombre
          )
        `)
        .order("nombre", { ascending: true });

      if (supabaseError)
        setError(
          "Error al cargar los platos: " +
            supabaseError.message
        );
      else setPlatos(data ?? []);

      setCargando(false);
    };

    cargarPlatos();
  }, []);

  // Crear un nuevo plato
  const crearPlato = async (
    nuevo: PlatoInput
  ): Promise<boolean> => {
    setError(null);

    const { data, error: supabaseError } =
      await supabase
        .from("platos")
        .insert(nuevo)
        .select(`
          *,
          categorias (
            nombre
          )
        `)
        .single();

    if (supabaseError) {
      setError(
        "Error al insertar: " +
          supabaseError.message
      );
      return false;
    }

    // Agrega el nuevo plato al estado local
    setPlatos((prev) => [
      data,
      ...prev,
    ]);

    return true;
  };

  // Actualizar un plato existente
  const actualizarPlato = async (
    id: number,
    cambios: PlatoInput
  ): Promise<boolean> => {
    setError(null);

    const { data, error: supabaseError } =
      await supabase
        .from("platos")
        .update(cambios)
        .eq("id", id)
        .select(`
          *,
          categorias (
            nombre
          )
        `)
        .single();

    if (supabaseError) {
      setError(
        "Error al actualizar: " +
          supabaseError.message
      );
      return false;
    }

    // Sustituye el plato actualizado dentro de la colección
    setPlatos((prev) =>
      prev.map((p) =>
        p.id === id ? data : p
      )
    );

    return true;
  };

  // Eliminar un plato
  const eliminarPlato = async (
    id: number
  ): Promise<boolean> => {
    setError(null);

    const { error: supabaseError } =
      await supabase
        .from("platos")
        .delete()
        .eq("id", id);

    if (supabaseError) {
      setError(
        "Error al eliminar: " +
          supabaseError.message
      );
      return false;
    }

    // Quita el plato eliminado del estado local
    setPlatos((prev) =>
      prev.filter((p) => p.id !== id)
    );

    return true;
  };

  return {
    platos,
    cargando,
    error,
    crearPlato,
    actualizarPlato,
    eliminarPlato,
  };
};

export default usePlato;