import {
  TflApiPresentationEntitiesLine,
  TflApiPresentationEntitiesRouteSequence,
} from "./generated-types/tfl-types";

export const fetchLineStatuses = (): Promise<
  TflApiPresentationEntitiesLine[]
> => {
  return fetch("https://api.tfl.gov.uk/line/mode/tube/status", {
    // That means the response of the fetch is cached for 60 seconds
    // it should be enough as the tube status doesn't change every second
    next: { revalidate: 60 },
  }).then((res) => res.json());
};

export const fetchLineRoute = (
  lineId: string,
): Promise<TflApiPresentationEntitiesRouteSequence> => {
  return fetch(
    `https://api.tfl.gov.uk/line/${lineId}/route/sequence/outbound`,
    // As the list of stops doesn't change that often, it can be cached for a whole day
    { next: { revalidate: 24 * 60 * 60 } },
  ).then((res) => res.json());
};
