import { useEffect } from "react";
import { useNavigate } from "react-router";
import icon from "../assets/logo.png";

const SplashScreenPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login", { replace: true });
    }, 2300);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white">

      {/* Décoration arrière-plan */}

      <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-green-50" />

      <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-green-50" />

      {/* Contenu */}

      <div className="relative flex flex-col items-center text-center">

        {/* Logo */}

        <div className="animate-[splashLogo_0.8s_ease-out] flex h-28 w-28 items-center justify-center overflow-hidden rounded-3xl border border-gray-100 bg-white p-2 shadow-lg">

          <img
            src={icon}
            alt="CEPARCREA"
            className="h-full w-full rounded-2xl object-cover"
          />

        </div>

        {/* Nom */}

        <div className="mt-6 animate-[splashText_0.8s_ease-out_0.2s_both]">

          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            CEPARCREA
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Gestion de l'épargne et des membres
          </p>

        </div>

        {/* Loader */}

        <div className="mt-8 flex items-center gap-2">

          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-green-700 [animation-delay:-0.3s]" />

          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-green-700 [animation-delay:-0.15s]" />

          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-green-700" />

        </div>

        <p className="mt-3 text-[11px] text-gray-400">
          Chargement de votre espace...
        </p>

      </div>

      {/* Version */}

      <div className="absolute bottom-6 text-center">
        <p className="text-[10px] text-gray-400">
          Version 1.0.0
        </p>
      </div>

    </div>
  );
};

export default SplashScreenPage;
