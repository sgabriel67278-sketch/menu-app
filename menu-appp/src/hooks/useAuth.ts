import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

const useAuth = () => {
  // Guarda el usuario autenticado actualmente
  const [usuario, setUsuario] = useState<User | null>(null);

  // Controla el estado de carga de la sesión
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Obtiene la sesión actual cuando la aplicación inicia
    const obtenerSesion = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUsuario(session?.user ?? null);
      setCargando(false);
    };

    obtenerSesion();

    // Escucha cambios de autenticación (login, logout, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUsuario(session?.user ?? null);
    });

    // Limpia la suscripción cuando el componente deja de existir
    return () => subscription.unsubscribe();
  }, []);

  // Inicia sesión con email y contraseña
  const login = async (
    email: string,
    password: string
  ) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return !error;
  };

  // Registra un nuevo usuario
  const register = async (
    email: string,
    password: string
  ) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    return !error;
  };

  // Cierra la sesión actual
  const logout = async () => {
    await supabase.auth.signOut();
  };

  return {
    usuario,
    cargando,
    login,
    register,
    logout,
  };
};

export default useAuth;