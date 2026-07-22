import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import { useToast } from "../../../components/toast-context";
import { useState } from "react";
import { useLogin } from "../hooks/use-login";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
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
    <div className="flex flex-col flex-1 items-center justify-center font-sans mt-40 ">
      <div className="p-1 px-10 py-40">
        <h1>Ceparcrea</h1>
        <p className="text-gray-400 text-xs">Coopérative d'épargne et crédit de l'amitié.</p> 
        <form className="my-4" onSubmit={handleSubmit}>
          <div className="flex flex-col my-2">
            <label htmlFor="" className="text-sm text-gray-500">
              E-mail
            </label>
            <input
              type="text"
              className="border border-gray-400 rounded py-2 pl-3 text-gray-900 text-sm"
              placeholder="E-mail"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="text-sm text-gray-500">
              Mot de passe
            </label>
            <input
              type="password"
              className="border border-gray-400 rounded py-2 pl-3 text-gray-900 text-sm"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col my-4">
            <button className="bg-green-800 py-2 px-3 rounded hover:bg-green-900 text-white cursor-pointer flex justify-center">
              {pending ? (
                <Loader2 className="animate-spin text-center" size={22} />
              ) : (
                "Se connecter"
              )}
            </button>
          </div>
          <p className="text-gray-600 text-xs"> <strong> Problème de connexion ?</strong> Veiullez contacter l'Administrateur.</p>
          <p className="text-green-700 text-xs text-center font-semibold">info@alt-space.com</p>
        </form>
      </div>
    </div>
    // </div>
  );
};

export default LoginForm;
