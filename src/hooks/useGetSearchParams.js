import { useSearchParams } from "next/navigation";

export const useGetSearchParams = () => {
  const searchParams = useSearchParams();

  const search = searchParams?.get("search") || "";
  const artist = searchParams?.get("artist") || "";
  const genre = searchParams?.get("genre") || "";
  const sort = searchParams?.get("sort") || "title";
  const order = searchParams?.get("order") || "asc";
  const page = searchParams?.get("page") || "1";

  return { search, artist, genre, sort, order, page };
};
