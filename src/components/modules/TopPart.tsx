import { textClass } from "@/style/classes/text";
import AddTrackBtn from "../ui/AddTrackBtn";
export default function TopPart() {
  return (
    <div
      className="flex items-center justify-between align-center"
    >
      <h1
        data-testid="tracks-header"
        className={`${textClass}`}
      >
        ♫ Your music tracks manager
      </h1>

      <AddTrackBtn />
    </div>
  );
}
