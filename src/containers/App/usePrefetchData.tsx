import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  NewReleaseResponse,
  fetchNewRelease,
} from "../../modules/api/album.apis";
import { useDispatch } from "react-redux";
import { recentTracksAction } from "../../redux/stores/recent-tracks.store";
/**
 * This hook is used to prefetch all required data for initial
 * app loaded and UI displayed
 * 1. ) New Releases
 */
export const useFetchInitialData = () => {
  const [isDone, setDone] = useState<boolean>(false);
  const [errors, setErrors] = useState<Error[]>([]);

  const dispatch = useDispatch();

  const {
    data: newReleases_response,
    isLoading: newReleases_isLoading,
    error: newReleases_error,
  } = useQuery<NewReleaseResponse>(["new-releases"], {
    queryFn: () => fetchNewRelease(),
    staleTime: 60000,
    cacheTime: 60000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: true,
  });

  useEffect(() => {
    if (!newReleases_isLoading && newReleases_response) {
      const payloads = newReleases_response.albums.items.map((item) => ({
        id: item.id,
        images: item.images,
        name: item.name,
      }));
      dispatch(recentTracksAction.load(payloads));
      setDone(true);
    }
    if (newReleases_error) {
      errors.push(newReleases_error as Error);
      setErrors([...errors]);
    }
  }, [newReleases_response, newReleases_isLoading, newReleases_error]);

  return {
    isDone,
  };
};
