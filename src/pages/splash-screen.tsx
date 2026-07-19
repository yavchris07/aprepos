import { useEffect } from "react";
import { useNavigate } from "react-router";

const SplashScreenPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 2300);  
  }, [navigate]);
  return (<div>Splash screen</div>);
};

export default SplashScreenPage;
