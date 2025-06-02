import ModalWrapper from "@/components/modules/ModalWrapper";
import MyToaster from "@/components/modules/MyToaster";
import TopPart from "@/components/modules/TopPart";
import Tracks from "@/components/modules/Tracks";

export default function TracksPage() {
  return (
    <main>
      <MyToaster />
      <section className="track-manager py-8">
        <div className="container mx-auto px-8">
          <TopPart />
          <Tracks />
        </div>
      </section>
      <ModalWrapper />
    </main>
  );
}
  