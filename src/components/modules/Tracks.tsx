"use client";

import { useEffect, useState } from "react";
import { getTracks } from "@/api/tracks/getTracks";
import TrackList from "@/components/widgets/tracks/TrackList";
import SearchForm from "@/components/widgets/tracks/SearchForm";
import Pagination from "@/components/widgets/tracks/Pagination";
import Multiselect from "@/components/widgets/tracks/MultiSelect";
import { useInitialFetch } from "@/hooks/useInitialFetch";

export default function Tracks() {
  const {maxPage, data} = useInitialFetch()
  return (
    <div className="pb-10">
      <SearchForm />
      <Multiselect list={data}/>
      <TrackList />
      <Pagination maxPage={maxPage} />
    </div>
  );
}
