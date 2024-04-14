import { LineStop } from "./LineStop";
import { StationWithHub } from "./StopConnections";

export default function StationList({
  list,
  lineId,
}: {
  lineId: string;
  list: StationWithHub[];
}) {
  return (
    <div className="p-4">
      {list.map((station, i) => (
        <LineStop key={i} lineId={lineId} station={station} />
      ))}
    </div>
  );
}
