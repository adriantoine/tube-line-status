import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const lineBackgroundColor = (id: string) => ({
  "bg-line-bakerloo": id === "bakerloo",
  "bg-line-central": id === "central",
  "bg-line-circle": id === "circle",
  "bg-line-district": id === "district",
  "bg-line-hammersmith-city": id === "hammersmith-city",
  "bg-line-jubilee": id === "jubilee",
  "bg-line-metropolitan": id === "metropolitan",
  "bg-line-northern": id === "northern",
  "bg-line-piccadilly": id === "piccadilly",
  "bg-line-victoria": id === "victoria",
  "bg-line-waterloo-city": id === "waterloo-city",
  "bg-line-elizabeth": id === "elizabeth",
  "bg-line-london-overground": id === "london-overground",
  "bg-line-dlr": id === "dlr",
  "bg-national-rail": id === "national-rail",
});

export const lineBorderColor = (id: string) => ({
  "border-line-bakerloo": id === "bakerloo",
  "border-line-central": id === "central",
  "border-line-circle": id === "circle",
  "border-line-district": id === "district",
  "border-line-hammersmith-city": id === "hammersmith-city",
  "border-line-jubilee": id === "jubilee",
  "border-line-metropolitan": id === "metropolitan",
  "border-line-northern": id === "northern",
  "border-line-piccadilly": id === "piccadilly",
  "border-line-victoria": id === "victoria",
  "border-line-waterloo-city": id === "waterloo-city",
});

export const LINE_IDS = [
  "bakerloo",
  "central",
  "circle",
  "district",
  "hammersmith-city",
  "jubilee",
  "metropolitan",
  "northern",
  "piccadilly",
  "victoria",
  "waterloo-city",
  "elizabeth",
  "london-overground",
  "dlr",
];
