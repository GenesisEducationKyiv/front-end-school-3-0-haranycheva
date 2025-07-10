import TrackItem from "../../ui/trackCard/TrackItem";
import { useState } from "react";
import Image from "next/image";
import { textClass } from "@/style/classes/text";
import LoadingList from "./loadings/LoadingList";
import { useGetSearchParams } from "@/hooks/useGetSearchParams";
import { useTracks } from "@/hooks/queries/useTracks";

export default function TrackList() {
  const { search, artist, genre, sort, order, page } = useGetSearchParams();
  const { data, isLoading: loading, error } = useTracks({ search, artist, genre, sort, order, page });
  const list = data?.data ?? [];
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  if (loading) return <LoadingList />;
  if (error) return <p className="text-red-500">Failed to load tracks</p>;

  if (list.length === 0) {
    return (
      <div className="flex flex-col gap-5 justify-center items-center p-5">
        <Image
          src="/cannot-find.webp"
          alt="Couldn`t find picture"
          placeholder="blur"
          blurDataURL="/blur.webp"
          width={300}
          height={300}
          className="rounded-[5px] block w-[300px] h-[300px]"
        />
        <p className={`${textClass}`}>
          Sorry we couldn`t find anything by your request
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-wrap gap-15 justify-center pt-10 items-center">
      {list.map((el, i) => (
        <TrackItem
          key={el.id}
          track={el}
          playing={isPlaying}
          setIsPlaying={setIsPlaying}
          index={i}
        />
      ))}
    </ul>
  );
}
