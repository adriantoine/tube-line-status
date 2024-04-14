import { TflApiPresentationEntitiesMatchedStop } from "@/lib/generated-types/tfl-types";
import { LINE_IDS, cn, lineBackgroundColor } from "@/lib/utils";

export interface StationWithHub extends TflApiPresentationEntitiesMatchedStop {
  hub?: TflApiPresentationEntitiesMatchedStop;
}

export function TubeConnectionList(
  connections: { id: string; name: string }[],
) {
  return (
    <>
      {connections.map((line) => (
        <span
          key={line.id}
          className={cn(
            "whitespace-nowrap rounded p-1 text-xs text-white",
            lineBackgroundColor(line.id!),
          )}
        >
          {line.name}
        </span>
      ))}
    </>
  );
}

export function StopConnections({
  lineId,
  station,
}: {
  lineId: string;
  station: StationWithHub;
}) {
  const stationWithConnections = station.hub || station;

  let connections =
    stationWithConnections.lines?.filter(
      (line) => LINE_IDS.includes(line.id!) && line.id !== lineId,
    ) || [];

  if (
    stationWithConnections.modes?.includes("national-rail") &&
    (!connections || connections.length === 0)
  )
    return null;

  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {connections.map((line) => (
        <span
          key={line.id}
          className={cn(
            "whitespace-nowrap rounded p-1 text-xs text-white",
            lineBackgroundColor(line.id!),
          )}
        >
          {line.name}
        </span>
      ))}

      {stationWithConnections.modes?.includes("national-rail") && (
        <img src="/logos/National_Rail_logo.svg" className="h-5 w-5" />
      )}
    </div>
  );
}
