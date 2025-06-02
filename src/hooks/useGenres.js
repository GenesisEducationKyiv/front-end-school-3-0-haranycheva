import { getGenges } from "@/api/genres/getGenres";
import { useEffect, useState } from "react";

export const useGenres = () => {
      const [genres, setGenres] = useState([]);
      const [loadingGenres, setLoadingGenres] = useState(false);
    
      useEffect(() => {
        async function fetchData() {
          setLoadingGenres(true);
          const data = await getGenges();
          const editedData = data.map((el) => ({ value: el, label: el }));
          setLoadingGenres(false)
          setGenres(editedData);
        }
        fetchData();
      }, []);

      return [genres, loadingGenres]
};
