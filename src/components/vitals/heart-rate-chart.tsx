import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { TimeRangeSelect } from "./time-range-select";

export function HeartRateChart() {
  const [timeRange, setTimeRange] = useState("90d");

  return (
    <Card>
      <CardHeader>
        <div className="w-full flex items-center justify-between">
          <CardTitle className="text-primary text-xl">Blood Pressure</CardTitle>
          <TimeRangeSelect timeRange={timeRange} setTimeRange={setTimeRange} />
        </div>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
