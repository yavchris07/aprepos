export const getCurrentUser = () => {
  if (typeof window === "undefined") return null;

  try {
    const data = localStorage.getItem("avec-user");

    const user = data ? JSON.parse(data) : null;

    // console.log("Abichoi user:", user);

    return user;
  } catch (error) {
    console.error("Erreur récupération user:", error);
    return null;
  }
};