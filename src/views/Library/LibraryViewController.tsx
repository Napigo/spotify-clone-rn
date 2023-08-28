import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  SavedTrackItem,
  fetchMyLikesSongs,
} from "../../modules/api/tracks.apis";
import { useDispatch } from "react-redux";
import {
  SavedTrack,
  savedTracksAction,
} from "../../redux/stores/savedtracks.store";

export const LibraryViewController: React.FC = () => {
  const { data, error } = useQuery(["liked-songs"], {
    queryFn: () => fetchMyLikesSongs(50, 0),
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      const datas: SavedTrack[] = data.items.map((item: SavedTrackItem) => ({
        id: item.track.id,
        name: item.track.name,
        albumName: item.track.album.name,
        artistName: item.track.artists[0].name,
        images: item.track.album.images,
      }));
      dispatch(
        savedTracksAction.load({
          tracks: datas,
          total: data.total,
        })
      );
    }
    if (error) {
      console.error(error);
    }
  }, [data, error]);

  return null;
};
