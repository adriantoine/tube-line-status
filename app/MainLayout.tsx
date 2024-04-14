import { TflApiPresentationEntitiesLine } from "@/lib/generated-types/tfl-types";
import { LineRow } from "./LineRow";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function MainLayout({
  lineStatus,
  isNavMobileHidden,
  children,
}: {
  isNavMobileHidden?: boolean;
  lineStatus: TflApiPresentationEntitiesLine[];
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid h-full grid-cols-[1fr] lg:grid-cols-[minmax(auto,500px)_1fr]",
      )}
    >
      <div
        className={cn(
          "flex h-full flex-col gap-2 overflow-auto border-r-2 border-slate-300 bg-slate-200 p-2",
          { "hidden lg:flex": isNavMobileHidden },
        )}
      >
        {lineStatus.map((tubeLine) => (
          <LineRow key={tubeLine.id} line={tubeLine} />
        ))}
      </div>
      <div className={cn("w-full", { "hidden lg:block": !isNavMobileHidden })}>
        {children}
      </div>
    </div>
  );
}
