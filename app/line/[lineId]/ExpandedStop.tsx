import { TflApiPresentationEntitiesStopPoint } from "@/lib/generated-types/tfl-types";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { StationWithHub, StopConnections } from "./StopConnections";
import { startCase } from "lodash-es";
import { Bus, Clock } from "lucide-react";

export function ExpandedStop({
  lineId,
  station,
}: {
  lineId: string;
  station: StationWithHub;
}) {
  const { data } = useSWR<TflApiPresentationEntitiesStopPoint>(
    `https://api.tfl.gov.uk/StopPoint/${station.hub?.id || station.id}`,
    fetcher,
    { suspense: true },
  );

  if (!data) return null;

  const busLines = data.lineModeGroups?.find((g) => g.modeName === "bus");
  const railLines = data.lineModeGroups?.find(
    (g) => g.modeName === "national-rail",
  );

  const monToFriOpeningTime = data.additionalProperties?.find(
    (prop) => prop.category === "Opening Time" && prop.key === "MonFriFrom",
  );
  const monToFriClosingTime = data.additionalProperties?.find(
    (prop) => prop.category === "Opening Time" && prop.key === "MonFriTo",
  );
  const satOpeningTime = data.additionalProperties?.find(
    (prop) => prop.category === "Opening Time" && prop.key === "SatFrom",
  );
  const satClosingTime = data.additionalProperties?.find(
    (prop) => prop.category === "Opening Time" && prop.key === "SatTo",
  );
  const sunOpeningTime = data.additionalProperties?.find(
    (prop) => prop.category === "Opening Time" && prop.key === "SunFrom",
  );
  const sunClosingTime = data.additionalProperties?.find(
    (prop) => prop.category === "Opening Time" && prop.key === "SunTo",
  );

  const address = data.additionalProperties?.find(
    (prop) => prop.category === "Address" && prop.key === "Address",
  );

  return (
    <div>
      <StopConnections lineId={lineId} station={data} />
      {busLines && busLines.lineIdentifier?.length && (
        <div className="mt-1 flex flex-wrap gap-2">
          {busLines?.lineIdentifier?.map((line) => (
            <div
              key={line}
              className="flex items-center gap-1 rounded bg-red-600 px-1 text-sm font-medium text-white"
            >
              <Bus size={14} />
              {line.toUpperCase()}
            </div>
          ))}
        </div>
      )}
      {railLines && railLines.lineIdentifier?.length && (
        <div className="mt-1 flex flex-wrap gap-2">
          {railLines?.lineIdentifier?.map((line) => (
            <div
              key={line}
              className="rounded bg-black p-1 text-xs font-medium text-white"
            >
              {startCase(line)}
            </div>
          ))}
        </div>
      )}

      <div className="mt-1 text-sm">
        <div className="text-md underline">Opening times:</div>
        <div className="flex items-center gap-1">
          <span>Mon to Fri:</span>
          <Clock size={12} />
          <span>
            {monToFriOpeningTime?.value} - {monToFriClosingTime?.value}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <span>Sat:</span>
          <Clock size={12} />
          <span>
            {satOpeningTime?.value} - {satClosingTime?.value}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <span>Sun:</span>
          <Clock size={12} />
          <span>
            {sunOpeningTime?.value} - {sunClosingTime?.value}
          </span>
        </div>
      </div>

      <div className="mt-1 text-sm">
        <div className="text-md underline">Address:</div>
        <div>{address?.value}</div>
      </div>
    </div>
  );
}
