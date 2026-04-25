import { useState } from "react";
import { authService } from "../service/auth.service";
import toast from "react-hot-toast";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    const toastId = toast.loading("Connexion en cours... ⏳");

    try {
      const res = await authService.login({ email, password });

      toast.success("Connexion réussie ✨", { id: toastId });

      return res;
    } catch (err: any) {
      const message = err.message || "Erreur de connexion";

      setError(message);
      toast.error(message, { id: toastId });

      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: {
    nom: string;
    prenom: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    setError(null);

    const toastId = toast.loading("Création du compte... 🌸");

    try {
      const res = await authService.register(data);

      toast.success("Compte créé avec succès 💖", { id: toastId });

      return res;
    } catch (err: any) {
      const message = err.message || "Erreur lors de l'inscription";

      setError(message);
      toast.error(message, { id: toastId });

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    register,
    loading,
    error,
  };
}
