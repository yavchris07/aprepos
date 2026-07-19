export const getToken = () => {
  if (typeof window === "undefined") return null;

  try {
    const token = localStorage.getItem("abichoi-token");
    // console.log("Inua token :", token);
    return token;
  } catch (error) {
    console.error("Erreur récupération token:", error);
    return null;
  }
};
