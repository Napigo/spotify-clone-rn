import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { fetchArtists } from "../../../modules/api/artist.apis";
import { useEffect } from "react";
import { recommendedArtistsAction } from "../../../redux/stores/recommended-artists.store";

/**
 *
 * @param ids
 * @returns
 */
export const usePopulateArtistPhotos = (ids: string[]) => {
  const dispatch = useDispatch();

  const { data: response, isLoading } = useQuery(["artists", ids], {
    queryFn: () => fetchArtists(ids),
  });

  useEffect(() => {
    if (!isLoading && response) {
      const { artists } = response;

      dispatch(
        recommendedArtistsAction.load(
          artists.map((item) => ({
            id: item.id,
            photoCover:
              item.images && item.images[0] !== undefined
                ? item.images[0].url
                : null,
            name: item.name,
          }))
        )
      );
    }
  }, [response, isLoading]);
  return null;
};
