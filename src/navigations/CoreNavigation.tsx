import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { CoreStackParamList } from "./types";
import { TabNavigation } from "./TabNavigation";
import { BottomSheetModalProvider } from "../sandbox/bottomsheetmodal";
import { BottomSheetSandbox } from "../sandbox/bottomsheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const CoreStack = createNativeStackNavigator<CoreStackParamList>();

export const CoreNavigation: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CoreStack.Navigator
        initialRouteName="Tab"
        screenOptions={{ headerShown: false }}
      >
        <CoreStack.Screen name="Tab" component={TabNavigation} />
      </CoreStack.Navigator>
      <BottomSheetSandbox />
    </GestureHandlerRootView>
  );
};
