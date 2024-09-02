import { fhirApi } from "@/lib/axios";
import { Bundle, MedicationRequest, Observation, Patient } from "fhir/r4";

export class PatientService {
  async getPatientDetails(patient_id: string) {
    return fhirApi.get<Patient>(`/Patient/${patient_id}`);
  }

  async getMedications(patient_id: string) {
    return fhirApi.get<Bundle<MedicationRequest>>(
      `/MedicationRequest?subject=${patient_id}`
    );
  }

  async getObservations(patient_id: string) {
    return fhirApi.get<Bundle<Observation>>(
      `/Observation?subject=${patient_id}&category=vital-signs`
    );
  }
}
