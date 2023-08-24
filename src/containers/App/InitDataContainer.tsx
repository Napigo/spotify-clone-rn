import React, { PropsWithChildren, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import {
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
import {
  RecommendedArtist,
  recommendedArtistsAction,
} from "../../redux/stores/recommended-artists.store";
import {
  FeaturedPlaylistResponse,
  fetchFeaturedPlaylist,
} from "../../modules/api/playlists.apis";
import {
  FeaturedPlaylistItem,
  featuredPlaylistsAction,
} from "../../redux/stores/featured-playlists.store";

export const InitDataContainer: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [resources, setResources] = useState<string[]>([
    "new-releases",
    "trending-albums",
    "featured-playlists",
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

  const { data: availableGenres_response } = useQuery<string[]>(
    ["available-genres"],
    {
      queryFn: () => fetchRecommendedGenres(),
      staleTime: 60000,
      cacheTime: 60000,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: true,
    }
  );

  const genres = availableGenres_response;
  const {
    data: trendingAlbums_response,
    isLoading: trendingAlbums_isLoading,
    error: trendingAlbums_error,
  } = useQuery<TrendingAlbumResponse>(["trending-albums"], {
    queryFn: () => fetchTrendingAlbums(30, genres ?? []),
    enabled: !!genres,
  });

  const {
    data: featuredPlaylists_response,
    isLoading: featurePlaylists_isLoading,
  } = useQuery<FeaturedPlaylistResponse>(["featured-playlists"], {
    queryFn: () => fetchFeaturedPlaylist(20),
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
      // Holder to populate list of recommended artists
      const artists: RecommendedArtist[] = [];

      const payloads: TrendingAlbum[] = trendingAlbums_response.tracks.map(
        (item) => {
          const album = item.album;

          /**
           * Extract the artists from each track and push into recommended artists listing
           */
          const targetArtist = item.artists[0];

          artists.push({
            id: targetArtist.id,
            photoCover: null,
            name: targetArtist.name,
          });

          return {
            id: album.id,
            coverImage: album.images[0].url ?? "",
            albumName: album.name,
            artistName: album.artists[0].name ?? "Unknown Artist",
          };
        }
      );
      dispatch(recommendedArtistsAction.load(artists));
      dispatch(trendingAlbumsAction.load(payloads));
      resources.splice(resources.indexOf("trending-albums"), 1);
      setResources([...resources]);
    }
    if (trendingAlbums_error) {
      errors.push(trendingAlbums_error as Error);
      setErrors([...errors]);
    }
  }, [trendingAlbums_response, trendingAlbums_isLoading, trendingAlbums_error]);

  /**
   * Populate featured playlist resources
   */
  useEffect(() => {
    if (!featurePlaylists_isLoading && featuredPlaylists_response) {
      const playlists: FeaturedPlaylistItem[] =
        featuredPlaylists_response.playlists.items.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          photoCover: item.images ? item.images[0].url : null,
        }));

      dispatch(featuredPlaylistsAction.load(playlists));
      resources.splice(resources.indexOf("featured-playlists"), 1);
      setResources([...resources]);
    }
  }, [featuredPlaylists_response, featurePlaylists_isLoading]);

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
