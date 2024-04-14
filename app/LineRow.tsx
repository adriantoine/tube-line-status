"use client";

import { TflApiPresentationEntitiesLine } from "@/lib/generated-types/tfl-types";
import { ChevronRight, TrainFront } from "lucide-react";
import { LineStatus } from "./LineStatus";
import { cn, lineBackgroundColor } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LineRowProps {
  line: TflApiPresentationEntitiesLine;
}
export function LineRow({ line }: LineRowProps) {
  const currentLineStatus = line.lineStatuses?.[0];
  const lineLinkHref = `/line/${line.id}`;
  const pathname = usePathname();
  const isActive = pathname === lineLinkHref;

  return (
    <Link
      href={lineLinkHref}
      title={line.name}
      className={cn(
        " group flex items-center justify-between gap-2 overflow-hidden rounded border-2 border-transparent ring-2 ring-transparent focus:ring-blue-600",
        {
          "cursor-default bg-slate-600 text-white hover:cursor-default":
            isActive,
          "bg-white hover:border-slate-400": !isActive,
        },
      )}
    >
      <div className="w-full p-4">
        <div className="flex justify-between gap-4">
          <div
            className={cn("flex items-center gap-2 p-2", {
              "font-bold": isActive,
            })}
          >
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-white",
                lineBackgroundColor(line.id!),
              )}
            >
              <TrainFront size={16} />
            </div>

            {line.name}
          </div>
          <div>
            <LineStatus lineStatus={currentLineStatus} />
          </div>
        </div>

        <div
          className={cn(
            "line-clamp-5 pl-12 text-right text-xs text-slate-500",
            {
              "text-white": isActive,
            },
          )}
        >
          {currentLineStatus?.disruption?.description}
        </div>
      </div>
      <div
        className={cn("flex h-full items-center text-slate-400", {
          "bg-slate-100 group-hover:bg-slate-300 group-hover:text-slate-900":
            !isActive,
          "bg-slate-600 font-bold text-white": isActive,
        })}
      >
        <ChevronRight />
      </div>
    </Link>
  );
}
