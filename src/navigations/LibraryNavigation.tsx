import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LibraryStackParamList } from "./types";
import { LibraryView } from "../views/Library";
import { LikedSongsView } from "../views/LikedSongs";

const LibraryStack = createNativeStackNavigator<LibraryStackParamList>();

export const LibraryNavigation: React.FC = () => {
  return (
    <LibraryStack.Navigator
      initialRouteName="Root"
      screenOptions={{ headerShown: false }}
    >
      <LibraryStack.Screen name="Root" component={LibraryView} />
      <LibraryStack.Screen name="LikedSongs" component={LikedSongsView} />
    </LibraryStack.Navigator>
  );
};
