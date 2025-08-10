import { textClass } from "@/style/classes/text";
import AddTrackBtn from "../ui/AddTrackBtn";
import { SeeActiveTrackBtn } from "../ui/SeeActiveTrackBtn";
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

      <div className="flex gap-[20px]"> 
        <AddTrackBtn />
        <SeeActiveTrackBtn/>
      </div>
    </div>
  );
}
