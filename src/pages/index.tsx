import { Navbar } from "@/components/navbar";
import { COOKIE_KEYS } from "@/utils/constants";
import { getCookie } from "@/utils/cookies";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const access_token = getCookie(COOKIE_KEYS.ACCESS_TOKEN);
    if (!access_token) {
      navigate("/sign-in");
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-[1fr_2fr] gap-4">
        <div></div>
        <div></div>
      </div>
    </>
  );
}
