import rawAwards from "@/data/awards.json";
import { loadCollection } from "@/lib/data/load";
import { Award, awardSchema } from "./types";

/** Awards and recognitions, in display order. */
export const awards: Award[] = loadCollection(rawAwards, awardSchema, "awards");
