import { Filters, isOrder, isSort } from "@/types";
import { useSearchParams } from "next/navigation";

export const useGetSearchParams = (): Filters => {
  const searchParams = useSearchParams();

  const search = searchParams?.get("search") || "";
  const artist = searchParams?.get("artist") || "";
  const genre = searchParams?.get("genre") || "";

  const sortRaw = searchParams?.get("sort") || "";
  const sort = isSort(sortRaw) ? sortRaw : "title";

  const orderRaw = searchParams?.get("order") || "";
  const order = isOrder(orderRaw) ? orderRaw : "asc";

  const page = Number(searchParams?.get("page")) || 1;

  return { search, artist, genre, sort, order, page };
};
