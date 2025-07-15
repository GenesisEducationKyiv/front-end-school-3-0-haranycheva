"use client";

import TrackList from "@/components/widgets/tracks/TrackList";
import SearchForm from "@/components/widgets/tracks/SearchForm";
import Pagination from "@/components/widgets/tracks/Pagination";
import Multiselect from "@/components/widgets/tracks/MultiSelect";
import { useInitialFetch } from "@/hooks/useInitialFetch";
import dynamic from "next/dynamic";

const ActiveTrack = dynamic(() => import('@/components/widgets/tracks/ActiveTrack'), {
  ssr: false,
  loading: () => <p className="text-white p-4">Loading active track...</p>,
});


export default function Tracks() {
  const {maxPage, data, isLoading} = useInitialFetch()
  return (
    <div className="pb-10">
      <SearchForm />
      <Multiselect list={data}/>
      <TrackList />
      {isLoading && <Pagination maxPage={maxPage} />}
    </div>
  );
}
