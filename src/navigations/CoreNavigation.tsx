import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { CoreStackParamList } from "./types";
import { TabNavigation } from "./TabNavigation";

const CoreStack = createNativeStackNavigator<CoreStackParamList>();

export const CoreNavigation: React.FC = () => {
  return (
    <CoreStack.Navigator
      initialRouteName="Tab"
      screenOptions={{ headerShown: false }}
    >
      <CoreStack.Screen name="Tab" component={TabNavigation} />
    </CoreStack.Navigator>
  );
};
