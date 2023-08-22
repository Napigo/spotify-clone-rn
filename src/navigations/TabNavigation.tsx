import React, { useCallback } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Haptics from "expo-haptics";
import { TabStackParamList } from "./types";
import { HomeView } from "../views/Home";
import { TabBarIcon } from "../components/TabBarIcon";
import { UIText } from "../components/common/UIText";
import { useThemeColors } from "../theme/ThemeProvider";
import { StyleSheet } from "react-native";

const Tab = createBottomTabNavigator<TabStackParamList>();

export const TabNavigation: React.FC = () => {
  const styles = useStyles();

  const runHaptics = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name={route.name} />
        ),
        tabBarLabel: ({ focused }) => (
          <UIText style={focused ? styles.tabLabel_active : styles.tabLabel}>
            {route.name}
          </UIText>
        ),

        tabBarStyle: {
          position: "absolute",
          borderWidth: 0,
          borderTopWidth: 0,
          borderTopColor: "transparent",
          elevation: 0,
          shadowColor: "#5bc4ff",
          shadowOpacity: 0,
          shadowRadius: 0,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeView}
        options={{ title: "Home" }}
        listeners={() => ({
          tabPress: runHaptics,
        })}
      />
      <Tab.Screen
        name="Search"
        component={HomeView}
        options={{ title: "Search" }}
        listeners={() => ({
          tabPress: runHaptics,
        })}
      />
      <Tab.Screen
        name="Library"
        component={HomeView}
        options={{ title: "Library" }}
        listeners={() => ({
          tabPress: runHaptics,
        })}
      />
    </Tab.Navigator>
  );
};

const useStyles = () => {
  const { scheme } = useThemeColors();

  return StyleSheet.create({
    tabLabel: {
      fontSize: 11,
      color: scheme.systemGray,
    },
    tabLabel_active: {
      fontSize: 11,
      color: scheme.systemTint,
    },
  });
};
