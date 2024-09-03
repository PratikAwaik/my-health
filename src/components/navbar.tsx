import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Patient } from "fhir/r4";
import { Badge } from "./ui/badge";
import { format } from "date-fns";
import { getCookie } from "@/utils/cookies";
import { COOKIE_KEYS } from "@/utils/constants";

interface NavbarProps {
  patient: Patient;
}

export function Navbar({ patient }: NavbarProps) {
  const primaryIdentifier = useMemo(
    () => getCookie(COOKIE_KEYS.PATIENT_ID),
    []
  );

  const patientName = useMemo(() => {
    if (patient) {
      const names = patient.name;

      const officialName = names?.find((name) => name.use === "official");
      const usualName = names?.find((name) => name.use === "usual");
      if (officialName) {
        return officialName.text;
      } else if (usualName) {
        return usualName.text;
      }
    }
  }, [patient]);

  return (
    <Card>
      <CardHeader className="w-full flex flex-row items-center justify-between gap-x-4 flex-wrap px-4 py-3 space-y-0">
        <CardTitle>Welcome, {patientName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <Badge className="text-sm">ID: {primaryIdentifier}</Badge>
            <Badge variant="secondary" className="text-sm capitalize">
              {patient.gender}
            </Badge>
            {!!patient.birthDate && (
              <Badge variant="secondary" className="text-sm">
                Birth Date: {format(new Date(patient.birthDate), "do MMM yyyy")}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
