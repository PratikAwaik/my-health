import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
}
