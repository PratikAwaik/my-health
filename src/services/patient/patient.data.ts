import { useQuery } from "@tanstack/react-query";
import { PatientService } from "./patient.service";
import { COOKIE_KEYS } from "@/utils/constants";
import { getCookie } from "@/utils/cookies";

const svc = new PatientService();

const PATIENT_ID = getCookie(COOKIE_KEYS.PATIENT_ID);

export const useGetPatientDetails = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["patient"],
    queryFn: () => svc.getPatientDetails(PATIENT_ID!),
    enabled: !!PATIENT_ID,
  });

  return {
    patient: data?.data,
    ...rest,
  };
};

export const useGetMedications = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["medications"],
    queryFn: () => svc.getMedications(PATIENT_ID!),
    enabled: !!PATIENT_ID,
  });

  return {
    medicationBundle: data?.data,
    ...rest,
  };
};
