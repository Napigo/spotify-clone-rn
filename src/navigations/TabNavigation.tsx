import React, { useCallback } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Haptics from "expo-haptics";
import { TabStackParamList } from "./types";
import { SearchView } from "../views/Search";
import { LibraryNavigation } from "./LibraryNavigation";
import { HomeNavigation } from "./HomeNavigation";

const Tab = createBottomTabNavigator<TabStackParamList>();

export const TabNavigation: React.FC = () => {
  const runHaptics = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={() => <></>}
      screenOptions={({}) => ({
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigation}
        options={{ title: "Home" }}
        listeners={() => ({
          tabPress: runHaptics,
        })}
      />
      <Tab.Screen
        name="Search"
        component={SearchView}
        options={{ title: "Search" }}
        listeners={() => ({
          tabPress: runHaptics,
        })}
      />
      <Tab.Screen
        name="Library"
        component={LibraryNavigation}
        options={{
          title: "Library",
        }}
        listeners={() => ({
          tabPress: runHaptics,
        })}
      />
    </Tab.Navigator>
  );
};
