import { z } from "zod";
import TrackDataSchema from "./TrackDataSchema";

export type TrackData = z.infer<typeof TrackDataSchema>;