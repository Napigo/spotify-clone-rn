import React, { useState } from "react";
import { useThemeColors } from "../../theme/ThemeProvider";
import { StyleSheet, View } from "react-native";
import { FULL_BOTTOM_BAR_HEIGHT } from "../../theme/constants";
import { Feather, Ionicons } from "@expo/vector-icons";
import { TabButton } from "./TabButton";

export const BottomTabBar: React.FC = () => {
  const styles = useStyles();

  const [activeTab, setActiveTab] = useState<string>("home");

  return (
    <View style={styles.container}>
      <TabButton
        tabName="home"
        label="Home"
        icon={<Feather name="home" size={20} />}
        active={activeTab === "home"}
        setActiveTab={setActiveTab}
      />
      <TabButton
        tabName="search"
        label="Search"
        icon={<Feather name="search" size={20} />}
        active={activeTab === "search"}
        setActiveTab={setActiveTab}
      />
      <TabButton
        tabName="library"
        label="Library"
        icon={<Ionicons name="library-outline" size={20} />}
        active={activeTab === "library"}
        setActiveTab={setActiveTab}
      />
    </View>
  );
};

const useStyles = () => {
  const { scheme } = useThemeColors();

  return StyleSheet.create({
    container: {
      height: FULL_BOTTOM_BAR_HEIGHT,
      width: "100%",
      backgroundColor: scheme.systemBackground,
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });
};
