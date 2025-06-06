import { AudioInfo } from "../repeated";

export function isAudioInfo(obj: any): obj is AudioInfo {
  return (
    obj &&
    typeof obj === "object" &&
    "id" in obj &&
    "audioFile" in obj
  );
}