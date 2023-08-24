import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../redux/app-store";

export const RecommendedArtists: React.FC = () => {
  const { artists } = useSelector(
    (state: AppState) => state.RecommendedArtistsStore
  );

  //   console.log(artists);
  return null;
};
