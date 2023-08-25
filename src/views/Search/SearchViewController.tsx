import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../../modules/api/categories.apis";
import { categoriesAction } from "../../redux/stores/categories.store";
import { useDispatch } from "react-redux";
import { fetchCategoryPlaylist } from "../../modules/api/playlists.apis";

export const SearchViewController: React.FC = () => {
  const { data, isLoading, error } = useQuery(["categories"], {
    queryFn: () => fetchCategories(),
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading) {
      if (!error && data) {
        const promises = data.categories.items.map(async (item) => {
          let image: string | null = null;
          try {
            const playlistResult = await fetchCategoryPlaylist(item.id);
            image = playlistResult.playlists.items[0].images[0].url;

            return {
              id: item.id,
              name: item.name,
              coverPhoto: image,
            };
          } catch (err) {
            return { ...item, coverPhoto: image };
          }
        });

        Promise.all(promises).then((results) => {
          dispatch(categoriesAction.load(results));
        });
      }
      if (error) {
        console.error(error);
      }
    }
  }, [data, isLoading, error]);

  return null;
};
