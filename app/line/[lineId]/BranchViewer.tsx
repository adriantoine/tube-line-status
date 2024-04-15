"use client";

import { TflApiPresentationEntitiesRouteSequence } from "@/lib/generated-types/tfl-types";
import { BranchSelector } from "./BranchSelector";
import { useState } from "react";
import StationList from "./StationList";
import { ChevronLeftCircle } from "lucide-react";
import Link from "next/link";
import { getAllStationsWithHub } from "./utils";

export function BranchViewer({
  lineRoute,
}: {
  lineRoute: TflApiPresentationEntitiesRouteSequence;
}) {
  const { orderedLineRoutes } = lineRoute;
  const [selectedRoute, setSelectedRoute] = useState<number>(0);

  const allStationsWithHub = getAllStationsWithHub(selectedRoute, lineRoute);

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

      <StationList lineId={lineRoute.lineId!} list={allStationsWithHub} />
    </div>
  );
}
