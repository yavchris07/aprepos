import { useEffect } from "react";
import { useNavigate } from "react-router";

const SplashScreenPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 2300);
  }, [navigate]);

  console.log('Splash')
  return (
    <div className="bg-red-500">
      <h4 className="text-5xl">Splash screen</h4>
    </div>
  );
};

export default SplashScreenPage;
