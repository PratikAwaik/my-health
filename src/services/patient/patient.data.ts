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

export const useGetObservations = () => {
  const { patientId } = useAuthContext();
  const { data, ...rest } = useQuery({
    queryKey: ["observations"],
    queryFn: () => svc.getObservations(patientId!),
    enabled: !!patientId,
  });

  return {
    observationBundle: data?.data,
    ...rest,
  };
};

export const useGetLabReports = () => {
  const { patientId } = useAuthContext();
  const { data, ...rest } = useQuery({
    queryKey: ["lab-reports"],
    queryFn: () => svc.getLabReports(patientId!),
    enabled: !!patientId,
  });

  return {
    labReportsBundle: data?.data,
    ...rest,
  };
};
