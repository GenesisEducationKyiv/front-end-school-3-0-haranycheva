import { getGenges } from "@/api/genres/getGenres";
import { type Genre } from "@/types";
import { useEffect, useState } from "react";

type EditedGenre = {
  value: string;
  label: string;
}

export const useGenres = (): [EditedGenre[], boolean] => {
      const [genres, setGenres] = useState<EditedGenre[]>([]);
      const [loadingGenres, setLoadingGenres] = useState(false);
    
      useEffect(() => {
        async function fetchData() {
          setLoadingGenres(true);
          const data = await getGenges();
          const editedData = data.map((el: Genre) => ({ value: el, label: el }));
          setLoadingGenres(false)
          setGenres(editedData);
        }
        fetchData();
      }, []);

      return [genres, loadingGenres]
};
