import { Track } from "../models"


export type DefaultsProps<T = {}> = T & { defaults: Track | null};
