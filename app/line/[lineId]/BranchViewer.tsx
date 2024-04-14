"use client";

import { TflApiPresentationEntitiesRouteSequence } from "@/lib/generated-types/tfl-types";
import { BranchSelector } from "./BranchSelector";
import { useState } from "react";
import { compact, flatten, uniqBy } from "lodash-es";
import StationList from "./StationList";
import { ChevronLeftCircle } from "lucide-react";
import Link from "next/link";

export function BranchViewer({
  lineRoute,
}: {
  lineRoute: TflApiPresentationEntitiesRouteSequence;
}) {
  const { orderedLineRoutes, stopPointSequences, stations } = lineRoute;
  const [selectedRoute, setSelectedRoute] = useState<number>(0);

  const allStations = compact(
    uniqBy(
      flatten(stopPointSequences?.map((sequence) => sequence.stopPoint)),
      (stop) => stop?.id,
    ),
  );

  const selectedBranchStationdIds =
    orderedLineRoutes?.[selectedRoute]?.naptanIds || [];

  const selectedBranchStations =
    compact(
      selectedBranchStationdIds?.map((id) =>
        allStations?.find((station) => station.id === id),
      ),
    ) || [];

  const selectedBranchStationsWithHub = selectedBranchStations.map(
    (currentStation) => {
      if (currentStation.parentId) {
        const hub = stations?.find((s) => s.id === currentStation.parentId);
        return { ...currentStation, hub };
      }

      return currentStation;
    },
  );

  return (
    <div>
      {orderedLineRoutes && (
        <div className="px-4 pt-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-500 hover:text-slate-900">
              <ChevronLeftCircle size={32} />
            </Link>
            <BranchSelector
              lineRoutes={orderedLineRoutes}
              selectedBranch={selectedRoute}
              onBranchChange={(value) => setSelectedRoute(value)}
            />
          </div>
        </div>
      )}

      <StationList
        lineId={lineRoute.lineId!}
        list={selectedBranchStationsWithHub}
      />
    </div>
  );
}
