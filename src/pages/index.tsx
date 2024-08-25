import { LS_KEYS } from "@/utils/constants";
import { getCookie } from "@/utils/cookies";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const access_token = getCookie(LS_KEYS.ACCESS_TOKEN);
    if (!access_token) {
      navigate("/sign-in");
    }
  }, [navigate]);

  return <div className="text-4xl">Hello</div>;
}
