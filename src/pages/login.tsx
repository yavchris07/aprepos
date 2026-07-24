import LoginForm from "../features/auth/component/login";
import logo from "../assets/logo.png"

const LoginPage = () => {
  return (
    <div className="grid grid-cols-2 w-screen h-screen md:flex-row font-sans">
      <div className="flex flex-col flex-1 items-center justify-center">
        <img src={logo} className="" alt="logo" />
        <h1 className="mt-10 text-gray-800">Coopérative d'épargne et crédit de l'amitié.</h1>
        <p className="text-sm text-gray-400 italic">
        </p>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
