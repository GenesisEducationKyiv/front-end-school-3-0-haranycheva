import { z } from "zod";
import TrackSchema from "./TrackSchema";

export type Track = z.infer<typeof TrackSchema>;