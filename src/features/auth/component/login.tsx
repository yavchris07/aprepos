import { Loader2, Lock, MailIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { useToast } from "../../../components/toast-context";
import { useState } from "react";
import { useLogin } from "../hooks/use-login";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { showToast } = useToast();
  const { login, fail, pending } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate("/dashboard");
      showToast("Connexion reussi avec succes !", "success");
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        showToast(fail, "error");
      } else {
        console.log("Une erreur inconnue est survenue");
      }
    }
  };
  return (
    // <div className="min-h-full flex flex-col">
    <div className="flex flex-col flex-1 items-center justify-center font-sans bg-zinc-200">
      <div className="p-1 px-10 py-40">
        <h1 className="font-semibold">CEPARCREA</h1>
        <p className="text-gray-500 text-sm">
          Coopérative d'épargne et crédit de l'amitié.
        </p>
        <form className="my-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="first_name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nom
            </label>
            <div className="relative">
              <MailIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                required
                className="w-full pl-10 pr-4 py-3 border text-gray-800 border-gray-400 rounded-lg focus:ring-2 focus:ring-cardano-blue focus:border-cardano-blue transition-colors"
                placeholder="Nom"
                value={formData.username}
                onChange={(e) => {
                  setFormData({ ...formData, username: e.target.value });
                }}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="first_name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="password"
                required
                className="w-full pl-10 pr-4 py-3 border text-gray-800 border-gray-400 rounded-lg focus:ring-2 focus:ring-cardano-blue focus:border-cardano-blue transition-colors"
                placeholder="Mot de passe"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="flex flex-col my-4">
            <button className="bg-green-800 py-3 px-3 rounded hover:bg-green-900 text-white cursor-pointer flex justify-center">
              {pending ? (
                <Loader2 className="animate-spin text-center" size={22} />
              ) : (
                "Se connecter"
              )}
            </button>
          </div>
          <p className="text-gray-600 text-sm">
            {" "}
            <strong> Problème de connexion ?</strong> Veuillez contacter
            l'Administrateur.
          </p>
          <p className="text-green-700 text-sm text-center font-semibold mt-2">
            info@alt-space.com
          </p>
        </form>
      </div>
    </div>
    // </div>
  );
};

export default LoginForm;
