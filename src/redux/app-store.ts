import { configureStore } from "@reduxjs/toolkit";
import RecentTracksReducer from "./stores/recent-tracks.store";
import TrendingAlbumsReducer from "./stores/trending-albums.store";
import RecommendedArtistsReducer from "./stores/recommended-artists.store";
import FeaturedPlaylistsReducer from "./stores/featured-playlists.store";

export const AppStore = configureStore({
  devTools: true,
  reducer: {
    RecentTracksStore: RecentTracksReducer,
    TrendingAlbumsStore: TrendingAlbumsReducer,
    RecommendedArtistsStore: RecommendedArtistsReducer,
    FeaturedPlaylistsStore: FeaturedPlaylistsReducer,
  },
});

export type AppState = ReturnType<typeof AppStore.getState>;
export type AppDispatch = typeof AppStore.dispatch;
