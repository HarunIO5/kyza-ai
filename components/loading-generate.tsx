import { Skeleton } from "@nextui-org/react";
import { Card } from "@nextui-org/react";

export default function LoadingGeneratePage () {

  return (
    <div className="w-3/4 md:h-full flex flex-col md:flex-row gap-8" >
      <Skeleton className="w-full h-full md:w-1/3 px-4 py-8 rounded-lg">
        <div className="w-full h-full md:w-1/3 px-4 py-8 rounded-lg bg-default-200"></div>
      </Skeleton>
      <Skeleton className="w-full flex items-center justify-center py-2 rounded-lg">
        <div className="w-full flex items-center justify-center py-2 bg-default-200"></div>
      </Skeleton>
    </div>
  );
}
