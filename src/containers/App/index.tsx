import React, { PropsWithChildren, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import * as SplashScreen from "expo-splash-screen";
import { UserProfileResponse, getUserProfile } from "../../modules/api/me.apis";
import { MeActions } from "../../redux/stores/me.store";
import {
  NewReleaseResponse,
  TrendingAlbumResponse,
  fetchNewRelease,
  fetchRecommendedGenres,
  fetchTrendingAlbums,
} from "../../modules/api/album.apis";
import { recentTracksAction } from "../../redux/stores/recent-tracks.store";
import {
  RecommendedArtist,
  recommendedArtistsAction,
} from "../../redux/stores/recommended-artists.store";
import {
  TrendingAlbum,
  trendingAlbumsAction,
} from "../../redux/stores/trending-albums.store";
import {
  FeaturedPlaylistResponse,
  fetchFeaturedPlaylist,
} from "../../modules/api/playlists.apis";
import {
  FeaturedPlaylistItem,
  featuredPlaylistsAction,
} from "../../redux/stores/featured-playlists.store";
import { SearchViewController } from "../../views/Search/SearchViewController";
import { LibraryViewController } from "../../views/Library/LibraryViewController";

/**
 * This component initialize all data required
 * for the ap too be fully ready to run and display UI
 * @returns
 */
export const AppContainer: React.FC<PropsWithChildren> = ({ children }) => {
  const [resources, setResources] = useState<string[]>([
    "user-profile",
    "new-releases",
    "trending-albums",
    "featured-playlists",
  ]);

  const [isReady, setReady] = useState<boolean>(false);
  const [errors, setErrors] = useState<Error[]>([]);

  const dispatch = useDispatch();

  const { data: userProfile_response, error: userProfile_error } =
    useQuery<UserProfileResponse>(["user-profile"], {
      queryFn: () => getUserProfile(),
      staleTime: 600000,
      cacheTime: 600000,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      retry: true,
    });

  /**
   * load the fetched userprofiles into redux
   */
  useEffect(() => {
    if (userProfile_response) {
      dispatch(MeActions.load(userProfile_response));
      resources.splice(resources.indexOf("user-profile"), 1);
      setResources([...resources]);
    }
    if (userProfile_error) {
      errors.push(newReleases_error as Error);
      setErrors([...errors]);
    }
  }, [userProfile_response, userProfile_error]);

  const { data: newReleases_response, error: newReleases_error } =
    useQuery<NewReleaseResponse>(["new-releases"], {
      queryFn: () => fetchNewRelease(5),
      staleTime: 60000,
      cacheTime: 60000,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: true,
    });

  /**
   * load the fetched new-releases into redux
   */
  useEffect(() => {
    if (newReleases_response) {
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
  }, [newReleases_response, newReleases_error]);

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

  useEffect(() => {
    if (trendingAlbums_response) {
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
  }, [trendingAlbums_response, trendingAlbums_error]);

  const { data: featuredPlaylists_response, error: featuredPlaylists_error } =
    useQuery<FeaturedPlaylistResponse>(["featured-playlists"], {
      queryFn: () => fetchFeaturedPlaylist(20),
    });

  useEffect(() => {
    if (featuredPlaylists_response) {
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
    if (featuredPlaylists_error) {
      errors.push(trendingAlbums_error as Error);
      setErrors([...errors]);
    }
  }, [featuredPlaylists_response, featuredPlaylists_error]);

  useEffect(() => {
    if (resources.length === 0 && errors.length === 0) {
      setReady(true);
      SplashScreen.hideAsync();
    }
  }, [resources, errors]);

  if (!isReady) {
    return null;
  }
  return (
    <>
      <SearchViewController />
      <LibraryViewController />
      {children}
    </>
  );
};
