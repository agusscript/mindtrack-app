import { AuthContext } from "@/src/context/AuthContext";
import { useContext } from "react";

export const useAuthProvider = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthProvider must be used within an AuthProvider");
  return context;
};
