import { useEffect, useState } from "react";
import type { Categoria } from "../types/Categoria";
import { supabase } from "../lib/supabaseClient";

export type CategoriaInput = Omit<Categoria, "id">;

const useCategoria = () => {
  // Lista de categorías mostradas en el sistema
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  // Estado de carga para consultas a Supabase
  const [cargando, setCargando] = useState<boolean>(true);

  // Guarda mensajes de error cuando ocurre algún problema
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    // Carga todas las categorías al iniciar
    const cargarCategorias = async () => {
      setCargando(true);
      setError(null);

      const { data, error: supabaseError } = await supabase
        .from("categorias")
        .select("*")
        .order("nombre", { ascending: true });

      if (supabaseError) {
        setError(
          "Error al cargar las categorías: " +
            supabaseError.message
        );
      } else {
        setCategorias(data ?? []);
      }

      setCargando(false);
    };

    cargarCategorias();
  }, []);

  // =========================
  // CREAR CATEGORÍA
  // =========================
  const crearCategoria = async (
    nueva: CategoriaInput
  ): Promise<boolean> => {
    setError(null);

    const { data, error: supabaseError } = await supabase
      .from("categorias")
      .insert(nueva)
      .select()
      .single();

    if (supabaseError) {
      setError("Error al insertar: " + supabaseError.message);
      return false;
    }

    // Actualiza el estado local sin volver a consultar la base de datos
    setCategorias((prev) => [
      data as Categoria,
      ...prev,
    ]);

    return true;
  };

  // =========================
  // ACTUALIZAR CATEGORÍA
  // =========================
  const actualizarCategoria = async (
    id: number,
    cambios: CategoriaInput
  ): Promise<boolean> => {
    setError(null);

    const { error: supabaseError } = await supabase
      .from("categorias")
      .update(cambios)
      .eq("id", id);

    if (supabaseError) {
      setError("Error al actualizar: " + supabaseError.message);
      return false;
    }

    // Reemplaza la categoría modificada dentro del estado
    setCategorias((prev) =>
      prev.map((c) =>
        c.id === id ? { id, ...cambios } : c
      )
    );

    return true;
  };

  // =========================
  // ELIMINAR CATEGORÍA
  // =========================
  const eliminarCategoria = async (
    id: number
  ): Promise<boolean> => {
    setError(null);

    const { error: supabaseError } = await supabase
      .from("categorias")
      .delete()
      .eq("id", id);

    if (supabaseError) {
      setError("Error al eliminar: " + supabaseError.message);
      return false;
    }

    // Elimina la categoría también del estado local
    setCategorias((prev) =>
      prev.filter((c) => c.id !== id)
    );

    return true;
  };

  return {
    categorias,
    cargando,
    error,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria,
  };
};

export default useCategoria;