import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useThemeColors } from "../../theme/ThemeProvider";
import { YourLibraryHeader } from "../../components/YourLibrary/YourLibraryHeader";
import {
  LIBRARY_MENUS_TOOLBAR_HEIGHT,
  STANDARD_TOPBAR_HEIGHT,
} from "../../theme/constants";
import { MenusToolbar } from "../../components/YourLibrary/MenusToolbar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { YourLibraryContent } from "../../components/YourLibrary/YourLibraryContent";

export const LibraryView: React.FC = () => {
  const styles = useStyles();

  const a = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      <View
        style={[
          styles.topHeaderContainer,
          {
            height:
              STANDARD_TOPBAR_HEIGHT + LIBRARY_MENUS_TOOLBAR_HEIGHT + a.top,
          },
        ]}
      >
        <YourLibraryHeader />
        <MenusToolbar />
      </View>
      <YourLibraryContent />
    </View>
  );
};

const useStyles = () => {
  const { scheme } = useThemeColors();
  return StyleSheet.create({
    topHeaderContainer: {
      width: "100%",
      flexDirection: "column",
      backgroundColor: scheme.systemBackground,
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.2,
      shadowRadius: 5.62,
      elevation: 8,
    },
  });
};
