import { fetchLineRoute } from "@/lib/api";
import { BranchViewer } from "./BranchViewer";

export default async function LineDetails(props: {
  params: { lineId: string };
}) {
  const lineId = props.params.lineId;
  const lineRoute = await fetchLineRoute(lineId);

  return (
    <div className="h-screen overflow-auto">
      <BranchViewer lineRoute={lineRoute} />
    </div>
  );
}
