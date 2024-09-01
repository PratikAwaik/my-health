import { COOKIE_KEYS } from "@/utils/constants";
import { deleteCookie, getCookie } from "@/utils/cookies";
import { createContext, useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextProps {
  patientId?: string;
  handleLogout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  patientId: undefined,
  handleLogout: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const patientId = useMemo(() => getCookie(COOKIE_KEYS.PATIENT_ID), []);

  useEffect(() => {
    const access_token = getCookie(COOKIE_KEYS.ACCESS_TOKEN);
    if (!access_token) {
      navigate("/sign-in");
    }
  }, [navigate]);

  const handleLogout = useCallback(() => {
    console.log("handleogout");
    deleteCookie(COOKIE_KEYS.ACCESS_TOKEN);
    deleteCookie(COOKIE_KEYS.PATIENT_ID);
    navigate("/sign-in");
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ patientId, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}
