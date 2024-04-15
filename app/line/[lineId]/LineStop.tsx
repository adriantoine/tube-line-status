import { cn, lineBackgroundColor, lineBorderColor } from "@/lib/utils";
import { ExpandedStop } from "./ExpandedStop";
import { Suspense, useState } from "react";
import {
  CircleMinus,
  CirclePlus,
  LoaderCircle,
  TriangleAlert,
} from "lucide-react";
import { StationWithHub, StopConnections } from "./StopConnections";

export function LineStop({
  lineId,
  station,
}: {
  lineId: string;
  station: StationWithHub;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={cn("relative border-l-8", lineBorderColor(lineId))}>
      <div className="w-full border-b p-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-left"
        >
          <div className="flex items-center gap-2 hover:underline">
            {station.hasDisruption && (
              <TriangleAlert size={16} className="text-yellow-600" />
            )}
            <div>{station.name}</div>
            {isExpanded ? <CircleMinus /> : <CirclePlus />}
          </div>
        </button>

        <Suspense fallback={<LoaderCircle className="animate-spin" />}>
          {isExpanded ? (
            <ExpandedStop lineId={lineId} station={station} />
          ) : (
            <StopConnections lineId={lineId} station={station} />
          )}
        </Suspense>

        {station.hub ? (
          <div
            className={cn(
              "absolute -left-1 top-7 h-[24px] w-[24px] -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-black bg-white",
            )}
          />
        ) : (
          <div
            className={cn(
              "absolute left-0 top-7 h-[5px] w-[8px] -translate-y-1/2",
              lineBackgroundColor(lineId),
            )}
          />
        )}
      </div>
    </div>
  );
}
