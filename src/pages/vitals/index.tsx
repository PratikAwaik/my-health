import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

export default function VitalsPage() {
  return (
    <Card>
      <CardHeader className="border-b border-b-primary">
        <CardTitle className="flex items-center gap-x-3 text-primary">
          <Activity />
          Vitals
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6"></CardContent>
    </Card>
  );
}
