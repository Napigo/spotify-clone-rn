import React from "react";
import { AuthStackParamList } from "./types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginView } from "../views/Login";
import { SpotifyWebAuthview } from "../views/Login/SpotifyWebAuth";

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigation: React.FC = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Auth"
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Auth" component={LoginView} />
      <AuthStack.Screen name="SpotifyWebAuth" component={SpotifyWebAuthview} />
    </AuthStack.Navigator>
  );
};
