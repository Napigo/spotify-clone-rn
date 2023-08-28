import { configureStore } from "@reduxjs/toolkit";
import RecentTracksReducer from "./stores/recent-tracks.store";
import TrendingAlbumsReducer from "./stores/trending-albums.store";
import RecommendedArtistsReducer from "./stores/recommended-artists.store";
import FeaturedPlaylistsReducer from "./stores/featured-playlists.store";
import CategoriesReducer from "./stores/categories.store";
import MeReducer from "./stores/me.store";
import SavedTrackReducer from "./stores/savedtracks.store";
import CurrentUserPlaylistsReducer from "./stores/user-playlists.store";

export const AppStore = configureStore({
  devTools: true,
  reducer: {
    MeStore: MeReducer,
    RecentTracksStore: RecentTracksReducer,
    TrendingAlbumsStore: TrendingAlbumsReducer,
    RecommendedArtistsStore: RecommendedArtistsReducer,
    FeaturedPlaylistsStore: FeaturedPlaylistsReducer,
    CategoriesStore: CategoriesReducer,
    SavedTracksStore: SavedTrackReducer,
    CurrentUserPlaylistsStore: CurrentUserPlaylistsReducer,
  },
});

export type AppState = ReturnType<typeof AppStore.getState>;
export type AppDispatch = typeof AppStore.dispatch;
