import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BloodPressureChart } from "@/components/vitals/blood-pressure-chart";
import { HeartRateChart } from "@/components/vitals/heart-rate-chart";
import { HeightChart } from "@/components/vitals/height-chart";
import { WeightChart } from "@/components/vitals/weight-chart";
import { useGetObservations } from "@/services/patient/patient.data";
import { Activity } from "lucide-react";
import { useCallback, useMemo } from "react";

export default function VitalsPage() {
  const { observationBundle } = useGetObservations();

  const observationsData = useMemo(
    () =>
      observationBundle?.entry
        ?.filter(
          (observation) => observation.resource?.resourceType === "Observation"
        )
        .map((observation) => observation.resource) || [],
    [observationBundle]
  );

  const filterObservations = useCallback(
    (codeToFilter: string) =>
      observationsData.filter((observation) =>
        observation?.code.coding?.find((code) => code.code === codeToFilter)
      ),
    [observationsData]
  );

  const observations = useMemo(() => {
    return {
      bloodPressure: filterObservations("85354-9"),
      heartRate: filterObservations("8867-4"),
      weight: filterObservations("29463-7"),
      height: filterObservations("8302-2"),
      temperature: filterObservations("8310-5 "),
    };
  }, [filterObservations]);

  return (
    <Card>
      <CardHeader className="border-b border-b-primary">
        <CardTitle className="flex items-center gap-x-3 text-primary">
          <Activity />
          Vitals
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 flex flex-col gap-y-4">
        <BloodPressureChart bloodPressureData={observations.bloodPressure} />
        <HeartRateChart heartRateData={observations.heartRate} />
        <WeightChart weightData={observations.weight} />
        <HeightChart heightData={observations.height} />
      </CardContent>
    </Card>
  );
}
