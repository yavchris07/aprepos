import LoginForm from "../features/auth/component/login";
import logo from "../assets/logo.png";
import { ShieldCheck } from "lucide-react";

const LoginPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 lg:grid lg:grid-cols-2">
      {/* =====================================================
          BRANDING
      ===================================================== */}

      <section className="relative hidden overflow-hidden bg-green-800 lg:flex">
        {/* Décoration */}

        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-green-700" />

        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-green-900" />

        <div className="relative z-10 flex w-full flex-col items-center justify-center px-12 text-center">
          <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-3xl bg-white p-3 shadow-xl">
            <img
              src={logo}
              alt="CEPARCREA"
              className="h-full w-full object-contain"
            />
          </div>

          <h1 className="mt-8 max-w-lg text-3xl font-bold leading-tight text-white">
            Coopérative d'épargne et crédit de l'amitié
          </h1>

          <p className="mt-4 max-w-md text-sm leading-6 text-green-100">
            Une plateforme simple et sécurisée pour gérer les membres,
            l'épargne, les transactions et les opérations financières.
          </p>

          <div className="mt-8 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs text-green-50">
            <ShieldCheck size={15} />
            Gestion sécurisée de vos opérations
          </div>
        </div>

        {/* Footer */}

        <p className="absolute bottom-6 left-0 right-0 text-center text-[10px] text-green-200">
          CEPARCREA • Plateforme de gestion
        </p>
      </section>

      {/* =====================================================
          LOGIN
      ===================================================== */}

      <section className="flex min-h-screen items-center justify-center px-5 py-10">
        <LoginForm />
      </section>
    </main>
  );
};

export default LoginPage;
