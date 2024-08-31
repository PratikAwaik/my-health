import { fhirApi } from "@/lib/axios";
import { Patient } from "fhir/r4";

export class PatientService {
  async getPatientDetails(patient_id: string) {
    return fhirApi.get<Patient>(`/Patient/${patient_id}`);
  }
}
