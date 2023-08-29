import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStackParamList } from "./types";
import { HomeView } from "../views/Home";
import { LikedSongsView } from "../views/LikedSongs";

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

export const HomeNavigation: React.FC = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="Root"
      screenOptions={{ headerShown: false }}
    >
      <HomeStack.Screen name="Root" component={HomeView} />
      <HomeStack.Screen name="LikedSongs" component={LikedSongsView} />
    </HomeStack.Navigator>
  );
};
