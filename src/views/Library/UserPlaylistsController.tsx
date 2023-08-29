import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import {
  UserPlaylistObject,
  fetchCurrentUserPlaylists,
} from "../../modules/api/playlists.apis";
import { useDispatch } from "react-redux";
import { currentUserPlaylistsAction } from "../../redux/stores/user-playlists.store";

export const UserPlaylistController: React.FC = () => {
  const { data, error } = useQuery(["current-user-playlists"], {
    queryFn: () => fetchCurrentUserPlaylists(20, 0),
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      const listings = data.items.map((item: UserPlaylistObject) => ({
        id: item.id,
        name: item.name,
        images: item.images,
        ownerName: item.owner.display_name,
        type: item.type,
      }));

      dispatch(
        currentUserPlaylistsAction.load({
          total: data.total,
          playlists: listings,
        })
      );
    }
    if (error) {
      console.error(error);
    }
  }, [data, error]);
  return null;
};
