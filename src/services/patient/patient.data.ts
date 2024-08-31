import { useQuery } from "@tanstack/react-query";
import { PatientService } from "./patient.service";
import { COOKIE_KEYS } from "@/utils/constants";
import { getCookie } from "@/utils/cookies";

const svc = new PatientService();

export const useGetPatientDetails = () => {
  const patient_id = getCookie(COOKIE_KEYS.PATIENT_ID);
  const { data, ...rest } = useQuery({
    queryKey: ["patient"],
    queryFn: () => svc.getPatientDetails(patient_id!),
    enabled: !!patient_id,
    // ! throwOnError
  });

  return {
    patient: data?.data,
    ...rest,
  };
};
