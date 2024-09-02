import { Skeleton } from "@/components/ui/skeleton";

export function VitalsPageLoading() {
  return (
    <div className="flex flex-col gap-y-4">
      {[...Array(5)].map((_, idx) => (
        <Skeleton key={idx} className="w-full h-60" />
      ))}
    </div>
  );
}
