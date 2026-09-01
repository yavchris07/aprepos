import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router";
import { useToast } from "../../../components/toast-context";
import { useState } from "react";
import { useLogin } from "../hooks/use-login";
import logo from "../../../assets/logo.png";

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { showToast } = useToast();
  const { login, fail, pending } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(formData);

      showToast("Connexion réussie avec succès !", "success");

      navigate("/dashboard", { replace: true });
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        showToast(fail, "error");
      } else {
        showToast("Une erreur est survenue lors de la connexion.", "error");
      }
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Mobile logo */}

      <div className="mb-8 flex flex-col items-center text-center lg:hidden">
        <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-white p-2 shadow-md">
          <img
            src={logo}
            alt="CEPARCREA"
            className="h-full w-full object-contain"
          />
        </div>

        <h1 className="mt-4 text-xl font-bold text-gray-900">CEPARCREA</h1>
      </div>

      {/* Header */}

      <div className="mb-8">
        <p className="text-sm font-medium text-green-700">Espace sécurisé</p>

        <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
          Bienvenue 👋
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          Connectez-vous à votre espace de gestion.
        </p>
      </div>

      {/* Form */}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Username */}

        <div>
          <label
            htmlFor="username"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Nom d'utilisateur
          </label>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

            <input
              id="username"
              type="text"
              required
              autoComplete="username"
              placeholder="Votre nom d'utilisateur"
              value={formData.username}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  username: e.target.value,
                })
              }
              className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:border-green-700 focus:ring-4 focus:ring-green-100"
            />
          </div>
        </div>

        {/* Password */}

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Mot de passe
          </label>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              placeholder="Votre mot de passe"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
              className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-11 pr-12 text-sm text-gray-900 outline-none transition focus:border-green-700 focus:ring-4 focus:ring-green-100"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
              aria-label={
                showPassword
                  ? "Masquer le mot de passe"
                  : "Afficher le mot de passe"
              }
            >
              {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>
        </div>

        {/* Submit */}

        <button
          type="submit"
          disabled={pending}
          className="flex w-full items-center justify-center rounded-xl bg-green-800 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-900 focus:outline-none focus:ring-4 focus:ring-green-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? (
            <>
              <Loader2 size={20} className="mr-2 animate-spin" />
              Connexion...
            </>
          ) : (
            "Se connecter"
          )}
        </button>
      </form>

      {/* Assistance */}

      <div className="mt-8 rounded-xl border border-gray-100 bg-white p-4 text-center">
        <p className="text-xs font-medium text-gray-700">
          Problème de connexion ?
        </p>

        <p className="mt-1 text-xs leading-5 text-gray-500">
          Veuillez contacter l'administrateur de votre coopérative.
        </p>

        <p className="mt-2 text-xs font-semibold text-green-700">
          info@alt-space.com
        </p>
      </div>

      {/* Footer */}

      <p className="mt-8 text-center text-[10px] text-gray-400">
        © {new Date().getFullYear()} CEPARCREA — Tous droits réservés.
      </p>
    </div>
  );
};

export default LoginForm;
