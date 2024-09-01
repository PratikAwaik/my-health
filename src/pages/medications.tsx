import { Card } from "@/components/ui/card";
import { useGetMedications } from "@/services/patient/patient.data";

export default function MedicationsPage() {
  const { medicationBundle } = useGetMedications();

  console.log({ medicationBundle });

  return <Card></Card>;
}
