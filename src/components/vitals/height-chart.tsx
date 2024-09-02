import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Observation } from "fhir/r4";
import { TimeRangeSelect } from "./time-range-select";
import { format } from "date-fns";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

interface HeightChartProps {
  heightData: Array<Observation | undefined>;
}

const chartConfig = {
  height: {
    label: "Height",
    color: "hsl(var(--chart-1))",
  },
};

export function HeightChart({ heightData }: HeightChartProps) {
  const [timeRange, setTimeRange] = useState("all");

  const chartData = useMemo(
    () =>
      heightData.map((data) => ({
        day: format(new Date(data?.effectiveDateTime || ""), "do MMM yyyy"),
        height: data?.valueQuantity?.value,
      })),
    [heightData]
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
  console.log({ chartData });

  return (
    <Card>
      <CardHeader>
        <div className="w-full flex items-center justify-between">
          <CardTitle className="text-primary text-xl">Height</CardTitle>
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
                top: 12,
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
                dataKey="height"
                type="linear"
                stroke="var(--color-height)"
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
