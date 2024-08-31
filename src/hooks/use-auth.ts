import { COOKIE_KEYS } from "@/utils/constants";
import { deleteCookie } from "@/utils/cookies";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    deleteCookie(COOKIE_KEYS.ACCESS_TOKEN);
    deleteCookie(COOKIE_KEYS.PATIENT_ID);
    navigate("/sign-in");
  }, [navigate]);

  return {
    handleLogout,
  };
}
