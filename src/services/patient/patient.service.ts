import { fhirApi } from "@/lib/axios";
import { Bundle, MedicationRequest, Patient } from "fhir/r4";

export class PatientService {
  async getPatientDetails(patient_id: string) {
    return fhirApi.get<Patient>(`/Patient/${patient_id}`);
  }

  async getMedications(patient_id: string) {
    return fhirApi.get<Bundle<MedicationRequest>>(
      `/MedicationRequest?subject=${patient_id}`
    );
  }
}
