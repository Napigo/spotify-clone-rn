import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CoreStackParamList } from "./types";
import { TabNavigation } from "./TabNavigation";
import { BottomSheetSandbox } from "../sandbox/bottomsheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DynamicPlayerRootView } from "../components/DynamicPlayer";
import { PlayerControllerView } from "../components/DynamicPlayer/PlayerControllerView";

const CoreStack = createNativeStackNavigator<CoreStackParamList>();

export const CoreNavigation: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DynamicPlayerRootView
        defaultIndex={0}
        content={<PlayerControllerView />}
      >
        <CoreStack.Navigator
          initialRouteName="Tab"
          screenOptions={{ headerShown: false }}
        >
          <CoreStack.Screen name="Tab" component={TabNavigation} />
        </CoreStack.Navigator>
      </DynamicPlayerRootView>
    </GestureHandlerRootView>
  );
};
