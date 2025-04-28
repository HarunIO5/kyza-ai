import { Skeleton } from "@nextui-org/react";
import { Card } from "@nextui-org/react";

export default function LoadingSearchResults() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
      <Skeleton className="rounded-lg">
        <div className="h-48 rounded-lg bg-default-200"></div>
      </Skeleton>
      <Skeleton className="rounded-lg">
        <div className="h-48 rounded-lg bg-default-200"></div>
      </Skeleton>
      <Skeleton className="rounded-lg">
        <div className="h-48 rounded-lg bg-default-200"></div>
      </Skeleton>
      <Skeleton className="rounded-lg">
        <div className="h-48 rounded-lg bg-default-200"></div>
      </Skeleton>
    </div>
  );
}
