import { Skeleton } from "@/components/ui/skeleton";

export function MedicationsLoading() {
  return (
    <div className="flex flex-col gap-y-4">
      {[...Array(3)].map((_, idx) => (
        <Skeleton key={idx} className="w-full h-60" />
      ))}
    </div>
  );
}
