import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import {
  UserPlaylistObject,
  fetchCurrentUserPlaylists,
} from "../../modules/api/playlists.apis";
import {
  UserSavedAlbumObject,
  fetchCurrentUserSavedAlbums,
} from "../../modules/api/album.apis";
import {
  LibraryAlbum,
  LibraryArtist,
  LibraryItem,
  LibraryItemType,
  LibraryPlaylist,
  userLibraryAction,
} from "../../redux/stores/user-library.store";
import { shuffle } from "lodash";
import { useDispatch } from "react-redux";

export const LibraryController: React.FC = () => {
  const dispatch = useDispatch();

  const { data: playlist_response, error: playlist_error } = useQuery(
    ["current-user-playlists"],
    {
      queryFn: () => fetchCurrentUserPlaylists(20, 0),
    }
  );

  const { data: albums_reponse, error: albums_error } = useQuery(
    ["user-albums"],
    {
      queryFn: () => fetchCurrentUserSavedAlbums(20, 0),
    }
  );

  useEffect(() => {
    const playlists: LibraryPlaylist[] = [];
    const albums: LibraryAlbum[] = [];
    const artists: LibraryArtist[] = [];

    if (playlist_response) {
      playlist_response.items.forEach((item: UserPlaylistObject) => {
        playlists.push({
          id: item.id,
          name: item.name,
          ownerName: item.owner.display_name,
          images: item.images,
          type: item.type,
        });
      });
    }

    if (albums_reponse) {
      albums_reponse.items.forEach((item: UserSavedAlbumObject) => {
        const { album } = item;
        albums.push({
          id: album.id,
          name: album.name,
          artistName: album.artists[0].name,
          coverPhoto: album.images[0].url ?? "",
        });

        const targetArtists = album.artists[0];
        artists.push({
          id: targetArtists.id,
          name: targetArtists.name,
          images: targetArtists.images,
        });
      });
    }

    const combinedList: LibraryItem[] = [
      ...playlists.map((data) => ({ type: LibraryItemType.PLAYLIST, data })),
      ...albums.map((data) => ({ type: LibraryItemType.ALBUM, data })),
      ...artists.map((data) => ({ type: LibraryItemType.ARTIST, data })),
    ];

    const shuffledList = shuffle(combinedList);
    dispatch(userLibraryAction.load(shuffledList));

    if (albums_error || playlist_error) {
      console.error(
        "Error in fetch either albums or playlists from current user"
      );
      console.error(`Album Error : ${albums_error}`);
      console.error(`Playlist Error : ${playlist_error}`);
    }
  }, [playlist_response, playlist_error, albums_reponse, albums_error]);
  return null;
};
