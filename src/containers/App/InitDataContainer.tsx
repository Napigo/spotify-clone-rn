import React, { PropsWithChildren, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import {
  AvailableGenresResponse,
  NewReleaseResponse,
  TrendingAlbumResponse,
  fetchNewRelease,
  fetchRecommendedGenres,
  fetchTrendingAlbums,
} from "../../modules/api/album.apis";
import { recentTracksAction } from "../../redux/stores/recent-tracks.store";
import {
  TrendingAlbum,
  trendingAlbumsAction,
} from "../../redux/stores/trending-albums.store";

export const InitDataContainer: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [resources, setResources] = useState<string[]>([
    "new-releases",
    "trending-albums",
  ]);

  const [isDone, setDone] = useState<boolean>(false);
  const [errors, setErrors] = useState<Error[]>([]);

  const dispatch = useDispatch();

  const {
    data: newReleases_response,
    isLoading: newReleases_isLoading,
    error: newReleases_error,
  } = useQuery<NewReleaseResponse>(["new-releases"], {
    queryFn: () => fetchNewRelease(5),
    staleTime: 60000,
    cacheTime: 60000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: true,
  });

  const {
    data: availableGenres_response,
    isLoading: availableGenres_isLoading,
    error: availableGenres_error,
  } = useQuery<string[]>(["available-genres"], {
    queryFn: () => fetchRecommendedGenres(),
    staleTime: 60000,
    cacheTime: 60000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: true,
  });

  const genres = availableGenres_response;
  const {
    data: trendingAlbums_response,
    isLoading: trendingAlbums_isLoading,
    error: trendingAlbums_error,
  } = useQuery<TrendingAlbumResponse>(["trending-albums"], {
    queryFn: () => fetchTrendingAlbums(30, genres ?? []),
    enabled: !!genres,
  });

  /**
   * Populate New Release resources
   */
  useEffect(() => {
    if (!newReleases_isLoading && newReleases_response) {
      const payloads = newReleases_response.albums.items.map((item) => ({
        id: item.id,
        images: item.images,
        name: item.name,
      }));
      dispatch(recentTracksAction.load(payloads));
      resources.splice(resources.indexOf("new-releases"), 1);
      setResources([...resources]);
    }
    if (newReleases_error) {
      errors.push(newReleases_error as Error);
      setErrors([...errors]);
    }
  }, [newReleases_response, newReleases_isLoading, newReleases_error]);

  /**
   * Populate Trending Albums  resources
   */
  useEffect(() => {
    if (!trendingAlbums_isLoading && trendingAlbums_response) {
      const payloads: TrendingAlbum[] = trendingAlbums_response.tracks.map(
        (item) => {
          const album = item.album;
          return {
            id: album.id,
            coverImage: album.images[0].url ?? "",
            albumName: album.name,
            artistName: album.artists[0].name ?? "Unknown Artist",
          };
        }
      );
      dispatch(trendingAlbumsAction.load(payloads));
      resources.splice(resources.indexOf("trending-albums"), 1);
      setResources([...resources]);
    }
    if (trendingAlbums_error) {
      errors.push(trendingAlbums_error as Error);
      setErrors([...errors]);
    }
  }, [trendingAlbums_response, trendingAlbums_isLoading, trendingAlbums_error]);

  useEffect(() => {
    if (resources.length === 0) {
      setDone(true);
      SplashScreen.hideAsync();
    }
  }, [resources]);

  if (!isDone) {
    return null;
  }
  return <>{children}</>;
};
