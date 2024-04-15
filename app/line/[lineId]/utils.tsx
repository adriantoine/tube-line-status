"use client";
import { TflApiPresentationEntitiesRouteSequence } from "@/lib/generated-types/tfl-types";
import { compact, flatten, uniqBy } from "lodash-es";

export const getAllStationsWithHub = (
  selectedRoute: number,
  {
    orderedLineRoutes,
    stopPointSequences,
    stations,
  }: TflApiPresentationEntitiesRouteSequence,
) => {
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

  return selectedBranchStations.map((currentStation) => {
    if (currentStation.parentId) {
      const hub = stations?.find((s) => s.id === currentStation.parentId);
      return { ...currentStation, hub };
    }

    return currentStation;
  });
};
