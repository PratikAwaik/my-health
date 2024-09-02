import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Observation } from "fhir/r4";
import { TimeRangeSelect } from "./time-range-select";
import { format } from "date-fns";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

interface WeightChartProps {
  weightData: Array<Observation | undefined>;
}

const chartConfig = {
  weight: {
    label: "Weight",
    color: "hsl(var(--chart-1))",
  },
};

export function WeightChart({ weightData }: WeightChartProps) {
  const [timeRange, setTimeRange] = useState("all");

  const chartData = useMemo(
    () =>
      weightData.map((data) => ({
        day: format(new Date(data?.effectiveDateTime || ""), "do MMM yyyy"),
        weight: data?.valueQuantity?.value,
      })),
    [weightData]
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

  console.log({ filteredData });

  return (
    <Card>
      <CardHeader>
        <div className="w-full flex items-center justify-between">
          <CardTitle className="text-primary text-xl">Weight</CardTitle>
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
                dataKey="weight"
                type="linear"
                stroke="var(--color-weight)"
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
