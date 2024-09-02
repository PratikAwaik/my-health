import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { TimeRangeSelect } from "./time-range-select";
import { Observation } from "fhir/r4";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { format } from "date-fns";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

interface HeartRateChartProps {
  heartRateData: Array<Observation | undefined>;
}

const chartConfig = {
  heartRate: {
    label: "Heart Rate",
    color: "hsl(var(--chart-6))",
  },
} satisfies ChartConfig;

export function HeartRateChart({ heartRateData }: HeartRateChartProps) {
  const [timeRange, setTimeRange] = useState("all");

  const chartData = useMemo(
    () =>
      heartRateData.map((data) => ({
        day: format(new Date(data?.effectiveDateTime || ""), "do MMM yyyy"),
        heartRate: data?.valueQuantity?.value,
      })),
    [heartRateData]
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
          <CardTitle className="text-primary text-xl">Heart Rate</CardTitle>
          <TimeRangeSelect timeRange={timeRange} setTimeRange={setTimeRange} />
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-60 w-full">
          {filteredData.length > 0 ? (
            <LineChart
              data={filteredData}
              accessibilityLayer
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
                dataKey="heartRate"
                type="linear"
                stroke="var(--color-heartRate)"
                strokeWidth={2}
              />
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
