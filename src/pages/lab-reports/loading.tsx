import { Skeleton } from "@/components/ui/skeleton";

export function LabReportsLoading() {
  return (
    <div className="flex flex-col gap-y-4">
      {[...Array(4)].map((_, idx) => (
        <Skeleton key={idx} className="h-48 w-full" />
      ))}
    </div>
  );
}
