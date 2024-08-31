import { Navbar } from "@/components/navbar";
import { Spinner } from "@/components/ui/spinner";
import { useGetPatientDetails } from "@/services/patient/patient.data";
import { COOKIE_KEYS } from "@/utils/constants";
import { getCookie } from "@/utils/cookies";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const { patient, isLoading: isPatientLoading } = useGetPatientDetails();

  const patientName = useMemo(() => {
    if (patient) {
      const names = patient.name;

      const officialName = names?.find((name) => name.use === "official");
      const usualName = names?.find((name) => name.use === "usual");
      if (officialName) {
        return officialName.text;
      } else if (usualName) {
        return usualName.text;
      }
    }
  }, [patient]);

  console.log(patient);

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

  return (
    <>
      <Navbar patientName={patientName} />
      <div className="grid grid-cols-[25rem_2fr] gap-4 mt-4">
        <div></div>
        <div></div>
      </div>
    </>
  );
}
