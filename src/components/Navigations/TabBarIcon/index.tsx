import React from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "../../../theme/ThemeProvider";

type TabIconProps = {
  name: string;
  focused: boolean;
};
export const TabBarIcon: React.FC<TabIconProps> = ({ name, focused }) => {
  const { scheme } = useThemeColors();

  const color = focused ? scheme.systemTint : scheme.systemGray;

  switch (name) {
    case "Home":
      return <Feather name="home" size={20} color={color} />;
    case "Search":
      return <Feather name="search" size={20} color={color} />;
    case "Library":
      return <Ionicons name="library" size={20} color={color} />;
    default:
      return null;
  }
};
