import { TflApiPresentationEntitiesLineStatus } from "@/lib/generated-types/tfl-types";
import { severityLevelColors } from "@/lib/severityLevels";
import { cn } from "@/lib/utils";
import { ThumbsUp, TriangleAlert, Frown } from "lucide-react";

interface LineStatusProps {
  lineStatus?: TflApiPresentationEntitiesLineStatus;
}
export function LineStatus({ lineStatus }: LineStatusProps) {
  let lineStatusColor;
  if (lineStatus) {
    const statusSeverity = (lineStatus.statusSeverity || 0).toString();
    lineStatusColor = severityLevelColors[statusSeverity]?.color;
  }

  lineStatusColor ??= "unknown";

  return (
    <div
      className={cn("flex items-center gap-2 rounded px-4 py-2 text-white", {
        "bg-green-800": lineStatusColor === "good",
        "bg-yellow-600": lineStatusColor === "warn",
        "bg-red-700": lineStatusColor === "problem",
        "bg-gray-600": lineStatusColor === "unknown",
      })}
    >
      {lineStatusColor === "good" ? (
        <ThumbsUp size={16} />
      ) : lineStatusColor === "warn" ? (
        <TriangleAlert size={16} />
      ) : lineStatusColor === "problem" ? (
        <Frown size={16} />
      ) : null}
      <span className="hidden sm:inline">
        {lineStatus?.statusSeverityDescription || "Unknown"}
      </span>
    </div>
  );
}
