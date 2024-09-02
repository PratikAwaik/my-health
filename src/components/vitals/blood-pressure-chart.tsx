import { Observation } from "fhir/r4";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { useCallback, useMemo, useState } from "react";
import { format } from "date-fns";
import { CartesianGrid, Legend, Line, LineChart, XAxis } from "recharts";
import { TimeRangeSelect } from "./time-range-select";

interface BloodPressureChartProps {
  bloodPressureData: Array<Observation | undefined>;
}

const chartConfig = {
  systolic: {
    label: "Systolic Blood Pressue",
    color: "hsl(var(--chart-1))",
  },
  diastolic: {
    label: "Diastolic Blood Pressue",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function BloodPressureChart({
  bloodPressureData,
}: BloodPressureChartProps) {
  const [timeRange, setTimeRange] = useState("all");

  const getSystolicPressure = useCallback(
    (bp: Observation | undefined) =>
      bp?.component?.find((comp) =>
        comp.code.coding?.find((c) => c.code === "8480-6")
      )?.valueQuantity?.value,
    []
  );

  const getDiastolicPressure = useCallback(
    (bp: Observation | undefined) =>
      bp?.component?.find((comp) =>
        comp.code.coding?.find((c) => c.code === "8462-4")
      )?.valueQuantity?.value,
    []
  );

  const chartData = useMemo(
    () =>
      bloodPressureData.map((bp) => ({
        day: format(new Date(bp?.effectiveDateTime || ""), "do MMM yyyy"),
        systolic: getSystolicPressure(bp),
        diastolic: getDiastolicPressure(bp),
      })),
    [bloodPressureData, getSystolicPressure, getDiastolicPressure]
  );

  const filteredData = useMemo(
    () =>
      chartData.filter((item) => {
        const date = new Date(item.day);
        const now = new Date();
        let daysToSubtract = 90;
        if (timeRange === "all") return chartData;
        if (timeRange === "30d") {
          daysToSubtract = 30;
        } else if (timeRange === "7d") {
          daysToSubtract = 7;
        }
        now.setDate(now.getDate() - daysToSubtract);
        return date >= now;
      }),
    [chartData, timeRange]
  );

  return (
    <Card>
      <CardHeader>
        <div className="w-full flex items-center justify-between">
          <CardTitle className="text-primary text-xl">Blood Pressure</CardTitle>
          <TimeRangeSelect timeRange={timeRange} setTimeRange={setTimeRange} />
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80 w-full">
          {filteredData.length > 0 ? (
            <LineChart
              accessibilityLayer
              data={filteredData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line
                dataKey="systolic"
                type="linear"
                stroke="var(--color-systolic)"
                strokeWidth={2}
              />
              <Line
                dataKey="diastolic"
                type="linear"
                stroke="var(--color-diastolic)"
                strokeWidth={2}
              />
              <Legend verticalAlign="top" height={36} />
            </LineChart>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-xl font-medium">No data found!</p>
            </div>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
