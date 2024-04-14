import {
  TflApiPresentationEntitiesLine,
  TflApiPresentationEntitiesRouteSequence,
} from "./generated-types/tfl-types";

export const fetchLineStatuses = (): Promise<
  TflApiPresentationEntitiesLine[]
> => {
  return fetch("https://api.tfl.gov.uk/line/mode/tube/status").then((res) =>
    res.json(),
  );
};

export const fetchLineRoute = (
  lineId: string,
): Promise<TflApiPresentationEntitiesRouteSequence> => {
  return fetch(
    `https://api.tfl.gov.uk/line/${lineId}/route/sequence/outbound`,
  ).then((res) => res.json());
};
