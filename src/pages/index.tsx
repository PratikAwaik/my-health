import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/use-auth";
import { useGetPatientDetails } from "@/services/patient/patient.data";
import { COOKIE_KEYS } from "@/utils/constants";
import { getCookie } from "@/utils/cookies";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  const { patient, isLoading: isPatientLoading } = useGetPatientDetails();

  useEffect(() => {
    const access_token = getCookie(COOKIE_KEYS.ACCESS_TOKEN);
    if (!access_token) {
      navigate("/sign-in");
    }
  }, [navigate]);

  if (isPatientLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Spinner className="w-10 h-10" />
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="flex flex-col gap-y-4 items-center">
          <p className="text-3xl font-semibold">Patient data not found!</p>
          <Button onClick={handleLogout} className="w-fit">
            Sign In Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar patient={patient} />
      <div className="grid grid-cols-[25rem_2fr] gap-4 mt-4">
        <div></div>
        <div></div>
      </div>
    </>
  );
}
