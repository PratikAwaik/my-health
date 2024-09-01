import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetMedications } from "@/services/patient/patient.data";
import { Box, Boxes, Calendar, Clock, Pill, Repeat, User } from "lucide-react";
import { useMemo } from "react";
import { MedicationsLoading } from "./loading";
import { format } from "date-fns";
import { MedicationRequest } from "fhir/r4";

export default function MedicationsPage() {
  const { medicationBundle, isLoading } = useGetMedications();

  const medications = useMemo(
    () =>
      medicationBundle?.entry
        ?.filter(
          (entry) => entry.resource?.resourceType === "MedicationRequest"
        )
        .map((medication) => medication.resource) || [],
    [medicationBundle]
  );

  console.log({ medications });

  return (
    <Card>
      <CardHeader className="border-b border-b-primary">
        <CardTitle className="flex items-center gap-x-3 text-primary">
          <Pill /> Your Medications
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {isLoading ? (
          <MedicationsLoading />
        ) : (
          medications.map((medication, idx) => (
            <MedicationCard
              key={medication?.id}
              medication={medication}
              idx={idx}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
}

interface MedicationCardProps {
  idx: number;
  medication?: MedicationRequest;
}

const MedicationCard = ({ idx, medication }: MedicationCardProps) => {
  const additionalDetails = useMemo(
    () => [
      { Icon: User, label: "Requester", value: medication?.requester?.display },
      {
        Icon: Boxes,
        label: "Category",
        value: medication?.category?.map((c) => c.text).join(", "),
      },
      {
        Icon: Calendar,
        label: "Prescribed on",
        value: medication?.authoredOn
          ? format(new Date(medication?.authoredOn), "do MMM yyyy")
          : undefined,
      },
      {
        Icon: Repeat,
        label: "Repeats",
        value: medication?.dispenseRequest?.numberOfRepeatsAllowed,
      },
      {
        Icon: Box,
        label: "Quantity",
        value: medication?.dispenseRequest?.quantity?.value,
      },
    ],
    [medication]
  );

  return (
    <Card>
      <CardContent className="p-2 px-4 flex flex-col gap-y-4">
        <p className="text-primary font-medium">
          {idx + 1}. {medication?.medicationReference?.display}
        </p>
        <div className="flex flex-col gap-y-4 text-gray-500">
          <div>
            <p className="font-bold">Reason for medication:</p>
            <ul className="pl-4 list-disc text-sm">
              {medication?.reasonCode?.map((reason, idx) => (
                <li key={idx} className="space-y-1.5 font-semibold">
                  {reason.text}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-bold">Dosage Instructions:</p>
            <ul className="pl-4 text-sm">
              {medication?.dosageInstruction?.map((dosage, idx) => (
                <li className="space-y-1.5" key={idx}>
                  <div className="flex items-start gap-x-1">
                    <p className="font-semibold flex items-center gap-x-1">
                      <Pill className="size-4" /> Dosage:
                    </p>
                    {dosage.text}
                  </div>
                  <div className="flex items-center gap-x-1">
                    <p className="font-semibold flex items-center gap-x-1">
                      <Clock className="size-4" />
                      Timing:
                    </p>
                    {dosage.timing?.code?.text}
                  </div>
                  {!!dosage.timing?.repeat?.boundsPeriod?.start && (
                    <div className="flex items-center gap-x-1">
                      <p className="font-semibold flex items-center gap-x-1">
                        <Calendar className="size-4" />
                        Start on:
                      </p>
                      {format(
                        new Date(dosage.timing?.repeat?.boundsPeriod?.start),
                        "do MMM yyyy"
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-bold">Additional Details:</p>
            <ul className="pl-4 text-sm space-y-1.5">
              {additionalDetails
                .filter((detail) => !!detail.value)
                .map((detail, idx) => (
                  <li key={idx}>
                    <div className="flex items-center gap-x-1">
                      <p className="font-semibold flex items-center gap-x-1">
                        {<detail.Icon className="size-4" />}
                        {detail.label}:
                      </p>
                      {detail.value}
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
