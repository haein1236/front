import { useState } from "react";
import "../style/style.css";
import { useAuth } from '../api/hooks/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const { login, error, loading } = useAuth();

  const validateEmail = (value: string): boolean => {
    return /\S+@\S+\.\S+/.test(value);
  };

  const checkStrength = (pwd: string): string => {
    if (pwd.length < 8) return "Faible";
    if (pwd.length < 12) return "Moyen";
    return "Fort";
  };

  const handleLogin = async (): Promise<void> => {
  setMessage("");

  // validation email
  if (!validateEmail(email)) {
    setMessage("Email invalide");
    return;
  }

  // validation password
  if (password.length < 8) {
    setMessage("Mot de passe trop court");
    return;
  }

  try {
    await login(email, password);

    // optionnel : reset champs après succès
    setEmail("");
    setPassword("");
  } catch (err) {
    // l’erreur est déjà gérée par toast dans le hook
    console.log("Erreur login :", err);
  }
};


  return (
    <div className="card">
      <div className="top">
        <div className="avatar">✉️</div>
        <h1>Bienvenue</h1>
        <p>Connectez-vous à votre espace personnel</p>
      </div>

      <div className="body">
        {/* Affiche l'erreur du hook OU le message local */}
        {(error || message) && (
          <div className="success-banner error-banner">
            {error || message}
          </div>
        )}

        <div className="field">
          <label>Adresse e-mail</label>
          <div className="input-wrap">
            <span className="input-icon">📧</span>
            <input
              type="email"
              placeholder="vous@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label>Mot de passe</label>
          <div className="input-wrap">
            <span className="input-icon">🔒</span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              👁
            </button>
          </div>

          <div className="strength-bar">
            <div
              className="strength-fill"
              style={{
                width:
                  checkStrength(password) === "Faible" ? "30%" :
                  checkStrength(password) === "Moyen"  ? "60%" : "100%",
              }}
            />
          </div>
          <div className="strength-label">
            Force : {checkStrength(password)}
          </div>
        </div>

        <div className="row-check">
          <label className="check-label">
            <input type="checkbox" />
            Se souvenir de moi
          </label>
          <a href="#">Mot de passe oublié ?</a>
        </div>

        <button
          className="btn-primary"
          onClick={handleLogin}
          disabled={loading}  // ← désactive pendant la requête
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>

        <button className="btn-google">Continuer avec Google</button>
      </div>

      <div className="footer-text">
        Pas encore de compte ? <a href="#"> S'inscrire gratuitement</a>
      </div>
    </div>
  );
}