import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetLabReports } from "@/services/patient/patient.data";
import { format } from "date-fns";
import { Observation } from "fhir/r4";
import { Calendar, FlaskConical, TestTubeDiagonal } from "lucide-react";
import { useCallback, useMemo } from "react";

export default function LabReportsPage() {
  const { labReportsBundle } = useGetLabReports();

  const labReportsData = useMemo(
    () =>
      labReportsBundle?.entry
        ?.filter((entry) => entry.resource?.resourceType === "Observation")
        .map((data) => data.resource),
    [labReportsBundle?.entry]
  );

  const getValue = useCallback((report: Observation | undefined) => {
    // ! this does not include valueCodeableConcept, valueSampledData
    if (!report) return "Not known";
    if (report.valueQuantity) return report.valueQuantity.value;
    if (report.valueString) return report.valueString;
    if (report.valueBoolean) return report.valueBoolean ? "Yes" : "No";
    if (report.valueInteger) return report.valueInteger;
    if (report.valueRange) {
      const high = report.valueRange.high?.value;
      const low = report.valueRange.low?.value;
      return `High: ${high !== undefined ? high : "Not known"}, Low: ${
        low !== undefined ? low : "Not known"
      }`;
    }
    if (report.valueRatio) {
      const numerator = report.valueRatio.numerator?.value;
      const denominator = report.valueRatio.denominator?.value;
      return `${numerator !== undefined ? numerator : "Not known"}/${
        denominator !== undefined ? denominator : "Not known"
      }`;
    }
    if (report.valueTime)
      return format(new Date(report.valueTime), "do MMM yyyy");
    if (report.valueDateTime)
      return format(new Date(report.valueDateTime), "do MMM yyyy 'at' h:m a");
    if (report.valuePeriod) {
      const from = report.valuePeriod.start;
      const to = report.valuePeriod.end;
      return `From: ${
        from ? format(new Date(from), "do MMM yyyy 'at' h:m a") : "Not known"
      }\nTo: ${
        to ? format(new Date(to), "do MMM yyyy 'at' h:m a") : "Not known"
      }`;
    }
  }, []);

  return (
    <Card>
      <CardHeader className="border-b border-b-primary">
        <CardTitle className="flex items-center gap-x-3 text-primary">
          <FlaskConical className="size-5" /> Lab Reports
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {labReportsData?.map((report, idx) => (
          <Card>
            <CardHeader>
              <CardTitle className="text-primary text-xl">
                {idx + 1}. {report?.code.text}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-2">
              <div className="flex items-center gap-x-2 text-primary font-bold">
                <TestTubeDiagonal className="size-4" />
                {getValue(report)}
              </div>
              <div>
                {!!report?.effectiveDateTime && (
                  <div className="flex items-center gap-x-2 text-sm">
                    <Calendar className="size-4" />
                    <p className="font-medium text-gray-500">Performed on:</p>
                    {format(new Date(report.effectiveDateTime), "do MMM yyyy")}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
