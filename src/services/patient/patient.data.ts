import { useQuery } from "@tanstack/react-query";
import { PatientService } from "./patient.service";
import { useAuthContext } from "@/hooks/use-auth-context";

const svc = new PatientService();

export const useGetPatientDetails = () => {
  const { patientId } = useAuthContext();
  const { data, ...rest } = useQuery({
    queryKey: ["patient"],
    queryFn: () => svc.getPatientDetails(patientId!),
    enabled: !!patientId,
  });

  return {
    patient: data?.data,
    ...rest,
  };
};

export const useGetMedications = () => {
  const { patientId } = useAuthContext();
  const { data, ...rest } = useQuery({
    queryKey: ["medications"],
    queryFn: () => svc.getMedications(patientId!),
    enabled: !!patientId,
  });

  return {
    medicationBundle: data?.data,
    ...rest,
  };
};
