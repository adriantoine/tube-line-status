"use client";

import { TflApiPresentationEntitiesOrderedRoute } from "@/lib/generated-types/tfl-types";

export function BranchSelector({
  lineRoutes,
  onBranchChange,
  selectedBranch,
}: {
  lineRoutes: TflApiPresentationEntitiesOrderedRoute[];
  selectedBranch: number;
  onBranchChange: (selectedBranchIndex: number) => void;
}) {
  return (
    <select
      onChange={(evt) => onBranchChange(parseInt(evt.currentTarget.value, 10))}
      value={selectedBranch}
      className="w-full cursor-pointer rounded border-2 border-slate-400 bg-slate-100 p-2 hover:bg-slate-200"
    >
      {lineRoutes.map((route, index) => (
        <option key={index} value={index}>
          {route.name?.replace("harr;", "⇔")}
        </option>
      ))}
    </select>
  );
}
